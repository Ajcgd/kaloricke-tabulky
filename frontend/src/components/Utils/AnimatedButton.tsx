import { Button } from "@mui/material";
import { styled } from "@mui/system";

const AnimatedButton = styled(Button)({
  fontSize: 30,
  fontFamily: "Nunito",
  fontWeight: 900,
  transition: "transform 0.5s",
  ":hover": {
    backgroundColor: "transparent",
    transform: "scale(1.3)",
  },
});

export default AnimatedButton;
