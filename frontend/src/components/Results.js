import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Paper, Grid, TextField } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function BasicGrid() {
  const [json, setJson] = useState({
    // add fields from postman
  })

  const [load, setLoad] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  //-------------api integration code----------------
  // const handleSubmit = async () => {
  //   setLoad(true)
  //   await createErupi({
  //     ...json,
  //     startsAt: new Date(json.startsAt),
  //     endsAt: new Date(json.endsAt),
  //   })
  //     .then((res) => {
  //       console.log('first')
  //       console.log(res.data)
  //       successHandler(res.data.message)
  //       setLoad(false)
  //     })
  //     .catch((e) => {
  //       errorHandler('createErupi failed')
  //       setLoad(false)
  //     })
  // }

  return (
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ height: '50vh' }}>results</Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
