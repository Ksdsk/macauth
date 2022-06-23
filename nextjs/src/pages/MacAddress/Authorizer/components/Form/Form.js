/* eslint-disable react/no-unescaped-entities */

// Imports
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

/**
 * StatusAlert
 * Returns a status alert based on the status cookie
 * @returns {JSX.Element}
 */
const StatusAlert = () => {
  
  // React Hooks
  const [open, setOpen] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [address, setAddress] = React.useState('');
  
  // Get the status cookie and set the status
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
  } else if (status == 'warning') {
    return (

      <Collapse in={open} style={{width: '100%'}}>
        <Alert
          style={{width: '100%'}}
          severity="warning" 
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
          Warning: The OUI for {address} is undefined.
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
 * Returns the form for adding MAC addresses
 * @returns {JSX.Element}
 */
const Form = () => {

  // React Hooks
  const [address, setAddress] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [status, setStatus] = React.useState('');

  // Check if the address is valid
  const handleAddress = (e) => {
    if (/^[a-zA-Z0-9\:\.\-]+$/.test(e.target.value)) {
      // check for right length
      const trimmedAddress = e.target.value.replace(/[\:\.\-]/g,'');
      if (trimmedAddress.length == 12) {
        setAddress(trimmedAddress);
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  };

  // Adds into description
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // Submit the form
  const submitForm = (e) => {
    e.preventDefault();
    const authorizedAddress = {
      address: address,
      description: description
    };

    // Post the authorized address
    try {
      axios.post('http://macauth.herokuapp.com/devices', authorizedAddress)
        .then((res) => {
          if (res.data.oui == null) {
            bake_cookie('status', 'error?'+res.data.address);
            window.location.href = '/authorizer';
          } else {
            if (res.data.oui == 'Unregistered') {
              bake_cookie('status', 'warning?'+res.data.address);
              window.location.href = '/authorizer';
            } else {
              bake_cookie('status', 'success?'+res.data.address);
              window.location.href = '/authorizer';
            }
          }
        });
    } catch (err) {
      window.location.href = '/authorizer?status=error&address=' + res.data.address;
    }
  };

  // Return the form
  return (

    <Box>
      <Box
        width={1}
        marginBottom={4}
      >
        <form noValidate autoComplete="off">
          <Grid container spacing={4}>

            <Grid item container xs={12}>
              <Box>
                <Typography variant="h6" >
                  <strong>Tip:</strong> Dots, colons, or dashes (. / : / -) will be ignored.
                </Typography>
                <Typography variant="body2" fontWeight={'light'}>
                  e.g. AA:BB:CC:DD:EE:FF, AA-BB-CC-DD-EE-FF, AAAA.BBBB.CCCC is <span style={{color: 'green'}}> valid</span>, 
                  but AA^BB^CC^DD^EE^FF is <span style={{color: 'red'}}>not</span>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ height: 54 }}
                label="MAC Address"
                variant="outlined"
                color="primary"
                size="medium"
                name="macAddress"
                fullWidth
                onChange={handleAddress}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                variant="outlined"
                color="primary"
                size="medium"
                name="description"
                fullWidth
                onChange={handleDescription}
              />
            </Grid>

            <Grid item container justifyContent={'center'} xs={9}>
              <StatusAlert/>
            </Grid>

            <Grid item container justifyContent={'center'} xs={3}>
              <Button
                sx={{ height: 54, minWidth: 150 }}
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                fullWidth
                disabled={disabled}
                onClick={submitForm}
              >
                Authorize this address
              </Button>
            </Grid>

          </Grid>
        </form>
      </Box>
    </Box>
  );
  
};

export default Form;
