import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Paper, Grid, TextField, Typography, Button } from '@mui/material'
import { getRec } from '../services'

export default function BasicGrid() {
  const [json, setJson] = useState({
    nitrogen : '',
    phosphorus : '',
    potassium : '',
    ph : '',
    temperature : '',
    humidity : '',
    rainfall : ''
  })

  const [load, setLoad] = useState(false)
  const [results, setResults] = useState()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  //-------------api integration code----------------
  const handleSubmit = async () => {
    // setLoad(true)
    try {
      const res = await getRec(json)
      console.log(res)
      setResults(res.data)
      // setLoad(false)
    } catch (e) {
      console.log(e)
      // setLoad(false)
    }
  }

  return (
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}> 
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" color="initial">Enter your soil stats</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="nitrogen"
            placeholder="Nitrogen level"
            // label="Nitrogen level"
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
            placeholder="pH level"
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
            placeholder="Temperature level"
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
            placeholder="Humidity level"
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
            placeholder="Rainfall level"
            name="rainfall"
            variant="outlined"
            fullWidth
            value={json.rainfall}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button sx={{width: '100%', borderRadius:'10px'}} variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        </Grid>
        </Grid>

        {results ? ( <Grid item xs={6}> 
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ height: '50vh', p:2 }}>
              <Typography variant="h6" color="initial" sx={{textAlign: 'center'}}>Results</Typography>
              <Typography variant="body1" color="initial">{results?.message}</Typography>
            </Paper>
          </Grid>
        </Grid>
        </Grid>) : ('')}

       
        
      </Grid>
    </Box>
  )
}
