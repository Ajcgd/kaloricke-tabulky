import { FC, useEffect, useState } from "react";

import { Collapse, Grid, IconButton, Typography } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IHeaderprops {}

const Header: FC<IHeaderprops> = () => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(true);
  }, []);

  const handleScroll = () => {
    document.getElementById("fstImg")!.scrollIntoView({behavior: "smooth"});
    setTimeout(() => document.getElementById("fstImg")!.scrollIntoView({behavior: "smooth"}), 900);
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      id="header"
    >
      <Collapse in={collapsed} {...{ timeout: 2000 }} collapsedSize="0px">
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontFamily: "Nunito",
            fontWeight: 600,
            color: "white",
            textAlign: "center",
          }}
          fontSize={{ xs: "3rem", sm: "6rem" }}
        >
          Začněte svou <br />
          cestu za hubnutím <br />
          ještě dnes!
          <br />
          <IconButton onClick={handleScroll}>
            <ExpandMoreIcon sx={{ color: "white", fontSize: 70 }} />
          </IconButton>
        </Typography>
      </Collapse>
    </Grid>
  );
}

export default Header;
