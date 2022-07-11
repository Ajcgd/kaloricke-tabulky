import { FC } from "react";
import { Box, Grid, Modal, Table, TableBody, TableHead, TableRow, TableCell, Typography, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import DoughnutChart from "./DoughnutChart";
import IFoodRecord from "../../interfaces/IFoodRecord";

interface IFoodDetailsInfoModalProps {
  open: boolean;
  handleClose: () => void;  
  food: IFoodRecord;
}

const FoodDetailsInfoModal:FC<IFoodDetailsInfoModalProps> = ({open, handleClose,food}) => {
   return (
     <Modal open={open} onClose={handleClose} keepMounted disableScrollLock>
       <Box
         sx={{
           position: "absolute",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
           bgcolor: "background.paper",
           border: "2px solid #000",
           boxShadow: 24,
           p: 4,
           borderRadius: 8,
         }}
       >
         <Grid
           container
           sx={{
             width: { xs: "75vw", sm: "70vw", md: "60vw", lg: "40vw" },
           }}
         >
           <Grid container item xs={12} sx={{ backgroundColor: "white", display: "flex" }} justifyContent="space-between">
             <Typography fontFamily="Nunito" fontSize="3rem">
               {food.name}
             </Typography>
             <IconButton onClick={() => handleClose()} >
               <CloseIcon sx={{fontSize: "1.9rem" }} />
             </IconButton>
           </Grid>
           <Grid
             container
             item
             direction={{ xs: "row", md: "column" }}
             xs={12}
             sm={6}
           >
             <Table>
               <TableHead>
                 <TableRow>
                   <TableCell
                     sx={{
                       fontFamily: "Nunito",
                       fontWeight: "700",
                       fontSize: "1.4rem",
                     }}
                   >
                     Složka
                   </TableCell>
                   <TableCell
                     sx={{
                       fontFamily: "Nunito",
                       fontWeight: "700",
                       fontSize: "1.4rem",
                     }}
                   >
                     Obsah (na 100g)
                   </TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 <TableRow>
                   <TableCell sx={{ fontFamily: "Nunito" }}>Kalorie</TableCell>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     {food.calories} g
                   </TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     Bílkoviny
                   </TableCell>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     {food.proteins} g
                   </TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     Sacharidy
                   </TableCell>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     {food.carbs} g
                   </TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     Sacharidy
                   </TableCell>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     {food.carbs} g
                   </TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell sx={{ fontFamily: "Nunito" }}>Tuky</TableCell>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     {food.fats} g
                   </TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell sx={{ fontFamily: "Nunito" }}>Vláknina</TableCell>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     {food.fiber} g
                   </TableCell>
                 </TableRow>
                 <TableRow>
                   <TableCell sx={{ fontFamily: "Nunito" }}>Sůl</TableCell>
                   <TableCell sx={{ fontFamily: "Nunito" }}>
                     {food.salt} g
                   </TableCell>
                 </TableRow>
               </TableBody>
             </Table>
           </Grid>
           <Grid item xs={12} sm={6}>
             <DoughnutChart food={food} />
           </Grid>
         </Grid>
       </Box>
     </Modal>
   );

    //<>
    //<TableDiv sx={{ width: isDesktop ? "50%" : "100%", display:"flex", flexDirection:"column" }}>
    //        <Typography fontFamily="nunito">
    //          Nutriční hodnoty na 100g
    //        </Typography>
    //        <Table>
    //          <TableBody>
    //            <TableRow>
    //              <TableCelll>Bílkoviny</TableCelll>
    //              <TableCelll>{food.proteins} g</TableCelll>
    //            </TableRow>
    //            <TableRow>
    //              <TableCelll>Sacharidy</TableCelll>
    //              <TableCelll>{food.carbs} g</TableCelll>
    //            </TableRow>
    //            <TableRow>
    //              <TableCelll>Tuky</TableCelll>
    //              <TableCelll>{food.fats} g</TableCelll>
    //            </TableRow>
    //            <TableRow>
    //              <TableCelll>Vláknina</TableCelll>
    //              <TableCelll>{food.fiber} g</TableCelll>
    //            </TableRow>
    //            <TableRow>
    //              <TableCelll>Sůl</TableCelll>
    //              <TableCelll>{food.salt} g</TableCelll>
    //            </TableRow>
    //          </TableBody>
    //        </Table>
    //      </TableDiv>
    //      <PaddedDiv
    //        sx={{
    //          display: "flex",
    //          justifyContent: "center",
    //          alignContent: "center",
    //          margin: "3% 0 0 5%",
    //        }}
    //      >
    //        <DonutChart
    //          name={food.name}
    //          description={food.description}
    //          calories={food.calories}
    //          proteins={food.proteins}
    //          carbs={food.carbs}
    //          fats={food.fats}
    //          fiber={food.fiber}
    //          salt={food.salt}
    //          id={food.id}
    //        />
    //                  </PaddedDiv>

}

export default FoodDetailsInfoModal;