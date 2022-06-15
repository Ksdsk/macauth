import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DialogRemove from '../dialogRemove';

const DialogDynamic = ({itemAddress, itemOuiLong, itemLastActive, itemDateAdded}) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                        More Options
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{itemAddress}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <strong>OUI Details:</strong> {itemOuiLong}
                            </DialogContentText>
                            <DialogContentText>
                                <strong>Last Active:</strong> {itemLastActive}
                            </DialogContentText>
                            <DialogContentText>
                                <strong>Date Added:</strong> {itemDateAdded}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <DialogRemove
                                itemAddress={itemAddress}
                            />
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
        </Box>
        
    )
}

export default DialogDynamic;