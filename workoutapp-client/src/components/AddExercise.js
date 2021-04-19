import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CiruclarProgress from "@material-ui/core/CircularProgress";

import AddIcon from "@material-ui/icons/Add";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";

import InputAdornment from "@material-ui/core/InputAdornment";

import { connect } from "react-redux";
import { addExercise, clearErrors } from "../redux/actions/dataActions";

const styles = {
  checkButton: {
    fontSize: "80%",
  },
  textField: {
    width: "18%",
  },
  form: {
    display: "flex",
    justifyContent: "start",
  },
  addExercise: {
    top: "7%",
    left: "-2%",
  },
};

class AddExercise extends Component {
  state = {
    body: "",
    weight: "",
    reps: "",
    errors: {},
    clicked: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", weight: "", reps: "" });
    }
  }

  handleClickOpen = () => {
    this.setState({ clicked: true });
    this.props.clearErrors();
  };

  handleClickClose = () => {
    this.setState({ clicked: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addExercise(this.props.workoutId, {
      body: this.state.body,
      weight: this.state.weight,
      reps: this.state.reps,
    });
    if (this.state.body !== "") {
      this.handleClickClose();
      this.state.errors = {};
    }
  };

  render() {
    const { classes, UI } = this.props;
    const { errors } = this.state;

    let loadingMarkup = UI.loading && (
      <CiruclarProgress
        className={classes.progress}
        size={30}
      ></CiruclarProgress>
    );
    let exerciseFormMarkup = this.state.clicked && (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <TextField
          name="body"
          type="text"
          placeholder="ex. bench press"
          helperText={errors.error}
          error={errors.error ? true : false}
          value={this.state.body}
          onChange={this.handleChange}
          className={classes.textField}
        ></TextField>
        <TextField
          name="weight"
          type="text"
          placeholder="ex. 50/50"
          helperText={errors.error}
          error={errors.error ? true : false}
          value={this.state.weight}
          onChange={this.handleChange}
          className={classes.textField}
          InputProps={{
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
          style={{ left: "7%" }}
        ></TextField>
        <TextField
          name="reps"
          type="text"
          placeholder="ex. 8/8"
          helperText={errors.error}
          error={errors.error ? true : false}
          value={this.state.reps}
          onChange={this.handleChange}
          className={classes.textField}
          style={{ left: "14%" }}
        ></TextField>

        <IconButton
          size="medium"
          color="secondary"
          className={classes.checkButton}
          type="submit"
          style={{ left: "15%" }}
        >
          <CheckSharpIcon />
        </IconButton>
      </form>
    );
    return (
      <Fragment>
        {loadingMarkup}
        {exerciseFormMarkup}

        {!this.state.clicked && (
          <Button
            size="medium"
            color="secondary"
            onClick={this.handleClickOpen}
            className={classes.addExercise}
          >
            <AddIcon></AddIcon>Add exercise
          </Button>
        )}
      </Fragment>
    );
  }
}

AddExercise.propTypes = {
  addExercise: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  workoutId: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addExercise, clearErrors })(
  withStyles(styles)(AddExercise)
);
