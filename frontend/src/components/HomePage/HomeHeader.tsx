import { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { Grid, IconButton, InputBase, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import AuthContext from "../../context/AuthProvider";
import AnimatedButton from "../Utils/AnimatedButton";

interface IHomeHeaderProps {}

const HomeHeader: FC<IHomeHeaderProps> = () => {
  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <Grid
      container
      sx={{ background: "transparent" }}
      direction={{ xs: "column", md: "row" }}
    >
      <Grid item xs={5} sx={{ pl: { xs: 0, sm: 5 } }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ flexGrow: "1", fontFamily: "Nunito" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <span style={{ color: "#edc69f" }}>Kalorické</span> tabulky
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <InputBase
          sx={{
            ml: 0,
            flex: 1,
            background: "white",
            borderRadius: "10px",
            pl: 2,
          }}
          placeholder="Vyhledej jídlo"
          inputProps={{ "aria-label": "vyhledej jídlo" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          pr: { xs: 0, md: 5 },
        }}
        direction={{ xs: "column", md: "row" }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <AnimatedButton
            variant="text"
            sx={{
              color: "#edc69f",
              ":active": {
                color: "#edd9be",
              },
            }}
            disableRipple
          >
            {auth.username}
          </AnimatedButton>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <AnimatedButton
            variant="text"
            sx={{
              color: "#eb9b34",
              ":active": {
                color: "#edc48c",
              },
            }}
            disableRipple
            onClick={() => {
              localStorage.removeItem("auth");
              setAuth({});
            }}
          >
            Odhlásit
          </AnimatedButton>
        </Link>
      </Grid>
    </Grid>
  );
};

export default HomeHeader;
