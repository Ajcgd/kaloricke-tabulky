import { FC, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, IconButton, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import ChangeWeightModal from "./ChangeWeightModal";
import FoodDetailsInfoModal from "../FoodDetailsPage/FoodDetailsInfoModal";

import IFoodRecord from "../../interfaces/IFoodRecord";
import MealType from "../../types/MealType";

interface IDiaryRecord {
  food: IFoodRecord;
  handleForceReload: () => void;
  eatenId: string;
  name: string;
  calories: number;
  grams: number;
  date: string;
  type: MealType;
}

const FoodRecord: FC<IDiaryRecord> = ({
  food,
  handleForceReload,
  eatenId,
  name,
  calories,
  date,
  grams,
  type,
}) => {
  const navigate = useNavigate();
  // @ts-ignore
  const { auth } = useContext(AuthContext);
  const [openChange, setOpenChange] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const handleCloseChange = () => {
    setOpenChange(false);
    handleForceReload();
  };
  
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const handleDelete = async () => {
    await axios
      .delete(`/diary/${eatenId}`, {
        headers: {
          Authorization: `Bearer ${auth.ssid}`,
        },
      })
      .then(() => {
        handleForceReload();
      })
      .catch((err) => {
        console.log(err);
        alert("Něco se pokazilo, prosím zkuste to znovu.");
      });
  };

  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 0, sm: 2 },
        py: 0.2,
        my: 0.7,
        mx: 1,
      }}
    >
      <Box sx={{ display: { xs: "flex", sm: "flex" }, alignItems: "center" }}>
        <Typography
          sx={{
            fontFamily: "Nunito",
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            fontWeight: 600,
            mx: 0.5,
            cursor: "default",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Nunito",
            fontSize: "0.9rem",
            fontWeight: 400,
            px: 1,
            mx: 1,
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenChange(true);
          }}
        >
          {grams} g
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            fontFamily: "Nunito",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          {Math.round((calories * grams) / 100)} kcal
        </Typography>
        <IconButton
          disableRipple
          onClick={() => setOpenInfo(true)}
          sx={{ p: 0, pl: 1.5, pr: 0.3, alignItems: "center" }}
        >
          <InfoOutlinedIcon sx={{ color: "gray", fontSize: "1.8rem" }} />
        </IconButton>
        <IconButton disableRipple onClick={handleDelete} sx={{ p: 0, px: 0.3 }}>
          <DeleteIcon sx={{ color: "gray", fontSize: "1.8rem" }} />
        </IconButton>
      </Box>
      <ChangeWeightModal
        open={openChange}
        handleClose={handleCloseChange}
        date={date}
        type={type}
        recordId={eatenId}
      />
      <FoodDetailsInfoModal
        open={openInfo}
        handleClose={handleCloseInfo}
        food={food}
      />
    </Box>
  );
};

export default FoodRecord;
