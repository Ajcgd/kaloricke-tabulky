import * as React from "react";
import TextField from "@mui/material/TextField";
import { CssBaseline, Grid, Box, Container, AppBar, Link, Stack, Toolbar } from "@mui/material";
import { Typography, Button, Alert } from "@mui/material";
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Navigate } from "react-router-dom";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: {xs: 0, sm: 10},
    boxShadow: 24,
    p: 4,
  };

// @ts-ignore
const AddFoodModal = ({closeModal}) => {
  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const Root = styled("div")({
    display: "flex",
    justifyContent: "center",
  });


  const onSubmit = () => {
    setAlertSeverity("");
    setAlertMessage("");
    try {
      const body = {
          name: getValues("name"),
          description: getValues("description"),
          calories: getValues("calories"),
          proteins: getValues("proteins"),
          carbs: getValues("carbs"),
          fats: getValues("fats"),
          fiber: getValues("fiber"),
          salt: getValues("salt"),
      };
      axios
        .post("/food", JSON.stringify(body), {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.ssid}`
          },
        })
        .then((_) => {
          setAlertSeverity("success");
          setAlertMessage("Jídlo bylo úspěšně přidáno");
          setTimeout(() => {
            setAlertSeverity("");
            setAlertMessage("");
          }, 2000)
          reset();
        })
        .catch((err) => {
          setAlertSeverity("error");
          setAlertMessage(err.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={modalStyle}>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            <Typography component="h1" variant="h4" sx={{ fontFamily: "Nunito" }}>
                Přidat jídlo do databáze
            </Typography>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
            >
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    variant="standard"
                    id="name"
                    label="Název jídla"
                    InputProps={{ style: { fontFamily: "Nunito" } }}
                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                    {...register("name", { required: "Položka je povinná" })}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors.name.message : null}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    variant="standard"
                    id="name"
                    label="Popisek jídla"
                    InputProps={{ style: { fontFamily: "Nunito" } }}
                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                    {...register("description", { 
                        required: "Položka je povinná",
                    })}
                    error={!!errors?.description}
                    helperText={errors?.description ? errors.description.message : null}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h6" sx={{
                    marginTop: {xs: 0, sm: 3},
                    textAlign:"center",
                    fontFamily: "Nunito"
                    }}>
                    Nutrienty na 100 g
                    </Typography>
                    <TextField
                    required
                    fullWidth
                    variant="standard"
                    label="Kalorie"
                    type="number"
                    id="calories"
                    InputProps={{ style: { fontFamily: "Nunito" } }}
                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                    {...register("calories", { 
                        required: "Položka je povinná",
                        min: {
                        value: 0,
                        message: "Minimální hodnota je 0",
                        }, 
                    })}
                    error={!!errors?.calories}
                    helperText={errors?.calories ? errors.calories.message : null}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    variant="standard"
                    label="Tuky"
                    type="number"
                    id="fats"
                    InputProps={{ style: { fontFamily: "Nunito" } }}
                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                    {...register("fats", { 
                        required: "Položka je povinná",
                        min: {
                        value: 0,
                        message: "Minimální hodnota je 0",
                        }, 
                    })}
                    error={!!errors?.fats}
                    helperText={errors?.fats ? errors.fats.message : null}
                    />
                </Grid>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    variant="standard"
                    label="Sacharidy"
                    type="number"
                    id="carbs"
                    InputProps={{ style: { fontFamily: "Nunito" } }}
                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                    {...register("carbs", { 
                        required: "Položka je povinná",
                        min: {
                        value: 0,
                        message: "Minimální hodnota je 0",
                        }, 
                    })}
                    error={!!errors?.carbs}
                    helperText={errors?.carbs ? errors.carbs.message : null}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    variant="standard"
                    label="Bílkoviny"
                    type="number"
                    id="protein"
                    InputProps={{ style: { fontFamily: "Nunito" } }}
                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                    {...register("proteins", { 
                        required: "Položka je povinná",
                        min: {
                        value: 0,
                        message: "Minimální hodnota je 0",
                        }, 
                    })}
                    error={!!errors?.proteins}
                    helperText={errors?.proteins ? errors.proteins.message : null}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    variant="standard"
                    label="Vláknina"
                    type="number"
                    id="fiber"
                    InputProps={{ style: { fontFamily: "Nunito" } }}
                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                    {...register("fiber", { 
                        required: "Položka je povinná",
                        min: {
                        value: 0,
                        message: "Minimální hodnota je 0",
                        }, 
                    })}
                    error={!!errors?.fiber}
                    helperText={errors?.fiber ? errors.fiber.message : null}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    variant="standard"
                    label="Sůl"
                    type="number"
                    id="salt"
                    InputProps={{ style: { fontFamily: "Nunito" } }}
                    InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                    {...register("salt", { 
                        required: "Položka je povinná",
                        min: {
                        value: 0,
                        message: "Minimální hodnota je 0",
                        }, 
                    })}
                    error={!!errors?.salt}
                    helperText={errors?.salt ? errors.salt.message : null}
                />
                </Grid>
                {alertSeverity && (
                // @ts-ignore
                <Alert severity={alertSeverity}>{alertMessage}</Alert>
                )}
                
                <Button
                variant="contained"
                disableRipple
                type="submit"
                fullWidth
                
                sx={{
                    backgroundColor: "orange",
                    fontFamily: "Nunito",
                    fontWeight: "bold",
                    marginTop: {xs: 2, sm: 5},
                    marginBottom: 2,
                    transition: "transform 0.2s",
                    ":hover": {
                    transform: "scale(1.1)",
                    backgroundColor: "#f29830",
                    }
                }}
                >
                Uložit
                </Button>

                <Button
                variant="contained"
                disableRipple
                fullWidth
                onClick={() => closeModal()}
                sx={{
                    backgroundColor: "lightGray",
                    fontFamily: "Nunito",
                    fontWeight: "bold",
                    transition: "transform 0.2s",
                    ":hover": {
                    transform: "scale(1.1)",
                    backgroundColor: "darkGray",
                    }
                }}
                >
                Zpět
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    </Box>
  );
};
export default AddFoodModal;
