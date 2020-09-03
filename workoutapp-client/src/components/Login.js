import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import TabPanel from "./Tabs";

const useStyles = makeStyles((theme) => ({
  dialog: {
    // minWidth: 200,
    // maxWidth: 400,
  },
  div: {
    alignItems: "flex-end",
  },
}));
export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles = {
    dialog: {
      backgroundColor: "red",
    },
    button: {
      marginLeft: 300,
    },
  };

  return (
    <div className={classes.div}>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <TabPanel></TabPanel>
        </DialogTitle>
      </Dialog>
    </div>
  );
}
