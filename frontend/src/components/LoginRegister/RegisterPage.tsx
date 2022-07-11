import { FC } from "react";

import { CssBaseline } from "@mui/material";

import Register from "./Register";

interface IRegisterPageProps {}
const RegisterPage: FC<IRegisterPageProps> = () => {
  return (
    <>
      <CssBaseline />
      <Register />
    </>
  );
};

export default RegisterPage;
