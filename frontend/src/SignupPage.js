import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { register } from './services'
import { errorHandler, successHandler } from './components/toasts'


// Define the main SignInSide component
export default function SignInSide() {

  // Get the navigate function from useNavigate hook
  const navigate = useNavigate()
  // Define a state variable to handle loading state
  const [load, setLoad] = useState(false)

  // Define the handleSubmit function that will be called when the form is submitted
  const handleSubmit = async (event) => {
    setLoad(true)
    event.preventDefault()
    try {
      const data = new FormData(event.currentTarget)
      const res = await register({
        email: data.get('email'),
        password: data.get('password'),
      })
      console.log(res)
      localStorage.setItem('jtpToken', res.data.access)
      successHandler('Registered!')
      setLoad(false)
      navigate('/login')
    } catch (e) {
      console.log(e)
      errorHandler('Error while registering')
      setLoad(false)
    }
  }
  // Return the JSX to render
  // A Grid container that takes up the full viewport height
  // The Grid container has two Grid items
  // The first Grid item is a Paper component that takes up the full height on small screens and 5/12 of the height on medium screens
  // The Paper component contains a Box component that has a form with two text fields for email and password, a submit button, and a link to the login page
  // The second Grid item is a background image that takes up the full height on small screens and 7/12 of the height on medium screens

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 20,
            mx: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {load ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <CircularProgress color="secondary" size={25} />
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            )}

            <Grid container>
              <Grid item>
                <Link href="http://localhost:3000/login" variant="body2">
                  {'Already an exististing user? Login'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://cdn.pixabay.com/photo/2014/09/09/19/07/corn-field-440338_640.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  )
}