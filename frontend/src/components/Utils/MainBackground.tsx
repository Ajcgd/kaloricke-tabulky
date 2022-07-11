import { Grid } from "@mui/material";
import { styled } from "@mui/system";

const MainBackground = styled("div")({
  backgroundImage: `url(${
    import.meta.env.VITE_PUBLIC_URL + "/assets/background.jpg"
  })`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
});


export default MainBackground;
