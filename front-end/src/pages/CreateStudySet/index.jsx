import { useCallback, useEffect, useState } from 'react'

import { saveAs } from 'file-saver'
import { useHistory, useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { AddBox, Article, FileDownload } from '@mui/icons-material'
import { Box, Button, Container, Tooltip, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'

import template from '../../assets/files/Template.xlsx'
import QuestionsExample from './Example'
import Modal from './Modal'
import ModalUpdate from './ModalUpdate'
import NewStudySet from './NewStudySet'
import Questions from './Questions'

import { EXCEL_TEMPLATE_BASE64, initialValue, level, levelSchool } from '~/Mock'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'
import LocalStorageUtils from '~/utils/LocalStorageUtils'

const CreateStudySet = () => {
    const { state } = useLocation()
    const [schoolLevel, setSchoolLevel] = useState(state ? state.schoolLevel : levelSchool[0])
    const [isUniversity, setIsUniversity] = useState(state ? state.isUniversity : false)
    const [universityName, setUniversityName] = useState(state ? state.universityName : initialValue)
    const [classLevel, setClassLevel] = useState(state ? state.classLevel : initialValue)
    const [subject, setSubject] = useState(state ? state.subject : initialValue)
    const [title, setTitle] = useState(state ? state.title : '')
    const [questions, setQuestions] = useState(state ? state.questions : [])
    const [openModal, setOpenModal] = useState(false)
    const { userId } = useAppSelector((state) => state.auth)
    const [modalMode, setModalMode] = useState('create')
    const [question, setQuestion] = useState({})
    const history = useHistory()
    const { createStudySet } = useStudySet()

    const mutateQuestionHandler = (question) => {
        if (modalMode === 'create') setQuestions((prev) => [...prev, question])
        else if (modalMode === 'edit') {
            const questionIndex = questions.findIndex((quest) => quest.id === question.id)
            const updatedQuestions = JSON.parse(JSON.stringify(questions))
            updatedQuestions.splice(questionIndex, 1, question)
            setQuestions(updatedQuestions)
            closeModalHandler()
        }
    }

    const openModalHandler = () => {
        setModalMode('create')
        setOpenModal(true)
    }

    const closeModalHandler = () => {
        setOpenModal(false)
    }

    const openEditModal = (id) => {
        const questionSelected = questions.find((quest) => quest.id === id)
        setQuestion(questionSelected)
        setModalMode('edit')
        setOpenModal(true)
    }

    const titleChangeHandler = ({ target: { value } }) => setTitle(value)

    const levelChangeHandler = (name, value) => setSchoolLevel(() => ({ label: name, value: value }))

    const universityNameChangeHandler = (name, value) => setUniversityName(() => ({ label: name, value: value }))

    const classChangeHandler = (name, value) => setClassLevel(() => ({ label: name, value: value }))

    const subjectChangeHandler = (name, value) => setSubject(() => ({ label: name, value: value }))

    const deleteQuestionDraft = useCallback(
        (id) => {
            const cloneQuestions = JSON.parse(JSON.stringify(questions))
            const updatedQuestion = cloneQuestions.filter((question) => question.id !== id)
            setQuestions(updatedQuestion)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(questions)]
    )

    const infoStudySetHandler = {
        titleChangeHandler,
        levelChangeHandler,
        universityNameChangeHandler,
        classChangeHandler,
        subjectChangeHandler,
    }

    const infoStudySet = {
        schoolLevel,
        isUniversity,
        universityName,
        classLevel,
        subject,
        title,
        questions,
    }

    const submitStudySetHandler = (event) => {
        event.preventDefault()

        const formatQuestions = questions.map((item) => {
            return {
                name: item.quest,
                answers: item.ans.map((ans) => {
                    return {
                        name: ans.name,
                        isCorrectAnswer: ans.isCorrect,
                    }
                }),
            }
        })

        const studySet = {
            name: title,
            userId: +userId,
            schoolId: isUniversity ? universityName.value : null,
            gradeId: isUniversity ? null : classLevel.value,
            subjectId: isUniversity ? null : subject.value,
            classId: null,
            isPublic: true,
            questions: formatQuestions,
        }
        createStudySet(studySet).then(() => {
            if (state) {
                const drafts = LocalStorageUtils.getItem('drafts')
                const updateDrafts = drafts.studySet.filter((draft) => draft.id !== state.id)
                LocalStorageUtils.setItem('drafts', {
                    path: '/create',
                    studySet: updateDrafts,
                })
            }
            history.push('/')
        })
    }

    const saveDraft = () => {
        const drafts = LocalStorageUtils.getItem('drafts') || { path: history.location.pathname, studySet: [] }
        const draft = {
            id: uuid(),
            title,
            isUniversity,
            classLevel,
            subject,
            universityName,
            questions,
            schoolLevel,
        }
        if (state) {
            const draftIndex = drafts.studySet.findIndex((draft) => draft.id === state.id)
            const updateDrafts = JSON.parse(JSON.stringify(drafts.studySet))
            updateDrafts.splice(draftIndex, 1, draft)
            LocalStorageUtils.setItem('create', {
                path: '/create',
                studySet: updateDrafts,
            })
        } else {
            drafts.studySet.push(draft)
            LocalStorageUtils.setItem('create', {
                path: '/create',
                studySet: drafts.studySet,
            })
        }
    }

    const saveFileHandler = () => {
        let sliceSize = 1024
        let byteCharacters = window.atob(EXCEL_TEMPLATE_BASE64)
        let bytesLength = byteCharacters.length
        let slicesCount = Math.ceil(bytesLength / sliceSize)
        let byteArrays = new Array(slicesCount)
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            let begin = sliceIndex * sliceSize
            let end = Math.min(begin + sliceSize, bytesLength)
            let bytes = new Array(end - begin)
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0)
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes)
        }
        saveAs(new Blob(byteArrays, { type: 'application/vnd.ms-excel' }), 'template.xlsx')
    }

    useEffect(() => {
        if (schoolLevel.label === level.university) {
            setIsUniversity(true)
        } else {
            setIsUniversity(false)
            if (classLevel.value < 3 && subject.label === 'Hóa') setSubject(initialValue)
        }
        setClassLevel(initialValue)
        setSubject(initialValue)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schoolLevel.value])

    useEffect(() => {
        return () => {
            if (history.location.pathname !== '/create') {
                saveDraft()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schoolLevel.value, title, subject.value, JSON.stringify(questions), universityName.value])

    return (
        <Box component="form" onSubmit={submitStudySetHandler}>
            <Container maxWidth="xl">
                <NewStudySet infoStudySetHandler={infoStudySetHandler} infoStudySet={infoStudySet} />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    mt={2}
                    component="a"
                    href={template}
                    download="Template.xlsx"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Tooltip title="Tải template">
                        <Button variant="contained" sx={{ px: 5, py: 2 }} onClick={saveFileHandler}>
                            <FileDownload />
                        </Button>
                    </Tooltip>
                </Box>
                {(() => {
                    switch (modalMode) {
                        case 'create':
                            return (
                                <Modal
                                    onClose={closeModalHandler}
                                    submitQuestionHandler={mutateQuestionHandler}
                                    open={openModal}
                                />
                            )
                        case 'edit':
                            return (
                                <ModalUpdate
                                    onClose={closeModalHandler}
                                    submitQuestionHandler={mutateQuestionHandler}
                                    open={openModal}
                                    question={question}
                                />
                            )
                    }
                })()}
                {questions.length > 0 ? (
                    <Questions
                        quest={JSON.stringify(questions)}
                        deleteQuestionDraft={deleteQuestionDraft}
                        openEditModal={openEditModal}
                    />
                ) : (
                    <QuestionsExample />
                )}
                <Box display="flex">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt={3}
                        py={4}
                        sx={{
                            borderRadius: 4,
                            backgroundColor: AppStyles.colors['#185CFF'],
                            transition: 'all 0.3s linear',
                            cursor: 'pointer',
                            '&:hover': {
                                opacity: 0.75,
                            },
                            flex: 1,
                            mr: 2,
                        }}
                        onClick={openModalHandler}
                    >
                        <AddBox sx={{ color: AppStyles.colors['#FFFFFF'] }} />
                        <Typography fontWeight={600} variant="h6" sx={{ ml: 1, color: AppStyles.colors['#FFFFFF'] }}>
                            Thêm thẻ mới
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ borderRadius: 3, px: 5, mt: 3, backgroundColor: AppStyles.colors['#CCDBFF'] }}
                        color="primary"
                    >
                        <Article sx={{ color: AppStyles.colors['#000F33'] }} />
                    </Button>
                </Box>
            </Container>
            <Box sx={{ backgroundColor: AppStyles.colors['#FAFBFF'], mt: 3 }}>
                <Container maxWidth="xl">
                    <Box display="flex" justifyContent="space-between" py={3} alignItems="center">
                        <Box display="flex" alignItems="baseline">
                            <Typography variant="h6" sx={{ color: '#000000', mr: 2, fontWeight: 600 }}>
                                Tổng câu hỏi
                            </Typography>
                            <Typography variant="h5" sx={{ color: '#000000', fontWeight: 600 }}>
                                {questions.length}
                            </Typography>
                        </Box>
                        <Box display="flex">
                            <ButtonCompo
                                variant="outlined"
                                style={{ backgroundColor: AppStyles.colors['#CCDBFF'], mr: 2 }}
                                onClick={saveDraft}
                            >
                                Lưu nháp
                            </ButtonCompo>
                            <ButtonCompo
                                variant="contained"
                                style={{ backgroundColor: AppStyles.colors['#004DFF'] }}
                                type="submit"
                                disable={questions.length === 0}
                            >
                                Tạo học phần
                            </ButtonCompo>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default CreateStudySet
