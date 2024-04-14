import React from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import IdealVal from './components/IdealVal'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import banner from './assets/banner.png'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={banner} alt="banner" />
        </Grid>
        <Grid item xs={12}>
          <Form />
        </Grid>
        <Grid item xs={12}>
          <IdealVal />
        </Grid>
        {/* <Grid item xs={6}>
          <Results />
        </Grid> */}
      </Grid>
    </div>
  )
}

export default HomePage