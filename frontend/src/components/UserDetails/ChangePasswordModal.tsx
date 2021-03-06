import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Alert, Box, Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";


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

interface Passwords {
    oldPassword: String,
    password: String,
    passwordAgain: String
  }

//@ts-ignore
function ChangePasswordModal({changePasswordModal, setChangePasswordModal}) {
    // @ts-ignore
    const { auth } = useContext(AuthContext);

    const [passwordAlertMessage, setPasswordAlertMessage] = useState("");
    const [passwordAlertSeverity, setPasswordAlertSeverity] = useState("");
    const [Passwords, setPasswords] = useState<Passwords>({oldPassword: "", password: "", passwordAgain: ""});
    
    const {
        register: registerPasswords,
        reset: resetPasswords,
        formState: { errors: errorsPasswords },
        handleSubmit: handleSubmitPasswords,
        getValues,
      } = useForm();
  
      const onSubmitPasswords = (data: any) => {
        setPasswords(data);
        updatePassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        })
      };

    const updatePassword = async (content: any) => {
        setPasswordAlertSeverity("");
        setPasswordAlertMessage("");
        try {
          await axios
            .put("/user/password",
              JSON.stringify(content),
              {
                headers: { 
                  "Authorization": `Bearer ${auth.ssid}`, 
                  "Content-Type": "application/json",
                },
              })
              .then((_) => {
                setPasswordAlertSeverity("success");
                setPasswordAlertMessage("Heslo bylo ??sp????n?? zm??n??no");
                resetPasswords();
                setTimeout(() => { 
                  setChangePasswordModal(!changePasswordModal);
                  setPasswordAlertSeverity("");
                  setPasswordAlertMessage(""); 
                }, 2000);
              })
              .catch((err) => {
                setPasswordAlertSeverity("error");
                setPasswordAlertMessage(
                    err.response.data.message == "Old user password does not match" ? 
                    "Star?? heslo nen?? spr??vn??" :
                    "Nastala neo??ek??van?? chyba, zkuste to pros??m pozd??ji"
                  );
              });
        }
        catch (err) {
          alert("Chybn?? heslo!");
          console.log(err);
        }
    }

  return (
    <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Zm??na hesla
                    </Typography>

                    <form onSubmit={handleSubmitPasswords(onSubmitPasswords)}>
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                      <TextField
                        label="Star?? heslo"
                        fullWidth={true}
                        margin="normal"
                        variant="standard"
                        type="password"
                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                        InputProps={{
                          style: { fontFamily: "Nunito" },
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                        {...registerPasswords("oldPassword", {
                          required: "Polo??ka je povinn??",
                        })}
                        error={!!errorsPasswords?.oldPassword}
                        helperText={
                          errorsPasswords?.oldPassword ? errorsPasswords.oldPassword.message : null
                        }
                      />
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                      <TextField
                        label="Nov?? heslo"
                        fullWidth={true}
                        margin="normal"
                        variant="standard"
                        type="password"
                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                        InputProps={{
                          style: { fontFamily: "Nunito" },
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                        {...registerPasswords("newPassword", {
                          required: "Polo??ka je povinn??",
                        })}
                        error={!!errorsPasswords?.password}
                        helperText={
                          errorsPasswords?.password ? errorsPasswords.password.message : null
                        }
                      />
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                      <TextField
                        label="Nov?? heslo znovu"
                        fullWidth={true}
                        margin="normal"
                        variant="standard"
                        type="password"
                        InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                        InputProps={{
                          style: { fontFamily: "Nunito" },
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                        {...registerPasswords("passwordAgain", {
                          required: "Polo??ka je povinn??",
                          validate: (value) =>
                            value === getValues("newPassword")
                              ? true
                              : "Hesla se neshoduj??",
                        })}
                        error={!!errorsPasswords?.passwordAgain}
                        helperText={
                          errorsPasswords?.passwordAgain
                            ? errorsPasswords.passwordAgain.message
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={2}/>
                  </Grid>     

                  {passwordAlertSeverity && 
                  // @ts-ignore
                  <Alert severity={passwordAlertSeverity}>{passwordAlertMessage}</Alert>
                  }

                    <Button
                      variant="contained"
                      disableRipple
                      sx={{
                        backgroundColor: "darkGrey",
                        fontWeight: "bold",
                        fontFamily: "Nunito",
                        marginY: 1,
                        marginRight: 2,
                        width: 100,
                        transition: "transform 0.2s",
                        ":hover": {
                          transform: "scale(1.1)",
                          backgroundColor: "gray",
                        },
                      }}
                      onClick={() => {
                        setChangePasswordModal(false);
                      }}
                    >Zp??t</Button>
                    <Button
                      variant="contained"
                      disableRipple
                      sx={{
                        backgroundColor: "orange",
                        fontWeight: "bold",
                        fontFamily: "Nunito",
                        marginY: 1,
                        width: 200,
                        transition: "transform 0.2s",
                        ":hover": {
                          transform: "scale(1.1)",
                          backgroundColor: "#f29830",
                        },
                      }}
                      type="submit"
                    >Zm??nit heslo</Button>
                    </form>
                  </Box>
  )
}

export default ChangePasswordModal