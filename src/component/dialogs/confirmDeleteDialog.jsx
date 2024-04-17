import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDilog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this Group?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button color="error" onClick={deleteHandler}>
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDilog;
