import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const CustomSelect = () => {
  const [theme, setTheme] = React.useState('');

  React.useEffect(() => {
    if (read_cookie('temp_theme').length == 0) {
    } else {
      setTheme(read_cookie('temp_theme'));
    }
  });

  const handleChange = (event) => {
    setTheme(event.target.value);
    console.log(event.target.value);
    bake_cookie('temp_theme', event.target.value);
  };

  return (

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select Theme
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={theme}
          label="Screen theme"
          onChange={handleChange}
        >
          <MenuItem value={'light'}>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </Box>
              <Typography>Light</Typography>
            </Box>
          </MenuItem>
          <MenuItem value={'dark'}>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </Box>
              <Typography>Dark</Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
