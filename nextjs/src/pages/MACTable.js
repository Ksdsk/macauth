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

import Container from 'components/Container';

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
                Internet Address
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant={'caption'}
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant={'caption'}
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                Type
              </Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {mock.map((item, i) => (
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
                  {item.macaddress}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color={'text.secondary'} variant={'subtitle2'}>
                  {item.internetaddress}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant={'caption'}
                  fontWeight={700}
                  sx={{ color: theme.palette.success.dark }}
                >
                  {item.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color={'text.secondary'} variant={'subtitle2'}>
                  {item.type}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color={'primary'}
                  variant={'subtitle2'}
                  fontWeight={700}
                  sx={{ cursor: 'pointer' }}
                >
                  Details
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
