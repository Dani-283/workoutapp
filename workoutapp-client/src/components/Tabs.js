import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    maxWidth: 320,
  },
  app: {
    minWidth: 20,
  },
  form: {
    display: "grid",
  },
  loginButton: {
    color: "white",
    marginTop: 10,
  },
}));

const styles = {};

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post("/login")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        this.props.history.push("/");
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.app} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.tabs}
        >
          <Tab className={classes.tab} label="Login" {...a11yProps(0)} />
          <Tab className={classes.tab} label="Signup" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className="TextField"
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            helperText={errors.email}
            error={errors.email ? true : false}
            type="email"
            fullWidth
            value={email}
          />
          <TextField
            margin="dense"
            id="login_pass"
            label="Password"
            type="password"
            fullWidth
          />
          <Button
            className={classes.loginButton}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Login
          </Button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="email"
          fullWidth
          value={email}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="signup/email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="signup_pass"
          label="Password"
          type="password"
          fullWidth
        />
        <Button
          className={classes.loginButton}
          variant="contained"
          color="secondary"
        >
          Signup
        </Button>
      </TabPanel>
    </div>
  );
}

////////////////////////////////////////////

// class SimpleTabs extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: "" };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   state = {
//     selectedTab: 0,
//   };
//   handleChange = (event, value) => {
//     this.setState({ selectedTab: value });
//   };

//   handleSubmit = (event) => {
//     console.log("hi");
//   };
//   render() {
//     const { classes } = this.props;

//     return (
//       <div className={classes.root}>
//         <AppBar className={classes.app} position="static">
//           <Tabs
//             value={this.selectedTab}
//             onChange={this.handleChange}
//             aria-label="simple tabs example"
//             className={classes.tabs}
//           >
//             <Tab className={classes.tab} label="Login" {...a11yProps(0)} />
//             <Tab className={classes.tab} label="Signup" {...a11yProps(1)} />
//           </Tabs>
//         </AppBar>
//         <TabPanel value={this.value} index={0}>
//           <form className={classes.form} onSubmit={this.handleSubmit}>
//             <TextField
//               className="TextField"
//               autoFocus
//               margin="dense"
//               id="email"
//               name="email"
//               label="Email Address"
//               type="email"
//               fullWidth
//             />
//             <TextField
//               margin="dense"
//               id="login_pass"
//               label="Password"
//               type="password"
//               fullWidth
//             />
//             <Button
//               className={classes.loginButton}
//               variant="contained"
//               color="secondary"
//               type="submit"
//             >
//               Login
//             </Button>
//           </form>
//         </TabPanel>
//         <TabPanel value={this.value} index={1}>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Name"
//             type="email"
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             id="email"
//             label="Email Address"
//             type="signup/email"
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             id="signup_pass"
//             label="Password"
//             type="password"
//             fullWidth
//           />
//           <Button
//             className={classes.loginButton}
//             variant="contained"
//             color="secondary"
//           >
//             Signup
//           </Button>
//         </TabPanel>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(SimpleTabs);
