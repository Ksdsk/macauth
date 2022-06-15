import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const mock = [
  {
    groupTitle: 'MAC Address',
    id: 'macaddress',
    pages: [
      {
        title: 'Address List',
        href: '/',
        icon: (
          <FormatListBulletedOutlinedIcon/>
        ),
      },
      {
        title: 'Authorizer',
        href: '/authorizer',
        icon: (
          <AddTaskOutlinedIcon/>
        ),
      },
      {
        title: 'Audit Logs',
        href: '/',
        icon: (
          <PolicyOutlinedIcon/>
        ),
      }
    ],
  },
  {
    groupTitle: 'Tools',
    id: 'tools',
    pages: [
      {
        title: 'OUI Lookup',
        href: '#',
        icon: (
          <DialpadOutlinedIcon/>
        ),
      },
      {
        title: 'Settings',
        href: '#',
        icon: (
          <SettingsIcon/>
        ),
      },
    ],
  },
  {
    groupTitle: 'Support',
    id: 'support',
    pages: [
      {
        title: 'Support',
        href: '#',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        ),
      },
      {
        title: 'Announcements',
        href: '#',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        ),
      },
    ],
  },
];

const SidebarNav = () => {
  return (
    <Box padding={2}>
      {mock.map((item, i) => (
        <Box key={i} marginBottom={3}>
          <Typography
            variant="caption"
            color={'text.secondary'}
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 1,
              display: 'block',
            }}
          >
            {item.groupTitle}
          </Typography>
          <Box>
            {item.pages.map((p, i) => (
              <Box marginBottom={1 / 2} key={i}>
                <Button
                  component={'a'}
                  href={p.href}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                  }}
                  startIcon={p.icon || null}
                >
                  {p.title}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SidebarNav;
