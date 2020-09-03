import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import FormDialog from "../components/Login.js";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CiruclarProgress from "@material-ui/core/CircularProgress";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center",
  },
  title: {
    margin: "20px auto 20px auto",
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

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPass: "",
      handle: "",
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
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPass: this.state.confirmPass,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
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
            Signup page
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="User Handle"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.handle}
              error={errors.handle ? true : false}
            />
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
            <TextField
              id="confirmPass"
              name="confirmPass"
              type="Password"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPass}
              onChange={this.handleChange}
              fullWidth
              helperText={errors.confirmPass}
              error={errors.confirmPass ? true : false}
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
              Signup
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
              Already have an account?
              <Link to="/signup"> login </Link>
            </Typography>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
