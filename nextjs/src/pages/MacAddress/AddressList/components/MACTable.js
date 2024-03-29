// Imports
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import DialogDynamic from './dialog/dialogDynamic';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * AddressTable
 * Shows the user the list of addresses
 * @returns {JSX.Element}
 */
const AddressTable = () => {

  // Create a temporary loading state
  const temp = [{
    _id: 0,
    oui: <CircularProgress/>, 
    address: <CircularProgress/>,
    last_active: "."
  }];

  // React Hooks
  const [addresses, setAddresses] = useState(temp);

  /**
   * addressFunction
   * Gets the list of addresses from the database
   */
  const addressesFunction = async () => {
    try {
      await axios
        .get('http://192.168.6.19:8080/devices')
        .then(res => {
          console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            if (read_cookie('address_format') == 1) {
              res.data[i].address = res.data[i].address.replace(/(.{4})/g,'$&.').slice(0,-1);
            } else if (read_cookie('address_format') == 2) {
              res.data[i].address = res.data[i].address.replace(/(.{2})/g,'$&:').slice(0,-1);
            } else if (read_cookie('address_format') == 3) {
              res.data[i].address = res.data[i].address.replace(/(.{2})/g,'$&-').slice(0,-1);
            } else {
              res.data[i].address = res.data[i].address.replace(/(.{4})/g,'$&.').slice(0,-1);
            }
          
            if (read_cookie('time_zone').length != 0) {
              console.log(res.data[i].date_added);
              res.data[i].date_added = Math.floor(new Date(res.data[i].date_added).getTime()) + (3600000 * read_cookie('time_zone'));
            }

            if (read_cookie('time_zone').length != 0) {
              console.log(res.data[i].last_active);
              res.data[i].last_active = Math.floor(new Date(res.data[i].last_active).getTime()) + (3600000 * read_cookie('time_zone'));
            }

          }
          setAddresses(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Run the script before the component is rendered
  useEffect(() => {
    addressesFunction();
  }, []);

  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: 'alternate.dark' }}>
          <TableRow>
            <TableCell>
              <Typography
                variant={'caption'}
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                OUI
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant={'caption'}
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                MAC Address
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant={'caption'}
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                Last Active
              </Typography>
            </TableCell>
            <TableCell>
              {/* Empty for more options */}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses.map((item, i) => (
            <TableRow
              key={i}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:nth-of-type(2n)': { bgcolor: 'alternate.main' },
              }}
            >
              <TableCell component="th" scope="row">
                <Typography variant={'subtitle2'} fontWeight={700}>
                  {item.oui}
                </Typography>
              </TableCell>
              <TableCell>
                {item.address}
              </TableCell>
              <TableCell>
                <Typography color={'text.secondary'} variant={'subtitle2'}>
                  {
                    (item.last_active == ".") ? <CircularProgress/> : new Date(item.last_active).toUTCString().slice(0,-4)
                  }
                </Typography>
              </TableCell>
              <TableCell>
                <DialogDynamic
                  itemAddress={item.address + ''}
                  itemOuiLong={item.oui_long + ''}
                  itemDateAdded={item.date_added + ''}
                  itemLastActive={item.last_active + ''}
                  itemDescription={item.description + ''}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default AddressTable;
