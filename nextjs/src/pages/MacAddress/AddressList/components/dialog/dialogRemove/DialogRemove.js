// Imports
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

/**
 * DialogRemove
 * Dialog for removing a MAC address
 * @param {String} itemAddress 
 * @returns {JSX.Element}
 */
const DialogRemove = ({itemAddress}) => {

  // React Hooks
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  // Trim the address from the separator
  const itemAddressTrim = (itemAddress + "").replace(/[\:\.\-]/g,'');

  /**
   * removeAddress
   * Remove the MAC address from the database
   * @param {String} address 
   */
  function removeAddress(address) {
    try {
      axios.delete('http://macauth.herokuapp.com/devices/'+address)
        .then(() => window.location.reload());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box>
      <Button onClick={handleClickOpen}>
                Remove
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>{itemAddress}</strong> will be deleted forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => removeAddress(itemAddressTrim)}>Remove</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
        
  );
};

export default DialogRemove;