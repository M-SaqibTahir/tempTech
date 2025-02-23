import { Grid, Typography } from "@mui/material";
import React from "react";

const Header = () => {

    const headerStyle={
            backgroundColor: "#1976d2",
            color: "white",
            padding: "16px",
            textAlign: "center",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    }
  return (
    <Grid
      container
      sx={headerStyle}
    >
      <Typography variant="h4" fontWeight="bold" width="100%">
        Event Finder Application
      </Typography>
    </Grid>
  );
};

export default Header;
