import React from 'react'

import { GppGood, Groups2, Star } from '@mui/icons-material'
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'

import Medal1 from '~/assets/images/Metal-1.png'
import Medal2 from '~/assets/images/Metal-2.png'
import Medal3 from '~/assets/images/Metal-3.png'
import { AppStyles } from '~/constants/styles'

const TableContent = ({ studySet }) => {
    return (
        <React.Fragment>
            <Box p={2}>
                {studySet.slice(0, -1).map((data, index) => (
                    <Grid
                        key={data.StudySetName}
                        pl={2}
                        pb={1}
                        pt={2}
                        container
                        spacing={3}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Grid item xs={4} md={4} lg={3}>
                            {index < 1 ? (
                                <Avatar
                                    variant="square"
                                    alt="avatar"
                                    src={Medal1}
                                    sx={{ width: 65, height: 65, cursor: 'pointer' }}
                                    onClick={() => history.push(`/admin/posts-management/${data.id}`)}
                                />
                            ) : index < 2 ? (
                                <Avatar
                                    variant="square"
                                    alt="avatar"
                                    src={Medal2}
                                    sx={{ width: 65, height: 65, cursor: 'pointer' }}
                                    onClick={() => history.push(`/admin/posts-management/${data.id}`)}
                                />
                            ) : index < 3 ? (
                                <Avatar
                                    variant="square"
                                    alt="avatar"
                                    src={Medal3}
                                    sx={{ width: 65, height: 65, cursor: 'pointer' }}
                                    onClick={() => history.push(`/admin/posts-management/${data.id}`)}
                                />
                            ) : (
                                <Typography variant="h6">{index + 1}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={8} md={8} lg={9}>
                            <Box display="flex">
                                <Typography
                                    textAlign={'left'}
                                    gutterBottom
                                    variant="body1"
                                    component="div"
                                    fontWeight={600}
                                    sx={{ textOverflow: 'clip' }}
                                >
                                    {/* {studySet?.StudySetName} */}
                                    Toán THPT 2021-2022
                                </Typography>
                                {Math.random() < 0.5 && (
                                    <GppGood fontSize="small" sx={{ ml: 1, color: AppStyles.colors['#004DFF'] }} />
                                )}
                            </Box>
                            <Box display="flex">
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
                                    }}
                                >
                                    Người tạo
                                </Typography>
                                <Typography
                                    ml={0.5}
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontWeight: 'bold', fontSize: 14 }}
                                >
                                    {data?.PersonCreated}
                                </Typography>
                            </Box>
                            <Box display="flex" mt={2} textAlign={'left'}>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <Groups2 fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                                    <Typography
                                        ml={1}
                                        sx={{ color: AppStyles.colors['#767680'], fontSize: 14, fontWeight: 400 }}
                                    >
                                        {data?.NumberPeople}
                                    </Typography>
                                </Box>
                                <Box ml={2} display="flex" alignItems="center" justifyContent="center">
                                    <Star fontSize="small" sx={{ color: AppStyles.colors['#767680'] }} />
                                    <Typography
                                        ml={1}
                                        sx={{ color: AppStyles.colors['#767680'], fontSize: 14, fontWeight: 400 }}
                                    >
                                        {data?.Star}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        {index < studySet.slice(0, -1).length - 1 && (
                            <Divider
                                sx={{
                                    width: '95%',
                                    height: 2,
                                    mt: 2,
                                }}
                            />
                        )}
                    </Grid>
                ))}
            </Box>
        </React.Fragment>
    )
}

export default TableContent
