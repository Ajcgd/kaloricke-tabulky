import { CssBaseline, Grid, Box, Container, AppBar, Link, Stack, Toolbar } from "@mui/material";
import { Typography, Button, Alert } from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import axios from "../../api/axios";

const theme = createTheme();

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

//@ts-ignore
const DeleteFoodModal = ({foodId, foodName, ssid, closeModal}) => {
  // @ts-ignore
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const deleteFood = async () => {
    try {
      await axios
        .delete(`/food/${foodId}`, {
          headers: { 
            "Authorization": `Bearer ${ssid}`, 
            "Content-Type": "application/json",
          },
        })
        .then((_) => {
          setAlertSeverity("success");
          setAlertMessage("Jídlo bylo úspěšně odstraněno.");
          setTimeout(() => {closeModal()}, 1500)
        })
        .catch((err) => {
          setAlertSeverity("error");
          setAlertMessage(
              "Nastala neočekávaná chyba, zkuste to prosím později"
            );
        });
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontFamily: "Nunito" }}>
            Opravdu chcete odstranit {foodName}?
        </Typography>
        {alertSeverity && 
            // @ts-ignore
            <Alert severity={alertSeverity}>{alertMessage}</Alert>
        }
        <Button
            variant="contained"
            disableRipple
            sx={{
            backgroundColor: "orange",
            fontWeight: "bold",
            fontFamily: "Nunito",
            marginY: 1,
            marginRight: 2,
            width: 100,
            transition: "transform 0.2s",
            ":hover": {
                transform: "scale(1.1)",
                backgroundColor: "#f29830",
            },
            }}
            onClick={() => {
            closeModal();
            }}
        >Zpět</Button>
        <Button
            variant="contained"
            disableRipple
            sx={{
            backgroundColor: "red",
            fontWeight: "bold",
            fontFamily: "Nunito",
            marginY: 1,
            width: 200,
            transition: "transform 0.2s",
            ":hover": {
                transform: "scale(1.1)",
                backgroundColor: "darkRed",
            },
            }}
            onClick={() => {
            deleteFood();
            }}
        >Odstranit</Button>
        </Box>
  );
};
export default DeleteFoodModal;
