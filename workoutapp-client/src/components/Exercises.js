import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import CloseIcon from "@material-ui/icons/Close";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import {
  getWorkout,
  clearErrors,
  updateWorkout,
  getWorkouts,
} from "../redux/actions/dataActions";
import { connect } from "react-redux";

import ExerciseList from "./ExerciseList";
import AddExercise from "./AddExercise";

import dayjs from "dayjs";

const styles = {
  fitnessIcon: {
    paddingRight: 5,
  },
  button: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
  hiddenButton: { display: "none" },
  closeButton: {
    top: "-5%",
  },
  exercisesGrid: {
    minWidth: "200px",
  },
  submitButton: {
    position: "relative",
    color: "white",
    float: "right",
    marginTop: 10,
  },
  workoutNote: {
    margin: "12px 0 10px -2px",
    width: "55%",
  },
  progress: {
    color: "rgb(66,161,250,.50)",
  },
  dialogContent: {
    minHeight: "80px",
  },
  hr: { width: "100%" },
};
class Exercises extends Component {
  state = {
    open: false,
    body: "",
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getWorkout(this.props.workoutId);
    this.setState({ body: this.props.workout.body });
    // if (this.state.body === "") this.setState({ body: this.props.body });
  };
  componentDidMount() {
    this.setState({ body: this.props.workout.body });
    // if (this.state.body === "") this.setState({ body: this.props.body });
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.workout.workoutId !== prevProps.workout.workoutId) {
      this.setState({ body: this.props.workout.body });
    }
    // if(this.props.workout.exercises)
  }
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateWorkout(this.props.workoutId, {
      body: this.state.body,
    });
    this.handleClose();
  };

  render() {
    const {
      workout: { exercises, workoutId, body, date, userHandle },
      classes,
      UI: { loading },
    } = this.props;

    const exercisesMarkup = !loading ? (
      this.state.open && (
        <Grid className={classes.exercisesGrid} container justify="flex-start">
          <Grid item xs={11}>
            <Typography variant="h5">{userHandle}</Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(date).format("dddd, DD MMMM, YYYY, HH:mm")}
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                // placeholder={body}
                // helperText={errors.error}
                // error={errors.error ? true : false}
                value={this.state.body}
                onChange={this.handleChange}
                variant={"outlined"}
                label="edit note"
                multiline
                className={classes.workoutNote}
              ></TextField>
              <Button
                type="submit"
                id="submit-form"
                variant="contained"
                disabled={loading}
                color="secondary"
                className={classes.hiddenButton}
              >
                Submit
                {loading && (
                  <CircularProgress
                    className={classes.progress}
                  ></CircularProgress>
                )}
              </Button>
            </form>
            {/* <Typography variant="body1">{body}</Typography> */}
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={this.handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={3} style={{ marginBottom: "10px" }}>
              <Typography color="secondary">Exercise</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="secondary">Weight</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="secondary">Reps</Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <ExerciseList
              // exercises={exercises}
              workoutId={workoutId}
            ></ExerciseList>
          </Grid>

          <AddExercise workoutId={workoutId} />
          <hr className={classes.hr} />

          <Grid item xs={12}>
            <label for="submit-form">
              <Button
                variant="contained"
                disabled={loading}
                color="secondary"
                onClick={this.handleSubmit}
                className={classes.submitButton}
              >
                Submit
              </Button>
            </label>
          </Grid>
        </Grid>
      )
    ) : (
      <CircularProgress
        thickness={2.5}
        className={classes.progress}
        size={70}
      />
    );

    return (
      <Fragment>
        <IconButton
          size="small"
          color="secondary"
          onClick={this.handleOpen}
          className={classes.button}
        >
          <FitnessCenterIcon fontSize="small" className={classes.fitnessIcon} />
          Show exercises
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.dialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent className={classes.dialogContent}>
            {exercisesMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Exercises.propTypes = {
  // exercises: PropTypes.array.isRequired,
  getWorkout: PropTypes.func.isRequired,
  getWorkouts: PropTypes.func.isRequired,
  workout: PropTypes.object.isRequired,
  workoutId: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  updateWorkout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workout: state.data.workout,
  UI: state.UI,
});

const mapActionsToProps = {
  getWorkout,
  getWorkouts,
  clearErrors,
  updateWorkout,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Exercises));
