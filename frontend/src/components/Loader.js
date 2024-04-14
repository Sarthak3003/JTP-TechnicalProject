import React from 'react'
import Lottie from 'react-lottie'
import lottie from '../assets/loading.json'
import {Grid, Typography} from '@mui/material'

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Lottie options={defaultOptions} height={300} width={450} />
        </Grid>
      </Grid>
    </>
  )
}

export default Loader