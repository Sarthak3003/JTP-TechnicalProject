import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Paper, Grid, TextField, Typography, Button } from '@mui/material'
import Lottie from 'react-lottie'
import lottie from '../assets/planting.json'
import { getRec, getImg } from '../services'
import Loader from './Loader'

export default function BasicGrid() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const [json, setJson] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
    rainfall: '',
  })

  const [load, setLoad] = useState(false)
  const [results, setResults] = useState()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  //-------------api integration code----------------
  const handleSubmit = () => {
    setLoad(true)
    setTimeout(async function () {
      try {
        const res = await getRec(json)
        console.log(res)
        setResults(res.data)
        setLoad(false)
      } catch (e) {
        console.log(e)
        setLoad(false)
      }
    }, 3000)
  }

  return (
    <Box sx={{ flexGrow: 1, pl: 20, pb: 5 }}>
      {load ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary">
              <b>Get crop recommendation</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <Typography variant="h5" color="initial">
                  <b>Enter your stats</b>
                </Typography>
              </Grid> */}
              <Grid item xs={12}>
                <Typography variant="h6" color="initial">
                  Your soil composition
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="nitrogen"
                  placeholder="Nitrogen level (in %)"
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
                  placeholder="Phosphorus level (in %)"
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
                  placeholder="Potassium level (in %)"
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
              <Grid item xs={12}>
                <Typography variant="h6" color="initial">
                  Your weather
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="temperature"
                  placeholder="Temperature (in °C)"
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
                  placeholder="Humidity (in %)"
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
                  placeholder="Rainfall (in cm)"
                  name="rainfall"
                  variant="outlined"
                  fullWidth
                  value={json.rainfall}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ width: '100%', borderRadius: '10px' }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {results ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    {/* <Paper sx={{ height: '50vh', p: 2 }}> */}
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{ textAlign: 'center', pb: 1 }}
                    >
                      <b> Results</b>
                    </Typography>
                    <img
                      src={results?.image}
                      alt="img"
                      width="60%"
                      style={{ borderRadius: '10px' }}
                    />
                    <Typography
                      variant="h6"
                      color="initial"
                      sx={{ pt: 1, textAlign: 'center' }}
                    >
                      {/* {results?.message} */}
                      Based on the information, <b>
                        {' '}
                        {results.crop}
                      </b> would <br />
                      be the best crop to grow.
                    </Typography>
                    {/* </Paper> */}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '-150px',
              }}
            >
              <Lottie options={defaultOptions} height={250} width={250} />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}
