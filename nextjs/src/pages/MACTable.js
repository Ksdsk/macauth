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
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';





const mock = [
  {
    oui: 'VMware, Inc.',
    macaddress: '00-50-56-e2-5e-fb',
    internetaddress: '192.168.160.254',
    status: 'Active',
    type: 'Dynamic',
  },
  {
    oui: 'VMware, Inc.',
    macaddress: '00-50-56-f4-fe-d3',
    internetaddress: '192.168.174.254',
    status: 'Active',
    type: 'Dynamic',
  },
  {
    oui: 'Cisco Systems, Inc',
    macaddress: '58-f3-9c-f8-e2-c0',
    internetaddress: '192.168.4.1',
    status: 'Active',
    type: 'Dynamic',
  },

];

const SimpleStriped = () => {
  const theme = useTheme();
  const temp = [{
    _id: 0
  }]
  const [addresses, setAddresses] = useState(temp);
  const [loading, setLoading] = useState(false);

  const addressesFunction = async () => {
    try {
      const data = await axios
      .get("http://localhost:8080/devices")
      .then(res => {
        console.log(res.data)
        setAddresses(res.data)
        console.log(res.data[0]._id)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect( () => {
    addressesFunction()
    console.log(addresses)
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
              <Typography
                variant={'caption'}
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                Update
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant={'caption'}
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                Delete
              </Typography>
            </TableCell>
            <TableCell />
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
                <Typography color={'text.secondary'} variant={'subtitle2'}>
                  {item.address}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color={'text.secondary'} variant={'subtitle2'}>
                  {item.last_active}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color={'primary'}
                  variant={'subtitle2'}
                  fontWeight={700}
                  sx={{ cursor: 'pointer' }}
                >                  
                  <UpgradeIcon/>             
                  <DeleteIcon/>
                  <InfoIcon/>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default SimpleStriped;
