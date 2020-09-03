import React, { Component, Profiler } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import dayjs from "dayjs";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/ToolTip";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CalendarToday from "@material-ui/icons/CalendarToday";

import { connect } from "react-redux";
import { logoutUser, profileImg } from "../redux/actions/userActions";

import { Link } from "react-router-dom";

const styles = {
  paper: {
    padding: 20,
    marginTop: 10,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "70%",
        left: "62%",
      },
    },
    "& .profile-image": {
      width: 130,
      height: 130,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "100%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
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
};

class profile extends Component {
  handleImageChange = (event) => {
    const img = event.target.files[0];

    const formData = new FormData();
    formData.append("image", img, img.name);
    this.props.profileImg(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imgUpload");
    fileInput.click();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, date, imgUrl, email },
        loading,
      },
    } = this.props;

    let profileMarkUp = loading ? (
      <p>loading</p>
    ) : (
      <Grid container justify="center">
        <Grid item sm={6} xs={10}>
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img src={imgUrl} className="profile-image" alt="profile" />
                <input
                  type="file"
                  id="imgUpload"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <ToolTip title="Add picture" color="secondary">
                  <IconButton
                    onClick={this.handleEditPicture}
                    className="buttons"
                  >
                    <AddAPhotoIcon fontSize="medium" color="secondary" />
                  </IconButton>
                </ToolTip>
              </div>
              <hr />
              <div className="profile-details">
                <MuiLink
                  component={Link}
                  to={`/users/${handle}`}
                  color="primary"
                  variant="h5"
                >
                  {handle}
                  <hr />
                </MuiLink>
                <CalendarToday color="primary" />{" "}
                <span>Joined {dayjs(date).format("MMM YYYY")}</span>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );

    return profileMarkUp;

    // return (
    //   <div>
    //     <p>rfger</p>
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, profileImg };

profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  profileImg: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(profile));
