import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import FormDialog from "../components/Login.js";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = {
  iconButton: {
    marginRight: "auto",
  },
};

export class Navbar extends Component {
  render() {
    const {
      classes,
      user: { authenticated },
    } = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            className={classes.iconButton}
            edge="start"
            aria-label="menu"
          >
            <MenuIcon color="secondary" />
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
          {authenticated && (
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          )}
          <FormDialog></FormDialog>
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(withStyles(styles)(Navbar));
