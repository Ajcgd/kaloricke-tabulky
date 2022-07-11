import { CssBaseline } from "@mui/material";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";
import AdminHome from "./AdminHome";

const AdminHomepage = () => {
  return (
    <MainBackground>
        <CssBaseline />
        <CustomAppBar withSearch={true} />
        <AdminHome />
    </MainBackground>
  );
};

export default AdminHomepage;
