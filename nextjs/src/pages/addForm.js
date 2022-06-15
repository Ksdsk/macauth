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
import DialogDynamic from 'blocks/dialog/dialogDynamic'
import AddForm from 'blocks/formLayouts/Contact'
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

    <AddForm/>

  );
};

export default SimpleStriped;
