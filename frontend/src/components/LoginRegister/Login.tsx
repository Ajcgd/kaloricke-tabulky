import { useState,  useContext, FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";

import { AccountCircle, Lock } from "@mui/icons-material";

import slides from "../../static/slideshow";

import AuthContext from "../../context/AuthProvider";
import ChangingImage from "./ChangingImage";
import { login } from "../../utils/Utils";

const LogoImage = styled("img")({
  width: 200,
});

const InputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "500px",
});

const FillDiv = styled("div")({
  height: 20,
});

type FormInputs = {
  email: string;
  password: string;
};

interface ILoginProps {}

const Login: FC<ILoginProps> = () => {
  // @ts-ignore
  const { setAuth } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<FormInputs>();
  const onSubmit = async () => {
    const res = await login(
      getValues("email"),
      getValues("password")
    );
    if (res.status === 200) {
      if (localStorage.getItem("auth")) {
        setAuth(JSON.parse(localStorage.getItem("auth")!));
        setSuccess(true);
      } else {
        alert("Něco se pokazilo, zkuste to znovu");
      }
    }
    else {
      if (res.status === 401) {
        setError("password", { message: "Špatný email nebo heslo" });
        setError("email", { message: "Špatný email nebo heslo" });
      } else {
        alert("Nastala chyba, prosím zkuste to znovu.");
      }
    };
  }

  return success ? (
    <Navigate to="/home" />
  ) : (
    <div style={{ fontSize: 15 }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ minHeight: "15vh", display: { xs: "none", md: "unset" } }}
        >
          <ChangingImage slides={slides} changeInterval={5000} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minHeight: { xs: "25vh", sm: "40vh" },
            display: { xs: "unset", md: "none" },
            backgroundImage: `url(../../public/assets/chadLogo.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left bottom",
          }}
        />
        <Grid
          container
          item
          xs={12}
          md={6}
          sx={{ p: { xs: 3, sm: 10 } }}
          alignItems="center"
          direction="column"
          justifyContent="space-evenly"
        >
          <div />
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Grid
                container
                justifyContent={"center"}
                sx={{ display: { xs: "none", md: "unset" } }}
              >
                <LogoImage
                  sx={{ marginBottom: 2 }}
                  src={import.meta.env.VITE_PUBLIC_URL + "/assets/logo.png"}
                  alt="logo"
                />
              </Grid>
              <Grid
                item
                xs={12}
                fontFamily="Nunito"
                textAlign="center"
                fontWeight="700"
                sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}
              >
                Přihlas se
              </Grid>
              <TextField
                label="Email"
                margin="normal"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                {...register("email", {
                  required: "Položka je povinná",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Chybný email",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
              />
              <TextField
                label="Heslo"
                margin="normal"
                variant="standard"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                {...register("password", { required: "Položka je povinná" })}
                error={!!errors?.password}
                helperText={errors?.password ? errors.password.message : null}
              />
              <FillDiv />
              <Button color="primary" variant="contained" type="submit">
                Login
              </Button>
              <FillDiv />
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <Button
                      disableRipple
                      sx={{
                        transition: "transform 0.5s",
                        ":hover": {
                          transform: "scale(1.1)",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Zaregistruj se
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </InputContainer>
          </form>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button>Zpět na hlavní stránku</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
