import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  Autocomplete,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";


import searchFoodByName from "../../utils/SearchFoodByName";

import IFoodRecord from "../../interfaces/IFoodRecord";

interface ISearchBarProps {}

const SearchBar: FC<ISearchBarProps> = () => {
  const navigate = useNavigate();

  const [foundFoods, setFoundFoods] = useState<IFoodRecord[]>([]);
  const [currValue, setCurrValue] = useState("");

  const handleSetFood = (name: string) => {
    if (name === "") {
      setFoundFoods([]);
      return;
    }
    searchFoodByName(name)
      .then((foods) => {
        setFoundFoods(foods);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disablePortal
      disableClearable
      fullWidth
      options={foundFoods.map((food) => food.name)}
      onChange={(e, value) => navigate(`/details/${value}`)}
      PaperComponent={({ children }) => (
        <Paper
          style={{
            background: "black",
            color: "white",
            fontFamily: "Nunito",
            fontSize: "1.5rem",
          }}
        >
          {children}
        </Paper>
      )}
      renderInput={(params) => {
        return (
          <InputBase
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            fullWidth
            sx={{
              ml: 0,
              flex: 1,
              background: "white",
              borderRadius: "10px",
              marginBottom: { xs: 3, md: 0 },
              pl: 2,
              fontSize: "1.25rem",
            }}
            placeholder="Vyhledej jídlo"
            onChange={(e) => {
              handleSetFood(e.target.value);
              setCurrValue(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  type="submit"
                  sx={{ color: "black" }}
                  aria-label="search"
                  onClick={() => {
                    if (foundFoods.some((food) => food.name.toLocaleLowerCase() === currValue.toLocaleLowerCase())) {
                    navigate(`/details/${currValue}`);
                    }
                    else (
                      navigate("/not-found")
                    )
                }}
                >
                  <SearchIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </InputAdornment>
            }
          />
        );
      }}
    />
  );
};

export default SearchBar;
