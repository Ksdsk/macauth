// Imports
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

// List of all time zones
const timeZoneList = [
  {
    'time': 'UTC-12:00',
    'val': -12
  },
  {
    'time': 'UTC-11:00',
    'val': -11
  },
  {
    'time': 'UTC-10:00 Hawaii',
    'val': -10
  },
  {
    'time': 'UTC-09:30',
    'val': -9.5
  },
  {
    'time': 'UTC-09:00 Alaska',
    'val': -9
  },
  {
    'time': 'UTC-08:00 Pacific Time Zone',
    'val': -8
  },
  {
    'time': 'UTC-07:00 Mountain Time Zone',
    'val': -7
  },
  {
    'time': 'UTC-06:00 Central Time Zone',
    'val': -6
  },
  {
    'time': 'UTC-05:00 Eastern Time Zone',
    'val': -5
  },
  {
    'time': 'UTC-04:00 Atlantic Time Zone',
    'val': -4
  },
  {
    'time': 'UTC-03:30 Newfoundland Time Zone',
    'val': -3.5
  },
  {
    'time': 'UTC-03:00 São Paulo',
    'val': -3
  },
  {
    'time': 'UTC-02:00 Fernando de Noronha',
    'val': -2
  },
  {
    'time': 'UTC-01:00 Cape Verde',
    'val': -1
  },
  {
    'time': 'UTC±00:00 London',
    'val': 0
  },
  {
    'time': 'UTC+01:00 Paris',
    'val': 1
  },
  {
    'time': 'UTC+02:00 Cairo',
    'val': 2
  },
  {
    'time': 'UTC+03:00 Moscow',
    'val': 3
  },
  {
    'time': 'UTC+03:30 Tehran',
    'val': 3.5
  },
  {
    'time': 'UTC+04:00 Dubai',
    'val': 4
  },
  {
    'time': 'UTC+04:30 Kabul',
    'val': 4.5
  },
  {
    'time': 'UTC+05:00 Karachi',
    'val': 5
  },
  {
    'time': 'UTC+05:30 New Delhi',
    'val': 5.5
  },
  {
    'time': 'UTC+05:45 Kathmandu',
    'val': 5.75
  },
  {
    'time': 'UTC+06:00 Dhaka',
    'val': 6
  },
  {
    'time': 'UTC+06:30 Yangon',
    'val': 6.5
  },
  {
    'time': 'UTC+07:00 Jakarta',
    'val': 7
  },
  {
    'time': 'UTC+08:00 Beijing',
    'val': 8
  },
  {
    'time': 'UTC+08:45 Western Australia',
    'val': 8.75
  },
  {
    'time': 'UTC+09:00 Tokyo',
    'val': 9
  },
  {
    'time': 'UTC+09:30 Adelaide',
    'val': 9.5
  },
  {
    'time': 'UTC+10:00 Sydney',
    'val': 10
  },
  {
    'time': 'UTC+10:30 New South Wales',
    'val': 10.5
  },
  {
    'time': 'UTC+11:00 Nouméa',
    'val': 11
  },
  {
    'time': 'UTC+12:00 Auckland',
    'val': 12
  },
  {
    'time': 'UTC+12:45',
    'val': 12.75
  },
  {
    'time': 'UTC+13:00',
    'val': 13
  },
  {
    'time': 'UTC+14:00',
    'val': 14
  },
];

/**
 * CustomSelect
 * Selects a time zone
 * @returns {JSX.Element}
 */
const CustomSelect = () => {

  // React Hooks
  const [timeZone, setTimeZone] = React.useState('');

  // set time zone cookie
  React.useEffect(() => {
    if (read_cookie('temp_time_zone').length == 0) {
    } else {
      setTimeZone(read_cookie('temp_time_zone'));
    }
  });

  // handle change
  const handleChange = (event) => {
    setTimeZone(event.target.value);
    bake_cookie('temp_time_zone', event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select Time Zone
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeZone}
          label="Screen timeZone"
          onChange={handleChange}
        >
          {timeZoneList.map((item, i) => (
            <MenuItem value={item.val} key={i}>
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
                  <AccessTimeOutlinedIcon/>
                </Box>
                <Typography>{item.time}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
