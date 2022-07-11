import { FC } from "react";

import { Grid } from "@mui/material";

import tips from "../../static/tips";
import ImageCard from "./ImageCard";
import useWindowPosition from "../../hooks/useWindowposition";

interface IFeatureProps {}
const Features: FC<IFeatureProps> = () => {
  const checked = useWindowPosition("header", 0.4);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        pt: { xs: 50, sm: 0 },
      }}
    >
      <Grid item id="fstImg">
        <ImageCard content={tips[0]} checked={checked} />
      </Grid>
      <Grid item>
        <ImageCard content={tips[1]} checked={checked} />
      </Grid>
    </Grid>
  );
}

export default Features;