import { FC, useEffect, useState } from "react";

import { Box, Grid, IconButton, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import FoodRecord from "./FoodRecord";

import IDiaryRecord from "../../interfaces/IDiaryRecord";

import MealType from "../../types/MealType";

interface IFoodMilestone {
  date: string;
  eaten: {};
  name: string;
  type: MealType;
  showModal: (type: MealType) => void;
  handleForceReload: () => void;
}

const FoodMilestone: FC<IFoodMilestone> = ({
  date,
  eaten,
  name,
  type,
  showModal,
  handleForceReload,
}) => {
  const [calories, setCalories] = useState(0);
  useEffect(() => {
    let res = 0;
    if (Array.isArray(eaten)) {
      eaten.map((e: IDiaryRecord) => {
        if (e.mealType === type) {
          res += (e.food.calories / 100) * e.grams;
        }
      });
    }
    setCalories(Math.round(res));
  }, [eaten]);

  return (
    <Grid container item sx={{ width: "100%" }} direction="column">
      <Grid item mx={1}>
        <Box
          component="span"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 0.5,
            borderRadius: 3,
            border: "3px solid",
            width: "100%",
            borderColor: "#f7e9bc",
            fontFamily: "Nunito",
            fontWeight: "600",
            backgroundColor: "#faf5e6",
          }}
          my={1}
        >
          <Typography
            sx={{
              fontFamily: "Nunito",
              fontSize: { xs: "1.4rem", sm: "1.6rem" },
              fontWeight: 700,
            }}
          >
            {name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: "Nunito",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                fontWeight: 700,
              }}
            >
              {calories} kcal
            </Typography>
            <IconButton
              onClick={() => showModal(type)}
              sx={{ p: 0, px: 1 }}
            >
              <AddIcon sx={{ color: "green", fontSize: "1.9rem" }} />
            </IconButton>
          </div>
        </Box>
      </Grid>
      <Grid item>
        {Array.isArray(eaten) ? (
          eaten.map((e: IDiaryRecord) => {
            if (e.mealType === type) {
              return (
                <FoodRecord
                  food={e.food}
                  handleForceReload={handleForceReload}
                  eatenId={e.id}
                  name={e.food.name}
                  calories={e.food.calories}
                  grams={e.grams}
                  date={date}
                  type={type}
                />
              );
            }
          })
        ) : (
          <div>Loading</div>
        )}
      </Grid>
    </Grid>
  );
};

export default FoodMilestone;
