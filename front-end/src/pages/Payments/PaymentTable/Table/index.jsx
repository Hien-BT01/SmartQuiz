import React, { useEffect, useRef, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import {
    Box,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import EmptyStudySets from '~/components/EmptyStudySets'
import Label from '~/components/Label'

import Paging from '../Pagination'

import { useSnackbar } from '~/HOC/SnackbarContext'
import { useUser } from '~/actions/user'
import payment from '~/assets/images/Payments.jpg'
import { useAppSelector } from '~/hooks/redux-hooks'

const columns = [
    { id: 'Mã đơn hàng', label: 'Mã đơn hàng', minWidth: 60, align: 'left' },
    {
        id: 'Premium',
        label: 'Premium',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'Số tiền thanh toán',
        label: 'Số tiền thanh toán',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'Ngày thanh toán',
        label: 'Ngày thanh toán',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'Ngày hết hạn',
        label: 'Ngày hết hạn',
        minWidth: 100,
        align: 'center',
    },
]

const filterStringGenerator = ({ sortOption, pageNumber }) => {
    let filterString = '?'
    if (pageNumber !== undefined) filterString += `&pageNumber=${pageNumber}`
    else filterString += '&pageNumber=1'

    filterString += `&pageSize=${10}`

    if (sortOption !== undefined) filterString += `&sortOption=${sortOption}`
    return filterString
}

export default function StickyHeadTable() {
    const { search: query } = useLocation()
    const { userId } = useAppSelector((state) => state.auth)
    const { sortOption = 'Newest', pageNumber } = queryString.parse(query)
    const [isLoading, setIsLoading] = useState(false)
    const [rowsData, setRowsData] = useState([])
    const usersAction = useUser()
    const showSnackBar = useSnackbar()
    const rowsPerPage = 10
    const page = pageNumber === undefined ? 0 : pageNumber - 1
    const totalUsers = useRef(0)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const params = filterStringGenerator({ sortOption, pageNumber })
        setIsLoading(true)
        if (pageNumber === undefined) {
            usersAction
                .getUserPayments(userId, params, signal)
                .then((res) => {
                    const { totalCount } = res.data.meta
                    const datas = res.data.data

                    setRowsData(datas.paymentHistory)
                    totalUsers.current = totalCount
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 500)
                })
                .catch(() => {
                    showSnackBar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 500)
                })
        } else {
            usersAction
                .getUserPayments(userId, params, signal)
                .then((res) => {
                    const { totalCount } = res.data.meta
                    const datas = res.data.data
                    const fullData = [...rowsData, ...datas.paymentHistory]
                    setRowsData(fullData)
                    totalUsers.current = totalCount
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 500)
                })
                .catch(() => {
                    showSnackBar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 500)
                })
        }

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, sortOption])
    return (
        <React.Fragment>
            {isLoading ? (
                <Skeleton sx={{ height: 600 }} animation="wave" variant="rounded" />
            ) : rowsData.length > 0 ? (
                <Paper
                    elevation={4}
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <TableContainer sx={{ maxHeight: 700 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={index}>
                                                <TableCell align="left">{row.payId}</TableCell>
                                                <TableCell align="center">
                                                    {row.subcription === 1
                                                        ? row.subcription + ' tháng'
                                                        : row.subcription + ' tháng'}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box>
                                                        <Typography>
                                                            {row.subcription === 1 ? '30.000 VND' : '60.000 VND'}
                                                        </Typography>
                                                        <Label variant="ghost" color="success">
                                                            Đã thanh toán
                                                        </Label>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {new Date(row.effectiveDate).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {new Date(row.expirationDate).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paging lengthRow={totalUsers.current} />
                </Paper>
            ) : (
                <Box>
                    <EmptyStudySets
                        image={payment}
                        textAbove="Bạn chưa có thanh toán nào"
                        textBelow="Các thanh toán bạn thực hiện sẽ hiển thị ở đây."
                        path="/upgrade"
                        content="Mua Premium"
                        imgStyle={{ width: 500, height: 300, mb: 2 }}
                    />
                </Box>
            )}
        </React.Fragment>
    )
}
