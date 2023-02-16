import React from "react";
import { string } from "prop-types";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const Navbar = ({ title }) => (
  <AppBar position="relative">
    <Toolbar>
      <Typography variant="h6" color="inherit" align="center">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  title: string,
};

Navbar.defaultProps = {
  title: "Post Comments",
};

export default Navbar;
