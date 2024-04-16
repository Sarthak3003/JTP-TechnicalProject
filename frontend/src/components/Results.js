import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Paper, Grid, TextField } from '@mui/material'

// Define a styled component using the Paper component from Material UI
// This component will have a specific background color, typography, padding, text alignment, and text color
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

// Define the main component
export default function BasicGrid() {
  const [json, setJson] = useState({
    // add fields from postman
  })
  
  // Define a state variable for the loading state
  const [load, setLoad] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  // Return the JSX to render
  return (
    // Create a Box component with specific styling
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ height: '50vh' }}>results</Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
