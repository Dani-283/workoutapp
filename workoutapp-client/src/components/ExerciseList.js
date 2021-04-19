import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { getWorkout } from "../redux/actions/dataActions";
import { connect } from "react-redux";

import DeleteExercise from "./DeleteExercise";

class ExerciseList extends Component {
  render() {
    const { exercises, classes, workoutId } = this.props;
    return (
      <Grid container>
        {exercises.map((exercise, index) => {
          const { body, createdAt, weight, reps } = exercise;
          if (workoutId === exercise.workoutId) {
            return (
              <Fragment key={createdAt}>
                <Grid item xs={3}>
                  <Typography>{body}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{weight}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{reps}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <DeleteExercise createdAt={createdAt} workoutId={workoutId} />
                </Grid>
              </Fragment>
            );
          }
        })}
      </Grid>
    );
  }
}

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
  workoutId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  exercises: state.data.workout.exercises,
});

export default connect(mapStateToProps)(ExerciseList);
