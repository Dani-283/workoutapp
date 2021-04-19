import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
const styles = {
  card: {
    display: "flex",
    margin: "30px",
    borderRadius: "5px",
    border: "1px solid rgba(0,0,0,.26)",
    boxShadow: "none",
  },
  content: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  name: {
    width: 50,
    height: 17,
    backgroundColor: "rgb(220, 220, 220,.40)",
    marginBottom: 10,
    borderRadius: 3,
  },
  note: {
    width: 90,
    height: 17,
    backgroundColor: "rgb(220, 220, 220,.40)",
    marginBottom: 44,
    borderRadius: 3,
  },
  showExercises: {
    width: 80,
    height: 23,
    marginBottom: 12,
    backgroundColor: "rgb(220, 220, 220,.40)",
    borderRadius: 3,
  },

  fitnessIcon: {
    color: "rgb(220, 220, 220,.40)",
    marginRight: 3,
  },
  div: {
    display: "flex",
  },
};

const WorkoutSkeleton = (props) => {
  const { classes } = props;

  const skeleton = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.content}>
        <div className={classes.name}></div>
        <div className={classes.note}></div>
        <div className={classes.div}>
          <FitnessCenterIcon
            fontSize="default"
            className={classes.fitnessIcon}
          />
          <div className={classes.showExercises}></div>
        </div>
      </CardContent>
    </Card>
  ));

  return <Fragment>{skeleton}</Fragment>;
};

WorkoutSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkoutSkeleton);
