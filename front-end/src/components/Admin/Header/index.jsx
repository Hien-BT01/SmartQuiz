import React, { useState } from 'react'

import { Link, NavLink } from 'react-router-dom'

import DashboardIcon from '@mui/icons-material/Dashboard'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import { grey, yellow } from '@mui/material/colors'

import logo from '../../../assets/images/Logo.png'

import { AppStyles } from '~/constants/styles'
import useAuthAction from '~/features/authSlice/auth-actions'
import { useAppSelector } from '~/hooks/redux-hooks'

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const { logoutHandler } = useAuthAction()
    const open = Boolean(anchorEl)

    const { email, username, image, vip } = useAppSelector((state) => state.auth)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClickLogout = () => {
        logoutHandler()
    }

    return (
        <AppBar position="fixed" sx={{ backgroundColor: AppStyles.colors['#FAFBFF'], boxShadow: 'none' }}>
            <Toolbar disableGutters>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width={1700}
                    sx={{ m: '0 auto' }}
                >
                    <Box display="flex" alignItems="center">
                        <Box
                            alignItems="center"
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                py: 0.5,
                                userSelect: 'none',
                            }}
                        >
                            <Box>
                                <Avatar sx={{ height: 50, width: 150 }} src={logo} alt="logo" />
                            </Box>

                            <Typography
                                ml={-1}
                                component="span"
                                variant="h4"
                                sx={{ color: AppStyles.colors['#000F33'], fontWeight: 500 }}
                            >
                                Administration
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& > .active > span': {
                                color: AppStyles.colors['#004DFF'],
                            },
                        }}
                    >
                        <Box
                            component={NavLink}
                            to="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: AppStyles.colors['#333333'],
                                position: 'relative',
                                fontFamily: 'Roboto',
                                ':hover': {
                                    color: AppStyles.colors['#004DFF'],
                                },
                            }}
                            exact
                        >
                            <DashboardIcon />
                            <Typography component="span" variant="h5" sx={{ ml: 1, fontWeight: 500 }}>
                                Dashboard
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            '& > a:after': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                width: 0,
                                height: '2px',
                                backgroundColor: grey[100],
                                left: 0,
                                bottom: 0,
                                transition: 'all 0.3s linear',
                            },
                            display: 'flex',
                            alignItems: 'center',
                            '& > .active > span': {
                                color: yellow[400],
                                fontWeight: 700,
                            },
                            '& > .active:after': {
                                backgroundColor: yellow[400],
                            },
                        }}
                    >
                        {email ? (
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="h6"
                                    sx={{ color: AppStyles.colors['#333333'], fontWeight: 500 }}
                                >
                                    {username}
                                </Typography>
                                <Tooltip title="">
                                    <IconButton onClick={handleClick} size="medium" sx={{ ml: 1 }}>
                                        <Avatar src={image} sx={{ width: 40, height: 40 }} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1,
                                            px: 3,
                                            pt: 3,
                                            pb: 1,
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <Box
                                        component="li"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        mb={1}
                                    >
                                        <Avatar alt="avatar" src={image} sx={{ width: 80, height: 80, mb: 2 }} />
                                        <Typography variant="body1" fontWeight={700} textAlign="center">
                                            {username}
                                        </Typography>
                                        <Typography variant="body1" textAlign="center">
                                            {email}
                                        </Typography>
                                        <Divider textAlign="center" sx={{ width: '100%', mt: 2 }}>
                                            <Chip
                                                label={vip === true ? 'Premium' : 'Standard'}
                                                sx={{
                                                    backgroundColor: vip === true && AppStyles.colors['#FEDA01'],
                                                    color: vip === true && AppStyles.colors['#0045e5'],
                                                }}
                                            />
                                        </Divider>
                                    </Box>

                                    <MenuItem sx={{ display: 'flex', pr: 5 }} onClick={handleClickLogout}>
                                        <Typography ml={1}>Đăng xuất</Typography>
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button
                                    sx={{
                                        color: AppStyles.colors['#000F33'],
                                        textTransform: 'none',
                                        borderRadius: 2.5,
                                        ml: 5,
                                        ':hover': {
                                            bgcolor: 'none',
                                            color: AppStyles.colors['#004DFF'],
                                        },
                                    }}
                                    component={Link}
                                    to="/register"
                                >
                                    <Typography>Đăng ký</Typography>
                                </Button>
                                <Button
                                    sx={{
                                        color: '#fefefe',
                                        backgroundColor: AppStyles.colors['#FFAF00'],
                                        p: 1,
                                        borderRadius: 2.5,
                                        ml: 2,
                                        textTransform: 'none',
                                        ':hover': {
                                            bgcolor: AppStyles.colors['#E59D00'],
                                            color: 'white',
                                        },
                                    }}
                                    component={Link}
                                    to="/login"
                                >
                                    <Typography>Đăng nhập</Typography>
                                </Button>
                            </React.Fragment>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
