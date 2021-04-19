import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import DeleteIcon from "@material-ui/icons/Delete";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { deleteWorkout } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    marginLeft: "auto",
    height: 50,

    // position: "absolute",
    // left: "92%",
    // top: "6%",
    // transition: "height 0.2s width 0.2s ease-in-out 0.5s",
    // "&:hover": {
    //   transform: "scale(1.08)",
    //},
  },
  progress: {
    marginLeft: "auto",
    marginRight: 10,
    height: 50,
    marginTop: 10,
  },
};

class DeleteWorkout extends Component {
  state = {
    open: false,
    clicked: false,
  };

  handleClick = () => {
    this.setState({ clicked: true });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteWorkout = () => {
    this.props.deleteWorkout(this.props.workoutId);
    this.setState({ open: false });
    this.handleClick();
  };
  render() {
    const { classes } = this.props;
    const {
      UI: { loading },
    } = this.props;

    let deleteMarkup = !this.state.clicked ? (
      <IconButton onClick={this.handleOpen} className={classes.deleteButton}>
        <DeleteOutlineIcon color="secondary"></DeleteOutlineIcon>
      </IconButton>
    ) : (
      <CircularProgress
        className={classes.progress}
        size={30}
      ></CircularProgress>
    );
    return (
      <Fragment>
        {deleteMarkup}
        <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="xs">
          <DialogTitle>Delete workout?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose}>Close</Button>
            <Button onClick={this.deleteWorkout}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteWorkout.propTypes = {
  deleteWorkout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  workoutId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { deleteWorkout })(
  withStyles(styles)(DeleteWorkout)
);
