import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";

import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import { connect } from "react-redux";
import { postWorkout } from "../redux/actions/dataActions";
import { Tooltip } from "@material-ui/core";

import { withRouter } from "react-router-dom";
import Media from "react-media";

const styles = {
  newWorkoutButton: {
    color: "white",
    borderRadius: 80,
    fontWeight: "medium",
    mariginRight: "auto",
    fontSize: "80%",
  },
  form: {
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
  submitButton: {
    position: "relative",
    color: "white",
    float: "right",
    marginTop: 10,
    margin: "10px 0 2px auto",
  },
  progress: {
    position: "absolute",
  },
  closeButton: {
    marginLeft: "auto",
  },
};

class PostWorkout extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postWorkout({ body: this.state.body });
    this.setState({ body: "" });

    this.handleClose();
    this.props.history.push("/");
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <Media
          queries={{
            small: "(max-width: 415px)",
            medium: "(min-width: 415px)",
          }}
        >
          {(matches) => (
            <Fragment>
              {matches.small && (
                <Button
                  onClick={this.handleOpen}
                  size="small"
                  variant="contained"
                  color="secondary"
                  className={classes.newWorkoutButton}
                  style={{ marginRight: "auto" }}
                >
                  <AddIcon></AddIcon>New workout
                </Button>
              )}
              {matches.medium && (
                <Button
                  onClick={this.handleOpen}
                  size="small"
                  variant="contained"
                  color="secondary"
                  className={classes.newWorkoutButton}
                >
                  <AddIcon></AddIcon>New workout
                </Button>
              )}
            </Fragment>
          )}
        </Media>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Grid style={{ flexDirection: "row-reverse" }} container>
            <IconButton
              onClick={this.handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle>New Workout</DialogTitle>
          </Grid>
          <DialogContent>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <TextField
                name="body"
                type="text"
                label="Enter workout note"
                multiline
                fullWidth
                variant="outlined"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
              ></TextField>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                color="secondary"
                className={classes.submitButton}
              >
                Create empty workout
                {loading && (
                  <CircularProgress
                    className={classes.progress}
                  ></CircularProgress>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostWorkout.propTypes = {
  postWorkout: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postWorkout })(
  withStyles(styles)(withRouter(PostWorkout))
);
