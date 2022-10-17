import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../store/store'

const AuthGuard = () => {
    const store = useAppContext()

    const checkLogin = localStorage.getItem('user') ? false : true
    const result = store.stateAuth
    return result ? <Outlet /> : checkLogin && <Navigate replace to='/login' />
}

export default AuthGuard