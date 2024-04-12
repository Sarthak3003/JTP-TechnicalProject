import React from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Results from './components/Results'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Form />
        </Grid>
        <Grid item xs={6}>
          <Results />
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage