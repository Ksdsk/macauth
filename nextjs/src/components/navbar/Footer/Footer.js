import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          MacAuth MAC Diagnosis
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          Please do not upload the website online. This website runs a REST API that returns information within a test network. 
          The interface is built like a glass, so it&apos;s prone to break. It was just built for fun, and shouldn&apos;t be used for any critical uses. 
          I wish I was smart enough to turn this into an actual product though.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
