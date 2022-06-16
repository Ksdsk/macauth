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

const Form = () => {
  const theme = useTheme();

  const [address, setAddress] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);

  const handleAddress = (e) => {
    if (/^[a-zA-Z0-9\:\.\-]+$/.test(e.target.value)) {
      // check for right length
      const trimmedAddress = e.target.value.replace(/[\:\.\-]/g,'')
      if (trimmedAddress.length == 12) {
        setAddress(trimmedAddress)
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    } else {
      setDisabled(true)
    }
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault();
    const authorizedAddress = {
      address: address,
      description: description
    }

    try {
      axios.post("http://localhost:8080/devices", authorizedAddress)
      .then((res) => console.log(res.data))
    } catch (err) {
        console.log(err)
    }
  }

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
            <Grid item container justifyContent={'center'} xs={12}>
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
