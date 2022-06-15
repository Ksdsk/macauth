import React from 'react';
import Grid from '@mui/material/Grid';
import { Form } from './components';
import Router from 'react-router-dom'
const Contact = () => {
  return (

    <Grid container spacing={{ xs: 4}}>
      <Grid item container xs={12} md={12} alignItems={'center'}>
        <Form />
      </Grid>
    </Grid>

  );
};

export default Contact;
