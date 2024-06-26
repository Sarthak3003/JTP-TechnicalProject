import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

export default function ButtonAppBar() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    localStorage.removeItem('jtpToken')
    navigate('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar >
          <Typography variant="h6" sx={{ flexGrow: 1, ml: '40%' }}>
            Crop Recommendation system
          </Typography>
          <Button color="inherit" variant="outlined" sx={{float: 'right', marginLeft: 5}} onClick={handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
