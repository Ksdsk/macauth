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
import { useState, useEffect } from "react";
import axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import DialogDynamic from './dialog/dialogDynamic'


const SimpleStriped = () => {
  const theme = useTheme();
  const temp = [{
    _id: 0
  }]

  const [data, setData] = useState();

  const [addresses, setAddresses] = useState(temp);

  const [addressFormat, setAddressFormat] = React.useState('');

  useEffect(() => {
    if (read_cookie("address_format").length == 0) {
      setAddressFormat(1)
    } else {
      setAddressFormat(read_cookie("address_format"))
    }
  })
  
  const CustomAddress =  async () => {

    // if (addressFormat == 1) { // dots
    //   const formatted = props.address.replace(/(.{4})/g,"1.")
      return (
        <Typography color={'text.secondary'} variant={'subtitle2'}>
         {addressFormat == 1 ? item.address.replace(/.{4}/g,"$&.").slice(0,-1) : ""}
        </Typography>
      )
    // }
  }

  const addressesFunction = async () => {
    try {
      const data = await axios
      .get("http://localhost:8080/devices")
      .then(res => {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          if (read_cookie("address_format") == 1) {
            res.data[i].address = res.data[i].address.replace(/(.{4})/g,"$&.").slice(0,-1)
          } else if (read_cookie("address_format") == 2) {
            res.data[i].address = res.data[i].address.replace(/(.{2})/g,"$&:").slice(0,-1)
          } else if (read_cookie("address_format") == 3) {
            res.data[i].address = res.data[i].address.replace(/(.{2})/g,"$&-").slice(0,-1)
          } else {
            res.data[i].address = res.data[i].address.replace(/(.{4})/g,"$&.").slice(0,-1)
          }
          
          if (read_cookie("time_zone").length != 0) {
            console.log(res.data[i].date_added)
            res.data[i].date_added = Math.floor(new Date(res.data[i].date_added).getTime() / 1000) + (3600000 * read_cookie("time_zone"))
          }

          if (read_cookie("time_zone").length != 0) {
            console.log(res.data[i].last_active)
            res.data[i].last_active = Math.floor(new Date(res.data[i].last_active).getTime() / 1000) + (3600000 * read_cookie("time_zone"))
          }

        }
        setAddresses(res.data)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    addressesFunction()
    
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
                    new Date(item.last_active).toUTCString()
                  }
                </Typography>
              </TableCell>
              <TableCell>
                <DialogDynamic
                  itemAddress={item.address + ""}
                  itemOuiLong={item.oui_long + ""}
                  itemDateAdded={item.date_added + ""}
                  itemLastActive={item.last_active + ""}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default SimpleStriped;
