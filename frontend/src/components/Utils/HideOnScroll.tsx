import { Slide } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const HideOnScroll = ({ children }: any) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll
