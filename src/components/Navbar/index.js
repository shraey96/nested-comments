import React from "react";
import { string, bool } from "prop-types";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const Navbar = ({ title, sticky }) => (
  <AppBar
    style={
      sticky ? { position: "sticky", zIndex: 999 } : { position: "relative" }
    }
  >
    <Toolbar>
      <Typography variant="h6" color="inherit" align="center">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  title: string,
  sticky: bool,
};

Navbar.defaultProps = {
  title: "Post Comments",
};

export default Navbar;
