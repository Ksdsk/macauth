import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const CustomSelect = () => {

  // console.log(read_cookie("e"))

  // var temp = read_cookie("temp_address_format");

  // check if not already exists

  // temp.length == 0 ? temp = '' : null;

  const [addressFormat, setAddressFormat] = React.useState('');

  useEffect(() => {
    if (read_cookie('temp_address_format').length == 0) {
    } else {
      setAddressFormat(read_cookie('temp_address_format'));
    }
  });

  const handleChange = (event) => {
    setAddressFormat(event.target.value);
    bake_cookie('temp_address_format',event.target.value);
    // if (read_cookie("agraga").length == 0) {
    //   console.log("none");
    // }
  };

  return (

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Address Format
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={addressFormat}
          label="Screen addressFormat"
          onChange={handleChange}
        >
          <MenuItem value={1}>
            <Box display={'flex'} alignItems={'center'}>
              <Box
                component={'svg'}
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                marginRight={2}
              >
                <ImportContactsOutlinedIcon/>
              </Box>
              <Typography>AAAA.BBBB.CCCC</Typography>
            </Box>
          </MenuItem>
          <MenuItem value={2}>
            <Box display={'flex'} alignItems={'center'}>
              <Box
                component={'svg'}
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                marginRight={2}
              >
                <ImportContactsOutlinedIcon/>
              </Box>
              <Typography>AA:BB:CC:DD:EE:FF</Typography>
            </Box>
          </MenuItem>
          <MenuItem value={3}>
            <Box display={'flex'} alignItems={'center'}>
              <Box
                component={'svg'}
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                marginRight={2}
              >
                <ImportContactsOutlinedIcon/>
              </Box>
              <Typography>AA-BB-CC-DD-EE-FF</Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
