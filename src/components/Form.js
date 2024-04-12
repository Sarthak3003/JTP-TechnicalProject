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
        <Grid item xs={6}>
          <TextField
            id="nitrogen"
            placeholder="Nitrogen level"
            name="nitrogen"
            variant="outlined"
            fullWidth
            value={json.nitrogen}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="phosphorus"
            placeholder="Phosphorus level"
            name="phosphorus"
            variant="outlined"
            fullWidth
            value={json.phosphorus}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="potassium"
            placeholder="Potassium level"
            name="potassium"
            variant="outlined"
            fullWidth
            value={json.potassium}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="ph"
            placeholder="ph level"
            name="ph"
            variant="outlined"
            fullWidth
            value={json.ph}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="temperature"
            placeholder="temperature level"
            name="temperature"
            variant="outlined"
            fullWidth
            value={json.temperature}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="humidity"
            placeholder="humidity level"
            name="humidity"
            variant="outlined"
            fullWidth
            value={json.humidity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="rainfall"
            placeholder="rainfall level"
            name="rainfall"
            variant="outlined"
            fullWidth
            value={json.rainfall}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
