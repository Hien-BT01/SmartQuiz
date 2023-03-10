import React, { useState } from 'react'

import { v4 as uuid } from 'uuid'

import { Box, Button, TextField, Typography } from '@mui/material'

import Answers from './Answers'

const answers = ['A', 'B']

const TwoChoices = ({ submitQuestionHandler, first, second, questName, ansSelected, id = -1 }) => {
    const [firstChoice, setFirstChoice] = useState(first ? first : '')
    const [secondChoice, setSecondChoice] = useState(second ? second : '')
    const [questionName, setQuestionName] = useState(questName ? questName : '')
    const [answersSelected, setAnswersSelected] = useState(ansSelected ? ansSelected : [])

    const handlerAnswers = (event) => {
        const {
            target: { value },
        } = event

        setAnswersSelected(typeof value === 'string' ? value.split(',') : value)
    }

    const resetHandler = () => {
        setFirstChoice('')
        setSecondChoice('')
        setQuestionName('')
    }

    const submitQuestion = () => {
        const question = {
            quest: questionName,
            ans: [
                {
                    id: uuid(),
                    name: firstChoice,
                    isCorrect: answersSelected.includes('A'),
                },
                {
                    id: uuid(),
                    name: secondChoice,
                    isCorrect: answersSelected.includes('B'),
                },
            ],
            multiple: false,
            answers: answersSelected,
            id: id === -1 ? uuid() : id,
        }
        submitQuestionHandler(question)
        resetHandler()
    }

    return (
        <React.Fragment>
            <TextField
                label="Question name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={questionName}
                onChange={(event) => setQuestionName(event.target.value)}
                multiline
                maxRows={5}
            />
            <TextField
                fullWidth
                sx={{ mb: 2 }}
                label="A choice"
                value={firstChoice}
                onChange={(event) => setFirstChoice(event.target.value)}
                multiline
                maxRows={5}
            />
            <TextField
                fullWidth
                sx={{ mb: 2 }}
                value={secondChoice}
                label="B choice"
                onChange={(event) => setSecondChoice(event.target.value)}
                multiline
                maxRows={5}
            />
            <Box my={2}>
                <Typography sx={{ mb: 1.5 }}>Answers: </Typography>
                <Answers handleChange={handlerAnswers} answers={answers} answersSelected={answersSelected} mode={1} />
            </Box>
            <Box mt={1.5} display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    sx={{ borderRadius: 3, py: 1, px: 5 }}
                    color="primary"
                    z
                    onClick={submitQuestion}
                >
                    Submit
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default TwoChoices
