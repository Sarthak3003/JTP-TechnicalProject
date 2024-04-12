import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './SigninPage'
import HomePage from './HomePage'

export default function MainRouter() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}
