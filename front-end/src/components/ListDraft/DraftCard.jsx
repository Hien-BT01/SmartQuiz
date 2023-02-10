import { useHistory } from 'react-router-dom'

import { Box, CardContent, Grid, Typography } from '@mui/material'

import CardLayout from '../CardLayout'

const CardLayoutStyle = {
    borderRadius: 1,
    boxShadow: '0px 1px 2px rgba(0, 46, 153, 0.3), 0px 1px 3px 1px rgba(0, 46, 153, 0.15)',
    cursor: 'pointer',
    borderBottom: '3px solid transparent;',
    ':hover': {
        borderBottom: '3px solid #CCDBFF;',
    },
}

const DraftCard = ({ studySet }) => {
    const history = useHistory()

    return (
        <Grid item md={3}>
            <CardLayout style={CardLayoutStyle} onClick={() => history.push(`/study-sets/${studySet.id}`)}>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: '1',
                                    textOverflow: 'ellipsis',
                                    userSelect: 'none',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                                // component={Link}
                                // to={`/study-sets/${studySet.id}`}
                            >
                                {/* {studySet?.StudySetName} */}
                                {studySet.name}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" mt={1}>
                        <Typography
                            textAlign={'left'}
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '2',
                                textOverflow: 'ellipsis',
                                fontSize: 14,
                                userSelect: 'none',
                            }}
                        >
                            ĐẠI HỌC |
                        </Typography>
                        <Typography
                            ml={0.5}
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: 14, userSelect: 'none' }}
                        >
                            100 câu
                        </Typography>
                    </Box>
                </CardContent>
            </CardLayout>
        </Grid>
    )
}

export default DraftCard
