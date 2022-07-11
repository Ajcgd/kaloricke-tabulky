import {styled} from "@mui/system";
import {FC, useEffect, useState, useContext} from "react";
import {
  Box,
  Button, Dialog, DialogContent, DialogContentText, DialogTitle,
  Grid, MenuItem, Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import axios from "../../api/axios";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import AuthContext from "../../context/AuthProvider";
import { Navigate } from "react-router-dom"
import Chart from "react-apexcharts"

export interface Food {
  name: string,
  imageUrl: string,
  description: string,
  calories: number,
  proteins: number,
  carbs: number,
  fats: number,
  fiber: number,
  salt: number,
  id: string
}

interface FoodDetailsProps {
  food: Food
}

type FoodDetailsType = FC<FoodDetailsProps>;

const Container = styled("div")({
  borderRadius: "15px",
  fontFamily: "nunito",
  backgroundColor: "white",
  margin: "2% 15%",
  padding: "0.75%",
  minWidth: "60vw",
  display: "flex",
  flexDirection: "column",
});

const PaddedDiv = styled(Box)({
  padding: "0.75rem 1.25rem",
  fontFamily: "nunito",
});

const InfoDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const FoodImg = styled("img")({
  maxHeight: "10rem",
  height: "10rem",
  width: "auto",
});

const ValuesDiv = styled("div")({
  fontSize: "1.25rem",
});

const AddButton = styled(Button)({
  fontFamily: "nunito",
  variant: "contained",
  backgroundColor: "#eb9b34",
  color: "white",
  ":hover": {
    backgroundColor: "#edc48c",
  },
});

const NunitoTableCell = styled(TableCell)({
  fontFamily: "nunito",
})

const TableDiv = styled(Box)({
  fontFamily: "nunito",
})


const getValueMultiplied = (value: number, multiplier: number) => {
  return (value * multiplier/100).toFixed(2).replace(/[.,]00$/, "")
};

const DonutChart = (food: Food) => {
  const options = {
    series: [food.proteins, food.fats, food.carbs, food.fiber, food.salt],
    labels: ["Bílkoviny", "Tuky", "Sacharidy", "Vláknina", "Sůl"],
    colors: ["#b67b2d", "#b3d593", "#edc48c", "#eb9b34", "#555731"],
    plotOptions: {
      pie: {
        expandOnClick: false,
      }
    },
    dataLabels: {
      enabled: false,
    }
  };

  return (
    // @ts-ignore
    <Chart
      options={options}
      series={options.series}
      type="donut"
      height="100%"
    >
    </Chart>
  );
}

// @ts-ignore
const DetailsWindow = ({amount, food, handleClose}) => {
  const [mealType, setMealType] = useState("lunch")
  const [date, setDate] = useState(new Date())

  // @ts-ignore
  const { auth } = useContext(AuthContext);

  const saveFood = async (food:Food, grams:number, mealType: string, date: string) => {
    try {
      const body = JSON.stringify({
        foodId: food.id,
        date: date,
        grams: grams,
        mealType: mealType,
      });
      axios
        .post("/diary", body, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.ssid}`
          }
        })
        .then((result) => {
          handleClose();
          // setFoodName("");
        }).catch((e) => {
        console.log(e)
      });
    } catch (e) {
      console.log(e);
    }
  }

  const dateString =
    String(date?.getFullYear()) +
    "-" +
    // @ts-ignore
    String(date?.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date?.getDate()).padStart(2, "0") + "T10:00:00";

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-around"}
      gap={"1rem"}
    >
      <Select
        sx={{fontFamily: "nunito",}}
        value={mealType}
        label="mealType"
        onChange={
          (event) => setMealType(event.target.value)}
      >
        <MenuItem value={"breakfast"}>Snídaně</MenuItem>
        <MenuItem value={"morningsnack"}>Dopolední svačina</MenuItem>
        <MenuItem value={"lunch"}>Oběd</MenuItem>
        <MenuItem value={"afternoonsnack"}>Odpolední svačina</MenuItem>
        <MenuItem value={"dinner"}>Večeře</MenuItem>
      </Select>
      <DatePicker
        disableFuture
        label="Vyberte den"
        openTo="day"
        value={date}
        // @ts-ignore
        onChange={(event) => setDate(event)}
        renderInput={(params: any) => <TextField {...params} />}
      />
      <AddButton
        onClick={() => saveFood(food, amount, mealType, dateString)}>
        přidat
      </AddButton>
    </Box>
  )
};


const FoodDetails:FoodDetailsType = ({food}) => {
  const [amount, setAmount] = useState<number>(100);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // @ts-ignore
  const { auth } = useContext(AuthContext);

  return (
    <Grid container minHeight="100vh" justifyContent="center">
      <Container
        sx={{
          height: "min-content",
          minWidth: { xs: "100%", md: "60%" },
        }}
      >
        {(auth.ssid == null || auth.ssid == "") && <Navigate to="/login" />}
        <InfoDiv sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <TableDiv sx={{display: "flex", flexDirection:"column"}}>
          <PaddedDiv>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "h4.fontSize",
                letterSpacing: "0.15rem",
                fontFamily: "nunito",
              }}
            >
              {food.name}
            </Typography>
          </PaddedDiv>
          <PaddedDiv
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "0.5rem",
              justifyContent: "space-between",
            }}
          >
            <PaddedDiv
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                gap: "0.5rem",
                padding: "0",
              }}
            >
              <Typography sx={{ fontFamily: "nunito" }}>Množství</Typography>
              <TextField
                defaultValue={100}
                variant="standard"
                margin="none"
                onChange={(amount) => {
                  setAmount(+amount.target.value);
                }}
                sx={{ fontFamily: "nunito" }}
              />
              <Typography sx={{ fontFamily: "nunito" }}>x&nbsp;1g</Typography>
            </PaddedDiv>
            <PaddedDiv>
              {auth.role === "user" && <AddButton onClick={handleClickOpen}>
                {isDesktop ? "Zapsat potravinu do jídelníčku" : "Zapsat"}
              </AddButton>}
              <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                disableScrollLock
              >
                <DialogTitle sx={{ fontFamily: "nunito" }}>
                  Vyberte typ jídla a datum
                </DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ fontFamily: "nunito" }}>
                    Pro uložení jídla do jídelníčku, prosím vyberte datum
                    konzumace a typ jídla.
                  </DialogContentText>
                  <DetailsWindow
                    amount={amount}
                    food={food}
                    handleClose={handleClose}
                  />
                </DialogContent>
              </Dialog>
            </PaddedDiv>
          </PaddedDiv>
          </TableDiv>
          {isDesktop && food.imageUrl && <FoodImg src={food.imageUrl} alt={food.name}/>}
        </InfoDiv>
        <PaddedDiv>
          <Grid container>
            <Grid item xs={isDesktop ? 4 : 12}>
              Energetická hodnota
              <ValuesDiv>
                {getValueMultiplied(food.calories, amount)} kcal
              </ValuesDiv>
            </Grid>
            <Grid item xs={isDesktop ? 2 : 6}>
              Bílkoviny
              <ValuesDiv>
                {getValueMultiplied(food.proteins, amount)} g
              </ValuesDiv>
            </Grid>
            <Grid item xs={isDesktop ? 2 : 6}>
              Sacharidy
              <ValuesDiv>{getValueMultiplied(food.carbs, amount)} g</ValuesDiv>
            </Grid>
            <Grid item xs={isDesktop ? 2 : 6}>
              Tuky
              <ValuesDiv>{getValueMultiplied(food.fats, amount)} g</ValuesDiv>
            </Grid>
            <Grid item xs={isDesktop ? 2 : 6}>
              Vláknina
              <ValuesDiv>{getValueMultiplied(food.fiber, amount)} g</ValuesDiv>
            </Grid>
          </Grid>
        </PaddedDiv>
        <PaddedDiv
          sx={{ display: "flex", flexDirection: isDesktop ? "row" : "column" }}
        >
          <TableDiv
            sx={{
              width: isDesktop ? "50%" : "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography fontFamily="nunito">
              Nutriční hodnoty na 100g
            </Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <NunitoTableCell>Bílkoviny</NunitoTableCell>
                  <NunitoTableCell>{food.proteins} g</NunitoTableCell>
                </TableRow>
                <TableRow>
                  <NunitoTableCell>Sacharidy</NunitoTableCell>
                  <NunitoTableCell>{food.carbs} g</NunitoTableCell>
                </TableRow>
                <TableRow>
                  <NunitoTableCell>Tuky</NunitoTableCell>
                  <NunitoTableCell>{food.fats} g</NunitoTableCell>
                </TableRow>
                <TableRow>
                  <NunitoTableCell>Vláknina</NunitoTableCell>
                  <NunitoTableCell>{food.fiber} g</NunitoTableCell>
                </TableRow>
                <TableRow>
                  <NunitoTableCell>Sůl</NunitoTableCell>
                  <NunitoTableCell>{food.salt} g</NunitoTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableDiv>
          <PaddedDiv
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "3% 0 0 5%",
            }}
          >
            <DonutChart
              {...food}
            />
          </PaddedDiv>
        </PaddedDiv>
      </Container>
    </Grid>
  );
};

export default FoodDetails;
