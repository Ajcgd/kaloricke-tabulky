import { Box, Typography, Button } from '@mui/material';
import {useState, useContext} from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

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
function DeleteAccountModal({goHome, setGoHome, setDeleteAccountModal}) {

  const [deleteAlertMessage, setDeleteAlertMessage] = useState("");
  const [deleteAlertSeverity, setDeleteAlertSeverity] = useState("");
  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);

  const deleteAccount = async () => {
    try {
        await axios
        .delete("/user", {
            headers: { 
            "Authorization": `Bearer ${auth.ssid}`, 
            "Content-Type": "application/json",
            },
        })
        .then((_) => {
            setDeleteAlertSeverity("success");
            setDeleteAlertMessage("Účet byl úspěšně odstraněn.");
            localStorage.removeItem("auth");
            setTimeout(() => { 
            setAuth({});
            setGoHome(true);
            }, 2000);
        })
        .catch((err) => {
            setDeleteAlertSeverity("error");
            setDeleteAlertMessage(
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Opravdu chcete zrušit svůj účet?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Všechna Vaše data budou tímto krokem odstraněna.
                    </Typography>
                    {deleteAlertSeverity && 
                      // @ts-ignore
                      <Alert severity={deleteAlertSeverity}>{deleteAlertMessage}</Alert>
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
                        setDeleteAccountModal(false);
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
                        deleteAccount();
                      }}
                    >Odstranit účet</Button>
                    {goHome && <Navigate to="/" />}
                  </Box>
  )
}

export default DeleteAccountModal