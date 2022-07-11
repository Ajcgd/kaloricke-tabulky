import { FC, useContext } from "react";

import { CssBaseline } from "@mui/material"
import AuthContext from "../../context/AuthProvider";
import { Navigate } from "react-router-dom"

import Header from "./Header";
import Features from "./Features";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";

interface IMainPageProps {}

const MainPage:FC<IMainPageProps> = () => {
  // @ts-ignore
  const { auth } = useContext(AuthContext);
  return (
    <MainBackground>
      {auth != null && auth.username != null && auth?.username != "" && <Navigate to="/home" />}
      <CssBaseline />
      <CustomAppBar/>
      <Header />
      <Features />
    </MainBackground>
  );
};

export default MainPage;
