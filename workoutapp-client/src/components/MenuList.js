import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

class MenuList extends Component {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    return (
      <div>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon style={{ color: "white" }} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MenuList;
