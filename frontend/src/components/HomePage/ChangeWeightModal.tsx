import { FC, useContext } from "react";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";

import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

import MealType from "../../types/MealType";

interface IChangeWeightModalProps {
  open: boolean;
  handleClose: () => void;
  recordId: string;
  date: string;
  type: MealType;
}

const ChangeWeightModal:FC<IChangeWeightModalProps> = ({
  open,
  handleClose,
  recordId,
  date,
  type,
}) => {
  // @ts-ignore
  const { auth } = useContext(AuthContext);

  const saveFood = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (+data.get("grams")! <= 0) {
      alert("Snězená hmotnost musí být kladná");
      return;
    }

    try {
      const body = JSON.stringify({
        id: recordId,
        date: date,
        grams: +data.get("grams")!,
        mealType: type,
      });
      axios
        .put("/diary", body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.ssid}`,
          },
        })
        .then(() => {
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal open={open} onClose={handleClose} keepMounted disableScrollLock>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 8,
        }}
      >
        <Box component="form" onSubmit={saveFood} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Zadejte nové množství</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="grams"
                label="Gramů"
                name="grams"
                type="number"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "orange",
              fontWeight: "bold",
              fontFamily: "Nunito",
              fontSize: "1.2rem",
              transition: "transform 0.5s",
              ":hover": {
                transform: "scale(1.05)",
                backgroundColor: "#f29830",
              },
            }}
          >
            Uložit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeWeightModal;
