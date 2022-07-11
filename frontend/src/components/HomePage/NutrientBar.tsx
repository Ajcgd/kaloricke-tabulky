import { FC } from "react";

import { Grid, Typography } from "@mui/material";

import TripleProgressBar from "../Utils/TripleProgressBar";

interface INutrientBarProps {
  name: string;
  desired: number;
  value: number;
  unit: string;
  size: number;
  isMain?: boolean;
}

const Nutrientbar: FC<INutrientBarProps> = ({
  name,
  desired,
  value,
  unit,
  size,
  isMain,
}) => {
  return (
    <Grid
      item
      xs={6}
      display="grid"
      alignItems="center"
      justifyContent="center"
      pt={3}
    >
      <Typography textAlign="center" fontFamily="Nunito" fontWeight="bold">
        {name}
      </Typography>
      <TripleProgressBar
        desired={desired}
        value={value}
        unit={unit}
        size={size}
        isMain={isMain}
      />
      <Typography
        textAlign="center"
        fontFamily="Nunito"
        fontWeight="bold"
        pt="1rem"
      >
        {value}
        {unit}
      </Typography>
      <Typography textAlign="center" fontFamily="Nunito">
        z {desired}
        {unit}
      </Typography>
    </Grid>
  );
};

export default Nutrientbar;
