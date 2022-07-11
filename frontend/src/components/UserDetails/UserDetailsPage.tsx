import { Navigate } from "react-router-dom";

import { Box, CssBaseline } from "@mui/material";
import UserDetails from "./UserDetails";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const UserDetailsPage = () => {
  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <>
      {(Object.keys(auth).length === 0 || auth == {}) && (setAuth({})) ? (
        <Navigate to="/" />
      ) : (
        <MainBackground>
            <CssBaseline />
            <CustomAppBar withSearch={true} />
            <UserDetails />
        </MainBackground>
      )}
    </>
  );
};

export default UserDetailsPage;
