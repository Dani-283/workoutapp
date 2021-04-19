import React, { Component, Profiler, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import dayjs from "dayjs";

// import EditDetails from "../components/EditDetails";

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

import ProfileSkeleton from "../util/ProfileSkeleton.js";

import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

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
      borderColor: "rgb(220, 220, 220,.40)",
      margin: "10px auto 8px auto",
      width: "50%",
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
  date: {
    marginTop: 50,
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
      <ProfileSkeleton />
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
                    <AddAPhotoIcon fontSize="inherit" color="secondary" />
                  </IconButton>
                </ToolTip>
                {/* <EditDetails /> */}
              </div>
              <hr />
              <div className="profile-details">
                <Typography color="primary" variant="h5">
                  {handle}
                </Typography>
                <div className={classes.date}>
                  <CalendarToday color="primary" />{" "}
                  <span>Joined {dayjs(date).format("MMM YYYY")}</span>
                </div>
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
