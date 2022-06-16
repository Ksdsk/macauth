/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ThemeSelect from '../ThemeSelect';
import AddressFormat from '../AddressFormat';
import TimeZoneFormat from '../SetTimeZone';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const Form = () => {
  const theme = useTheme();
  const { themeToggler } = theme;
  const { mode } = theme.palette;

  const submitForm = (e) => {
    e.preventDefault();
    bake_cookie("theme", read_cookie("temp_theme"));
    bake_cookie("address_format", read_cookie("temp_address_format"))
    bake_cookie("time_zone", read_cookie("temp_time_zone"))
    if (mode != read_cookie("theme")) {
      themeToggler();
    }
  }

  const resetSettings = (e) => {
    e.preventDefault();
    delete_cookie("theme")
    delete_cookie("address_format")
    delete_cookie("time_zone")
    delete_cookie("temp_theme")
    delete_cookie("temp_address_format")
    delete_cookie("temp_time_zone")

    if (mode != "light") {
      themeToggler();
    }
    window.location.reload();
  }


  return (

    <Box>
      <Box
        width={1}
        marginBottom={4}
      >
        <form noValidate autoComplete="off">
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <Box
                sx={{display: 'flex', alignItems: 'center', height: 50}}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                >
                  Theme
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <ThemeSelect/>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{display: 'flex', alignItems: 'center', height: 50}}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                >
                  Address Format
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <AddressFormat/>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{display: 'flex', alignItems: 'center', height: 50}}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                >
                  Time Zone
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <TimeZoneFormat/>
            </Grid>
            <Grid xs={8}>
            {/* Empty for placement */}
            </Grid>
            <Grid item container justifyContent={'center'} xs={2}>
              <Button
                sx={{ height: 54, minWidth: 150 }}
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                fullWidth
                onClick={submitForm}
              >
                Save
              </Button>
            </Grid>
            <Grid item container justifyContent={'center'} xs={2}>
              <Button
                sx={{ height: 54, minWidth: 150 }}
                variant="contained"
                color="error"
                size="medium"
                type="submit"
                fullWidth
                onClick={resetSettings}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
  
};

export default Form;
