import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

export const DeleteDialog=(props)=> {
  const { onClose, open,data,handleDelete } = props;
  const handleClose = () => {
    onClose();
  };
  

  return (
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Eliminar
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Desea Eliminar: {`${data.symbol} - ${data.name}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={()=>handleDelete(data.id)} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
  );
}
