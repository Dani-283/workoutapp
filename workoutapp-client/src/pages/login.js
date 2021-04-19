import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import FormDialog from "../components/Login.js";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CiruclarProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

import { Link } from "react-router-dom";

const styles = {
  form: {
    textAlign: "center",
  },
  title: {
    margin: "20px auto 20px auto",
    maxWidth: "260px",
  },
  textField: {
    margin: "5px",
  },
  button: {
    marginTop: "10px",
    minWidth: "100px",
    color: "white",
    position: "relative",
  },
  credErr: {
    color: "red",
    marginTop: 10,
  },
  signupLink: {
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const userData = { email: this.state.email, password: this.state.password };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h4" className={classes.title}>
            Login to Workout App
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.credErr}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              color="secondary"
              disabled={loading}
            >
              Login
              {loading && (
                <CiruclarProgress
                  className={classes.progress}
                  size={30}
                ></CiruclarProgress>
              )}
            </Button>
            <Typography
              className={classes.signupLink}
              color="textPrimary"
              variant="body2"
            >
              Don't have an account?
              <Link to="/signup"> Sign up</Link>
            </Typography>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
