import { useState, useEffect } from 'react'
import { Box, Paper, Grid, TextField, Typography, Button } from '@mui/material'
import lottie from '../assets/planting.json'
import { getIdealVal } from '../services'
import Loader from './Loader'
import { Icon } from '@iconify/react'
import farming from '../assets/farming.jpg'

// Define the main component
export default function BasicGrid() {
  // Define default options for the Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  // Define a state variable for the form data
  const [json, setJson] = useState({
    crop: '',
  })

  const [load, setLoad] = useState(false)
  const [results, setResults] = useState()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJson({ ...json, [name]: value })
  }

  //-------------api integration code----------------
  // Define a function to handle form submission
  const handleSubmit = () => {
    setLoad(true)
    setTimeout(async function () {
      try {
        const res = await getIdealVal(json)
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
              <b>Get ideal conditions for your crop</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              spacing={2}
              sx={{
                height: '40vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item xs={8}>
                <TextField
                  id="crop"
                  placeholder="Enter crop name"
                  // label="crop level"
                  name="crop"
                  variant="outlined"
                  fullWidth
                  value={json.crop}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  sx={{ width: '100%', borderRadius: '10px' }}
                  variant="outlined"
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
              <Paper sx={{ height: '40vh', p: 2, mr: 10 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      color="initial"
                      sx={{ textAlign: 'center' }}
                    >
                      <b>Ideal conditions for {results?.crop}</b>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <Icon
                      icon="iconoir:soil-alt"
                      color="#34A853"
                      width="30"
                      height="30"
                      style={{ marginRight: '0.5em' }}
                    />
                    <Typography variant="body1" color="initial">
                      Soil composition:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="initial">
                      Nitrogen: {results?.message.N}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="initial">
                      Phosphorus: {results?.message.P}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="initial">
                      Potassium: {results?.message.K}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="initial">
                      pH level: {results?.message.ph}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <Icon
                      icon="fluent:temperature-48-regular"
                      color="#34A853"
                      width="28"
                      height="28"
                    />
                    <Typography variant="body1" color="initial">
                      Temperature: {results?.message.temperature}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <Icon
                      icon="material-symbols:humidity-mid-outline"
                      color="#34A853"
                      width="20"
                      height="20"
                      style={{ marginRight: '0.3em', marginLeft: '0.3em' }}
                    />
                    <Typography variant="body1" color="initial">
                      Humidity: {results?.message.humidity}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <Icon
                      icon="carbon:rain-heavy"
                      color="#34A853"
                      width="20"
                      height="20"
                      style={{ marginRight: '0.3em', marginLeft: '0.3em' }}
                    />
                    <Typography variant="body1" color="initial">
                      Rainfall: {results?.message.rainfall}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={6}>
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src={farming} alt="farming" /></Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}
