// Import necessary components from react-router-dom and pages
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './SigninPage'
import SignupPage from './SignupPage'
import HomePage from './HomePage'

// Define the main router component
export default function MainRouter() {
  // Define a private router function
  function PrivateRouter() {
    // Get the token from local storage
    const token = localStorage.getItem("jtpToken")

    // If the token exists, render the child routes
    // Otherwise, redirect to the login page
    return token !== null ? <>
        <Outlet />
    </> : <>
        {
            localStorage.getItem("jtpToken") === null && <Navigate to="/login" />
        }
    </>
}

  // Define the routes for the application
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
