import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { deleteExercise, getWorkout } from "../redux/actions/dataActions";

import { connect } from "react-redux";

const styles = {
  deleteButton: {
    bottom: "29%",
    right: "25%",
    marginBottom: "-10px",
  },
};
class DeleteExercise extends Component {
  handleClick = () => {
    this.props.deleteExercise({ createdAt: this.props.createdAt });
    console.log(this.props.createdAt);
    this.props.getWorkout(this.props.workoutId);
  };
  render() {
    const { classes } = this.props;
    return (
      <IconButton onClick={this.handleClick} className={classes.deleteButton}>
        <DeleteOutlineIcon color="secondary"></DeleteOutlineIcon>
      </IconButton>
    );
  }
}
DeleteExercise.propTypes = {
  deleteExercise: PropTypes.func.isRequired,
  createdAt: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getWorkout: PropTypes.func.isRequired,
  workoutId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { deleteExercise, getWorkout })(
  withStyles(styles)(DeleteExercise)
);
