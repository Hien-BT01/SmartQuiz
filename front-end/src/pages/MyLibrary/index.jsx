import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, Box, Tab, Typography } from '@mui/material'
import FullWidthHeaderWhite from '~/components/FullWidthHeaderWhite'

import Draft from './Draft'
import MyClass from './MyClass'
import StudySets from './StudySets'

import { useStudySet } from '~/actions/study-set'
// import logo from '~/assets/images/User 5.png'
import { AppStyles } from '~/constants/styles'
import { useAppSelector } from '~/hooks/redux-hooks'

function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0')
}

const MyLibrary = () => {
    const { username, image, userId } = useAppSelector((state) => state.auth)
    const [index, setIndex] = useState('0')

    const changeIndexHandler = (_, value) => {
        setIndex(value)
    }
    const { getMyStudySets } = useStudySet()

    return (
        <FullWidthHeaderWhite maxWidthContent={1670}>
            <Box display="flex" flexDirection="column" width={700}>
                <Box display="flex" alignItems="center">
                    <Box>
                        <Avatar sx={{ height: 80, width: 80 }} src={image} alt="logo" />
                    </Box>
                    <Box ml={2}>
                        <Typography
                            fontWeight={500}
                            sx={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '1',
                                textOverflow: 'ellipsis',
                                color: 'black',
                                textDecoration: 'none',
                                fontSize: 24,
                            }}
                        >
                            {username}
                        </Typography>
                        <Typography
                            fontWeight={500}
                            variant="body1"
                            sx={{
                                color: AppStyles.colors['#767680'],
                                textDecoration: 'none',
                            }}
                        >
                            ID {padWithLeadingZeros(userId, 6)}
                        </Typography>
                    </Box>
                </Box>

                <Box width="100%" mt={4}>
                    <TabContext value={index}>
                        <TabList onChange={changeIndexHandler} variant="standard">
                            <Tab
                                label="L???p h???c c???a t??i"
                                value={'0'}
                                sx={{
                                    minWidth: 100,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: AppStyles.colors['#333333'],
                                }}
                            />
                            <Tab
                                label="H???c ph???n c???a t??i"
                                value={'1'}
                                sx={{
                                    minWidth: 100,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: AppStyles.colors['#333333'],
                                }}
                            />
                            {/* <Tab
                                label="???? l??u"
                                value={'2'}
                                sx={{
                                    minWidth: 100,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: AppStyles.colors['#333333'],
                                }}
                            /> */}
                            <Tab
                                label="B???n nh??p"
                                value={'3'}
                                sx={{
                                    minWidth: 100,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: AppStyles.colors['#333333'],
                                }}
                            />
                        </TabList>
                        <TabPanel value={'0'} sx={{ p: 0 }}>
                            <MyClass />
                        </TabPanel>
                        <TabPanel value={'1'} sx={{ p: 0 }}>
                            <StudySets getMyStudySets={getMyStudySets} />
                        </TabPanel>
                        {/* <TabPanel value={'2'} sx={{ p: 0 }}>
                            <StudySets getMyStudySets={getMyStudySets} />
                        </TabPanel> */}
                        <TabPanel value={'3'} sx={{ p: 0 }}>
                            <Draft />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </FullWidthHeaderWhite>
    )
}

export default MyLibrary
