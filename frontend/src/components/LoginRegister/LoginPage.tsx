import { FC } from "react";

import { CssBaseline } from "@mui/material";

import Login from "./Login";

interface ILoginPageProps {}

const LoginPage: FC<ILoginPageProps> = () => {
  return (
    <>
      <CssBaseline />
      <Login />
    </>
  );
};

export default LoginPage;
