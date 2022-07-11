import { useNavigate } from "react-router-dom";
// import { styled } from "@mui/system";
import {CssBaseline} from "@mui/material";
// import {MainAppBar} from "../components/Header";
import FoodDetails, {Food} from "./FoodDetails";
import MainBackground from "../Utils/MainBackground";
import axios from "../../api/axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CustomAppBar from "../Utils/CustomAppBar";

// const FlexedHero = styled(MainBackground)({
//   display: "flex",
//   justifyContent: "center",
// });

const FoodDetailsPage = () => {
  const navigate = useNavigate();
  // TODO: development only remove later
  const tempData = { "name": "banan", "imageUrl": "https://www.lovemysalad.com/sites/default/files/styles/home_carousel_item_768/public/banaan-large.jpg?itok=qRLZa1EH", "description": "asdkfalsjdfk;ljds", "calories": 123, "sugar": 69, "salt": 4, "carbs": 22, "proteins": 1, "fats": 2, "saturated_fats": 1, "fiber": 69, "id": "314reajfo34u" };

  const [food, setFood] = useState<Food>(tempData);
  let { id } = useParams();
  
  try {  
    useEffect(() => {
      axios
        .get(`/food/${id}`)
        .then((response) => {
          setFood(response?.data?.data)
        }).catch((_) => {
          navigate("/not-found");
        })
    }, [id])
  } catch (err) {
    console.log(err)
  }

  return (
    <div style={{minHeight: "100vh"}}>
    <MainBackground>
      <CssBaseline />
      {/*<MainAppBar />*/}
      <CustomAppBar withSearch={true}/>
      <FoodDetails food={food}/>
    </MainBackground>
    </div>
  );
};

export default FoodDetailsPage;
