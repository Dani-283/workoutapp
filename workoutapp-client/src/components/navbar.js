import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";

import FormDialog from "./Login.js";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser } from "../redux/actions/userActions";

import PostWorkout from "./PostWorkout";
import MenuList from "./MenuList";
import { Typography } from "@material-ui/core";
import Media from "react-media";

const styles = {
  iconButton: {
    marginRight: "auto",
  },
};

export class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: { authenticated },
    } = this.props;
    return (
      <Media
        queries={{
          small: "(max-width: 490px)",
          medium: "(min-width: 490px) and (max-width:540px)",
          large: "(min-width: 540px)",
        }}
      >
        {(matches) => (
          <Fragment>
            {matches.small && (
              <AppBar position="fixed">
                <Toolbar>
                  <Typography style={{ marginRight: "auto" }}>
                    Workout App
                  </Typography>

                  {authenticated ? (
                    <Fragment>
                      <PostWorkout />
                      <MenuList />
                      <Media
                        queries={{
                          small: "(max-width: 415px)",
                          medium: "(min-width: 415px) and (max-width: 490px)",
                        }}
                      >
                        {(matches) => (
                          <Fragment>
                            {matches.medium && (
                              <Button
                                variant="outlined"
                                onClick={this.handleLogout}
                                color="secondary"
                                component={Link}
                                to="/login"
                              >
                                Logout
                              </Button>
                            )}
                          </Fragment>
                        )}
                      </Media>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Button color="inherit" component={Link} to="/login">
                        Login
                      </Button>
                      <Button color="inherit" component={Link} to="/signup">
                        Signup
                      </Button>
                    </Fragment>
                  )}
                  {/* <FormDialog></FormDialog> */}
                </Toolbar>
              </AppBar>
            )}
            {matches.medium && (
              <AppBar position="fixed">
                <Toolbar>
                  <Typography style={{ marginRight: "auto" }}>
                    Workout App
                  </Typography>

                  {authenticated ? (
                    <Fragment>
                      <PostWorkout />
                      <MenuList />
                      <Button color="inherit" component={Link} to="/">
                        Home
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={this.handleLogout}
                        color="secondary"
                        component={Link}
                        to="/login"
                      >
                        Logout
                      </Button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Button color="inherit" component={Link} to="/login">
                        Login
                      </Button>
                      <Button color="inherit" component={Link} to="/signup">
                        Signup
                      </Button>
                    </Fragment>
                  )}
                  {/* <FormDialog></FormDialog> */}
                </Toolbar>
              </AppBar>
            )}
            {matches.large && (
              <AppBar position="fixed">
                <Toolbar>
                  <Typography style={{ marginRight: "auto" }}>
                    Workout App
                  </Typography>

                  {authenticated ? (
                    <Fragment>
                      <PostWorkout />
                      <Button color="inherit" component={Link} to="/">
                        Home
                      </Button>
                      <Button color="inherit" component={Link} to="/profile">
                        Profile
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={this.handleLogout}
                        color="secondary"
                        component={Link}
                        to="/login"
                      >
                        Logout
                      </Button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Button color="inherit" component={Link} to="/login">
                        Login
                      </Button>
                      <Button color="inherit" component={Link} to="/signup">
                        Signup
                      </Button>
                    </Fragment>
                  )}
                  {/* <FormDialog></FormDialog> */}
                </Toolbar>
              </AppBar>
            )}
          </Fragment>
        )}
      </Media>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser };

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Navbar));
