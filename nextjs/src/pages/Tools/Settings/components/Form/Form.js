/* eslint-disable react/no-unescaped-entities */
// Imports
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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';





// if settings get too complicated i'll add the dialogs




/**
 * StatusAlert
 * Unused ^^^
 * @returns {JSX.Element}
 */
const StatusAlert = () => {

  // React Hooks
  const [open, setOpen] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [address, setAddress] = React.useState('');
  
  // Determine the status of the form
  useEffect(() => {
    if (read_cookie('status').length != [0]) {
      setStatus(read_cookie('status').split('?')[0]);
    }

    if (read_cookie('status').length != [0]) {
      if (read_cookie('address_format') == 1) {
        setAddress(read_cookie('status').split('?')[1].replace(/(.{4})/g,'$&.').slice(0,-1));
      } else if (read_cookie('address_format') == 2) {
        setAddress(read_cookie('status').split('?')[1].replace(/(.{2})/g,'$&:').slice(0,-1));
      } else if (read_cookie('address_format') == 3) {
        setAddress(read_cookie('status').split('?')[1].replace(/(.{2})/g,'$&-').slice(0,-1));
      } else {
        setAddress(read_cookie('status').split('?')[1].replace(/(.{4})/g,'$&.').slice(0,-1));
      }
    }

    // Delete the status cookie after setting the status
    delete_cookie('status');
    delete_cookie('address');
  
  });

  // Return the status alert
  if (status == 'success') {
    return (
      <Collapse in={open} style={{width: '100%'}}>
        <Alert
          style={{width: '100%'}}
          severity="success" 
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Success: Authorized {address} successfully.
        </Alert>
      </Collapse>

    );
  } else if (status == 'error') {
    return (

      <Collapse in={open} style={{width: '100%'}}>
        <Alert
          style={{width: '100%'}}
          severity="error" 
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
        Error: {address} could not be added. Contact support for assistance.
        </Alert>
      </Collapse>

    );
  } else {
    return (
      <div></div>
    );
  }
};

/**
 * Form
 * Form for the settings page
 * @returns {JSX.Element}
 */
const Form = () => {

  // Mobile check
  const theme = useTheme();
  const { themeToggler } = theme;
  const { mode } = theme.palette;

  // Submit the form
  const submitForm = (e) => {

    e.preventDefault();

    // Set temp status cookie
    if (read_cookie('temp_theme').length == [0]) {
      bake_cookie('theme', 'light');
    } else {
      bake_cookie('theme', read_cookie('temp_theme'));
    }

    bake_cookie('address_format', read_cookie('temp_address_format'));
    bake_cookie('time_zone', read_cookie('temp_time_zone'));

    // Toggle theme based on the theme cookie
    if (mode != read_cookie('theme')) {
      themeToggler();
    }
  };

  // Reset the settings
  const resetSettings = (e) => {

    e.preventDefault();

    // remove all cookies
    delete_cookie('theme');
    delete_cookie('address_format');
    delete_cookie('time_zone');
    delete_cookie('temp_theme');
    delete_cookie('temp_address_format');
    delete_cookie('temp_time_zone');

    // default the theme to light
    if (mode != 'light') {
      themeToggler();
    }

    window.location.reload();
  };


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

            <Grid item xs={6}>
              {/* Empty for placement */}
            </Grid>

            <Grid item container justifyContent={'center'} xs={3}>
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
            
            <Grid item container justifyContent={'center'} xs={3}>
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
