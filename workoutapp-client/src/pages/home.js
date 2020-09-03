import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Workout from "../components/Workout";

class home extends Component {
  state = {
    workouts: null,
  };
  componentDidMount() {
    axios
      .get("/workouts")
      .then((res) => {
        console.log(res.data);
        this.setState({
          workouts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentWorkoutsMarkup = this.state.workouts ? (
      this.state.workouts.map((workout) => (
        <Workout key={workout.workoutId} workout={workout} />
      ))
    ) : (
      <p>loading...</p>
    );
    return (
      <Grid container justify="flex-end">
        <Grid item sm={8} xs={12}>
          {recentWorkoutsMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default home;
