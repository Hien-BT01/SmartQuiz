import React from 'react'

import { useHistory } from 'react-router-dom'

import { BookmarkAdd, CheckBox, Description, Edit } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import ButtonCompo from '~/components/ButtonCompo'
import QuestionCard from '~/components/QuestionList/QuestionCard'

import logo from '~/assets/images/User 5.png'
import { AppStyles } from '~/constants/styles'

const DetailHeader = ({ info, id, questions }) => {
    const history = useHistory()
    const ButtonStyle = {
        color: AppStyles.colors['#000F33'],
        textTransform: 'none',
        height: 56,
        minWidth: 413,
        backgroundColor: AppStyles.colors['#CCDBFF'],
        ':hover': {
            bgcolor: AppStyles.colors['#004DFF'],
            color: 'white',
        },
    }
    return (
        <React.Fragment>
            <Typography sx={{ fontWeight: 500, fontSize: 32, color: AppStyles.colors['#333333'] }}>
                {info.name}
            </Typography>
            <Divider
                sx={{ mt: 2, borderBottomWidth: 2, backgroundColor: AppStyles.colors['#000F33'], opacity: '30%' }}
            />
            <Box display="flex" mt={4} justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <Avatar sx={{ height: 40, width: 40 }} src={logo} alt="logo" />
                    <Typography
                        sx={{
                            ml: 2,
                            color: AppStyles.colors['#333333'],
                            fontSize: 16,
                            fontWeight: 500,
                        }}
                    >
                        {info?.creator}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Tooltip title="Lưu" placement="bottom">
                        <IconButton aria-label="create" size="large" sx={{ border: '1px solid #767680', mr: 2 }}>
                            <BookmarkAdd fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sửa" placement="bottom">
                        <IconButton
                            aria-label="create"
                            size="large"
                            sx={{ border: '1px solid #767680' }}
                            onClick={() => history.push(`/study-sets/${id}/update`)}
                        >
                            <Edit fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box mt={2.5}>
                <QuestionCard question={questions[0]} index={0} />
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
                    <ButtonCompo style={ButtonStyle} onClick={() => history.push(`/study-sets/${id}/learn`)}>
                        <Description fontSize="medium" />
                        <Typography ml={1.5} sx={{ fontSize: 16, fontWeight: 500 }}>
                            Học
                        </Typography>
                    </ButtonCompo>
                    <ButtonCompo style={ButtonStyle} onClick={() => history.push(`/study-sets/${id}/test`)}>
                        <CheckBox fontSize="medium" />
                        <Typography ml={1.5} sx={{ fontSize: 16, fontWeight: 500 }}>
                            Kiểm tra
                        </Typography>
                    </ButtonCompo>
                </Box>
            </Box>
            <Box display="flex" mt={8}>
                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Tất cả câu hỏi</Typography>
                <Typography sx={{ ml: 2, fontWeight: 600, fontSize: 20, color: AppStyles.colors['#767680'] }}>
                    ({info.questions.length})
                </Typography>
            </Box>
        </React.Fragment>
    )
}

export default DetailHeader
