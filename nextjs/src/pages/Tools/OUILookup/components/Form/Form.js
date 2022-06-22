/* eslint-disable react/no-unescaped-entities */
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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Form = () => {
  const theme = useTheme();

  const [address, setAddress] = React.useState('');
  const [ouis, setOuis] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);

  const handleAddress = (e) => {

    const trimmedAddress = e.target.value;
    const addressArray = trimmedAddress.split(',');
    var error = false;


    for (var i = 0; i < addressArray.length; i++) {
      const sp = addressArray[i].replace(/\.|\:|\-/g,'|');

      const temp = sp.split('|').join('').replace(' ','');
      
      if (temp.length != 6 && temp.length != 12) {
        error = true;
        break;
      } else {
        error = false;
      }
      // if (addressArray[i].length != 12 && addressArray[i].length != 6 && addressArray.length[i] != 0) {
      //   error = true;
      //   break;
      // } else {
      //   console.log(addressArray[i].length)
      //   error = false;
      // }
    }

    if (!error) {
      setAddress(trimmedAddress);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  

  const submitForm = async (e) => {
    e.preventDefault();

    console.log(address);
    try {
      await axios
        .get('http://macauth.herokuapp.com/oui/' + address)
        .then(res => {
          setOuis(res.data);
        
        });
    } catch (err) {
      window.location.href = '/authorizer?' + err;
    }
  };

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
                  <strong>Tip:</strong> Dots, colons, or dashes (. / : / -) will be ignored. Separate the addresses with a comma.
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
                label="MAC Addresses"
                multiline
                rows={3}
                variant="outlined"
                color="primary"
                size="medium"
                name="address"
                fullWidth
                onChange={handleAddress}
              />
            </Grid>

            
            <Grid item container justifyContent={'center'} xs={9}>

              
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>MAC Address / OUI Code</TableCell>
                      <TableCell>OUI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ouis.map((item,i) => (
                      <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {item.address}
                        </TableCell>
                        <TableCell>{item.oui}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                Search OUI
              </Button>
            </Grid>
          </Grid>
        </form>

      </Box>
    </Box>
  );
  
};

export default Form;
