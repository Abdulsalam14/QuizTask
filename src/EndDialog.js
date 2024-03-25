import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EndDialog({ isEnd, correctCount, restart }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (isEnd !== false) {
      setOpen(true);
    }
  }, [isEnd]);

  const handleConfirm = () => {
    setOpen(false);
    restart();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
      >
        <DialogTitle id="alert-dialog-title">{"End"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Correct Count:{correctCount.current}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
