import { Box, CssBaseline } from "@mui/material";
import NotFound from "./NotFound";
import CustomAppBar from "../Utils/CustomAppBar";
import MainBackground from "../Utils/MainBackground";

const NotFoundPage = () => {
  return (
    <MainBackground>
        <CssBaseline />
        <CustomAppBar withSearch={true} />
        <NotFound />
    </MainBackground>
  );
};

export default NotFoundPage;
