import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './SigninPage'
import SignupPage from './SignupPage'
import HomePage from './HomePage'

export default function MainRouter() {
  function PrivateRouter() {
    const token = localStorage.getItem("jtpToken")
    return token !== null ? <>
        <Outlet />
    </> : <>
        {
            localStorage.getItem("jtpToken") === null && <Navigate to="/login" />
        }
    </>
}

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<SignupPage />} />

        <Route path='/' element={<PrivateRouter />} >
          <Route exact path='/' element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}
