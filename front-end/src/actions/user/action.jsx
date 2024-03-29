import { logout } from '~/features/authSlice'
import { useAppDispatch } from '~/hooks/redux-hooks'
import authMiddleware from '~/middleware/auth-middleware'
import { get, post } from '~/utils/ApiCaller'

const useUser = () => {
    const dispatch = useAppDispatch()
    const getUserInfo = (id, signal) => {
        const isAuth = authMiddleware()

        if (isAuth) return get({ endpoint: `/api/users/${id}`, signal })
        else dispatch(logout())
    }

    const updateUserInfo = (userInfo) => {
        const isAuth = authMiddleware()

        if (isAuth) return post({ endpoint: `/api/users`, body: userInfo })
        else dispatch(logout())
    }

    const getPremiumUsers = (filter, signal) => {
        const isAuth = authMiddleware()

        if (isAuth) return get({ endpoint: `/api/Users/premium${filter}`, signal })
        else dispatch(logout())
    }

    const getUserPayments = (userId, filter, signal) => {
        const isAuth = authMiddleware()

        if (isAuth) return get({ endpoint: `/api/Users/payment-history/${userId}${filter}`, signal })
        else dispatch(logout())
    }

    const getUserTestResult = (userId, signal) => {
        const isAuth = authMiddleware()

        if (isAuth) return get({ endpoint: `/api/Users/test-result/${userId}`, signal })
        else dispatch(logout())
    }

    return { getUserInfo, updateUserInfo, getPremiumUsers, getUserPayments, getUserTestResult }
}

export default useUser
