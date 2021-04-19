import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Workout from "../components/Workout";
import WorkoutSkeleton from "../util/WorkoutSkeleton";

import { connect } from "react-redux";
import { getWorkouts } from "../redux/actions/dataActions";

import PropTypes from "prop-types";

class home extends Component {
  componentDidMount() {
    // const { workouts } = this.props.data;
    this.props.getWorkouts();
    // workouts.forEach((workout) => {
    //   this.props.getWorkout(workout.workoutId);
    // });
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (
      this.props.data.workout.body !== prevProps.data.workout.body &&
      prevProps.data.workout.body !== undefined &&
      this.props.data.workout.date === prevProps.data.workout.date
    ) {
      this.props.getWorkouts();
    }
  }
  render() {
    const { workouts, loading } = this.props.data;
    const { user } = this.props;
    console.log(workouts);
    // workouts.forEach((workout) => {
    //   console.log(workout);
    // });
    let recentWorkoutsMarkup =
      !loading && !user.loading ? (
        workouts.map((workout) => {
          if (workout.userHandle == user.credentials.handle) {
            return <Workout key={workout.workoutId} workout={workout} />;
          }
        })
      ) : (
        <WorkoutSkeleton />
      );
    return (
      <Grid container justify="space-evenly">
        <Grid item sm={7} xs={12} lg={6}>
          {recentWorkoutsMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getWorkouts: PropTypes.func.isRequired,

  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

const mapActionsToProps = { getWorkouts };

export default connect(mapStateToProps, mapActionsToProps)(home);
