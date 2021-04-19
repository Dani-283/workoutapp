import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { getWorkouts } from "../redux/actions/dataActions";

import DeleteWorkout from "./DeleteWorkout";
import Exercises from "./Exercises";

import dayjs from "dayjs";
const styles = {
  card: {
    display: "flex",
    margin: "30px",
    borderRadius: "5px",
    border: "1px solid rgba(0,0,0,.26)",
    boxShadow: "none",
    flexDirection: "row-reverse",
    position: "relative",
  },
  content: {},
  button: {
    transition: "height 1s ease-in-out 0.5s",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
};

class Workout extends Component {
  // state = {
  //   clicked: false,
  // };

  // handleClick = () => {
  //   this.setState({ clicked: true });
  // };

  render() {
    const {
      classes,
      workout: { body, date, userHandle, workoutId, exercises },
    } = this.props;
    console.log(body);
    // const markup = this.state.clicked && <Exercises workoutId={workoutId} />;
    // const classes=this.props.classes

    return (
      <Card className={classes.card}>
        <DeleteWorkout workoutId={workoutId} />
        <CardContent className={classes.content}>
          <Typography variant="h5">{userHandle}</Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(date).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {/* <Button
            size="small"
            color="secondary"
            onClick={this.handleClick}
            className={classes.button}
          >
            <AddIcon></AddIcon>Add exercise
          </Button> */}
          <Exercises workoutId={workoutId} body={body} />
        </CardContent>

        {/* {markup} */}
      </Card>
    );
  }
}

Workout.propTypes = {
  user: PropTypes.object.isRequired,
  workout: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getWorkouts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getWorkouts })(
  withStyles(styles)(Workout)
);
