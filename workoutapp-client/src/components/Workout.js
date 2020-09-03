import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";
const styles = {
  card: {
    display: "flex",
    margin: "30px",
    borderRadius: "5px",
    border: "1px solid rgba(0,0,0,.26)",
    boxShadow: "none",
  },
  content: {},
};

class Workout extends Component {
  render() {
    const {
      classes,
      workout: { body, date, userHandle, workoutId },
    } = this.props;
    // const classes=this.props.classes
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5">{userHandle}</Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(date).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Workout);
