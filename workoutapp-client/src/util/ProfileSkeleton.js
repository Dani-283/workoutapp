import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/ToolTip";
import Grid from "@material-ui/core/Grid";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const styles = {
  paper: {
    padding: 20,
    marginTop: 10,
  },

  imageWrapper: {
    textAlign: "center",
    position: "relative",
    margin: "auto",
    borderRadius: "100%",
    width: 130,
    height: 130,
    backgroundColor: "rgb(220, 220, 220,.40)",

    "& button": {
      position: "absolute",
      top: "70%",
      left: "62%",
    },
  },
  hr: {
    borderColor: "rgb(220, 220, 220,.40)",
    margin: "10px auto 8px auto",
    width: "50%",
  },
  profile: {
    backgroundColor: "rgb(220, 220, 220,.40)",

    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {},
  },
  handle: {
    height: 25,
    width: 80,
    margin: "auto",
    backgroundColor: "rgb(220, 220, 220,.40)",
  },
  date: {
    marginTop: 60,
    marginBottom: 3,
    margin: "auto",
    width: 100,
    height: 23,
    backgroundColor: "rgb(220, 220, 220,.40)",
  },
};
const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Grid container justify="center">
      <Grid item sm={6} xs={10}>
        <Paper className={classes.paper}>
          <div clasName={classes.profile}>
            <div className={classes.imageWrapper} />
            <hr className={classes.hr} />
            <div className={classes.profileDetails}>
              <div className={classes.handle} />
              <div className={classes.date} />
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
