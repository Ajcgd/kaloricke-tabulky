import { FC } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

interface ITripleProgressBarProps {
  value: number;
  desired: number;
  size: number;
  isMain?: boolean;
  unit: string;
}

const TripleProgressBar:FC<ITripleProgressBarProps> = ({value, desired, size, isMain, unit}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={5}
        sx={{ color: "LightGrey" }}
      />
      <CircularProgress
        variant="determinate"
        value={
          Math.round(
            Math.min(Math.max((value / desired) * 100, 0), 100) *
              10
          ) / 10
        }
        size={size}
        color="success"
        thickness={5}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={
          (value / desired) * 100 < 100
            ? 0
            : Math.round(
                Math.min(
                  Math.max((value / desired) * 100 - 100, 0),
                  100
                ) * 10
              ) / 10
        }
        size={size}
        color="warning"
        thickness={5}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={
          (value / desired) * 100 < 200
            ? 0
            : Math.round(
                Math.min(
                  Math.max((value / desired) * 100 - 200, 0),
                  100
                ) * 10
              ) / 10
        }
        size={size}
        color="error"
        thickness={5}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {isMain ? (
          <>
            <Typography
              textAlign="center"
              fontFamily="Nunito"
              fontSize="1.3rem"
            >
              {Math.round((value / desired) * 100 * 10) / 10}%
            </Typography>
            <Typography
              textAlign="center"
              fontFamily="Nunito"
              fontSize="1.5rem"
              fontWeight="bold"
            >
              {Math.round(value)}
              {unit}
            </Typography>
            <Typography textAlign="center" fontFamily="Nunito" fontSize="1rem">
              z {Math.round(desired)} {unit}
            </Typography>
          </>
        ) : (
          <Typography textAlign="center" fontFamily="Nunito" fontSize="1.3rem">
            {Math.round((value / desired) * 100 * 10) / 10}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TripleProgressBar;
