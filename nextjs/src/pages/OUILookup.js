/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Container from 'components/Container';

const SimpleSignInForm = () => {
  return (
    <Box bgcolor={'alternate.main'}>
      <Card sx={{ p: { xs: 4, md: 6 } }}>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant={'subtitle1'} sx={{ marginBottom: 2 }}>
                Enter the OUI or MAC Address
              </Typography>
              <TextField
                label=""
                variant="outlined"
                name={'email'}
                fullWidth
              />
              <Typography variant={'subtitle2'} sx={{ marginTop: 5 }}>
                Enter the OUI or MAC Address
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default SimpleSignInForm;
