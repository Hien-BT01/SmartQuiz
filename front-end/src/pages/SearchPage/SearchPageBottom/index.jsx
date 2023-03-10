import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { Box, Grid, Skeleton, Typography } from '@mui/material'
import ListStudySets from '~/components/ListStudySets'

import Paging from './Pagination'
import Sort from './Sort'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { Mock_Data } from '~/Mock'
import { useStudySet } from '~/actions/study-set'
import { AppStyles } from '~/constants/styles'

const filterStringGenerator = ({ studysetname, sorttype, pageNumber, gradeid, subjectid }) => {
    let filterString = '?'
    if (studysetname && studysetname.trim() !== '') filterString += '&StudySetName=' + studysetname

    if (subjectid !== undefined) filterString += `&SubjectId=${subjectid}`

    if (gradeid !== undefined) filterString += `&GradeId=${gradeid}`

    if (pageNumber !== undefined) filterString += `&pageNumber=${pageNumber}`

    filterString += `&pageSize=${12}`

    if (sorttype !== undefined) filterString += `&sorttype=${sorttype}`

    return filterString
}

const SearchPageBottom = () => {
    const { search: query } = useLocation()
    const { studysetname, sorttype = 'Newest', pageNumber, gradeid, subjectid } = queryString.parse(query)
    const { getStudySetList } = useStudySet()
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [studySet, setStudySet] = useState({ list: [], pageCount: 1 })
    const [studySetLength, setStudySetLength] = useState()
    const showSnackbar = useSnackbar()

    useEffect(() => {
        setIsFirstRender(true)
        const params = filterStringGenerator({ studysetname, sorttype, pageNumber, gradeid, subjectid })

        const controller = new AbortController()
        const signal = controller.signal

        getStudySetList(params, signal)
            .then((response) => {
                const listStudySet = response.data.data
                setStudySetLength(response.data.data.length)
                let totalPages
                if (response.data.meta) {
                    totalPages = response.data.meta.totalPages
                } else {
                    totalPages = 1
                }
                setStudySet({ list: listStudySet, pageCount: totalPages })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .finally(() => {
                setIsFirstRender(false)
            })

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studysetname, sorttype, pageNumber, gradeid, subjectid])
    return (
        <Grid maxWidth={1670} container sx={{ m: '0 auto', mt: 2 }} flexDirection="column">
            <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                    textAlign="left"
                    variant="h6"
                    fontWeight={600}
                    sx={{
                        color: 'black',
                        mb: 2,
                    }}
                >
                    K???t qu??? t??m ki???m
                </Typography>
                <Sort />
            </Box>
            <Box mt={4}>
                {isFirstRender ? (
                    <Grid container rowSpacing={2} columnSpacing={3} display="flex" mb={10}>
                        {Mock_Data.search.map((studySet) => (
                            <Grid item md={3} key={studySet.id}>
                                <Skeleton sx={{ height: 120 }} animation="wave" variant="rounded" />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <React.Fragment>
                        {studySetLength > 0 ? (
                            <React.Fragment>
                                <ListStudySets studySets={studySet.list} md={3} />{' '}
                                {studySet.pageCount !== 1 ? (
                                    <Box display="flex" justifyContent="center" mt={6} mb={10}>
                                        <Paging size={studySet.pageCount} />
                                    </Box>
                                ) : (
                                    <Typography
                                        mt={5}
                                        mb={10}
                                        textAlign="center"
                                        variant="body2"
                                        fontWeight={400}
                                        sx={{
                                            color: AppStyles.colors['#767680'],
                                        }}
                                    >
                                        C?? {studySet.list.length} k???t qu??? t??m ki???m ph?? h???p
                                    </Typography>
                                )}
                            </React.Fragment>
                        ) : (
                            <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                                <Typography fontSize={32} fontWeight={700} sx={{ color: AppStyles.colors['#000F33'] }}>
                                    Ch??ng t??i kh??ng t??m th???y b???t k??? k???t qu??? n??o.
                                </Typography>
                                <Typography
                                    fontSize={20}
                                    mt={2}
                                    fontWeight={600}
                                    sx={{ color: AppStyles.colors['#000F33'] }}
                                >
                                    Sau ????y l?? m???t s??? ????? xu???t ????? c???i thi???n k???t qu??? t??m ki???m c???a b???n:
                                </Typography>
                                <Box mt={1}>
                                    <Typography
                                        fontSize={20}
                                        component="li"
                                        sx={{ color: AppStyles.colors['#000F33'] }}
                                    >
                                        Ki???m tra ch??nh t??? ho???c th??? c??c c??ch vi???t kh??c
                                    </Typography>
                                    <Typography
                                        fontSize={20}
                                        component="li"
                                        sx={{ color: AppStyles.colors['#000F33'] }}
                                    >
                                        T??m ki???m b???ng c??c t??? kh??a kh??c nhau
                                    </Typography>
                                    <Typography
                                        fontSize={20}
                                        component="li"
                                        sx={{ color: AppStyles.colors['#000F33'] }}
                                    >
                                        X??a b??? l???c c???a b???n
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </React.Fragment>
                )}
            </Box>
        </Grid>
    )
}

export default SearchPageBottom
