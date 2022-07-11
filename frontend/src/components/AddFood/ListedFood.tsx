import { Typography, Box, Button, Grid, Modal, Collapse } from '@mui/material'
import {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteFoodModal from './DeleteFoodModal';
import Divider from '@mui/material/Divider';

//@ts-ignore
function ListedFood({name, description, calories, proteins, carbs, fats, fiber, salt, id, ssid, getFood}) {

    const [expanded, setExpanded] = useState(false);
    const [deleteFood, setDeleteFood] = useState(false);

    const refresh = () => {
        setDeleteFood(false);
        getFood()
    }

    return (
    <Box sx={{
        borderStyle: "solid",
        backgroundColor: "#f0f0f0",
        borderRadius: 2,
        borderWidth: 0.1,
        margin: 1,
        padding: 1
    }}>
        <Grid container 
        >
            <Grid item xs={10}>
                <Grid container direction={{xs:"column", sm:"row"}}>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{paddingX: 2, fontFamily: "Nunito"}}>{name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{
                            paddingTop: 1, 
                            paddingX: {xs: 2, sm: 0.5},
                            fontFamily: "Nunito"
                        }}>
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} >
                <Grid container justifyContent="right">
                    <Button onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>
                    <Button onClick={() => setDeleteFood(!deleteFood)}>
                        <DeleteIcon />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        <Modal
          open={deleteFood}
          onClose={() => {setDeleteFood(false); getFood()}}
        >
            <DeleteFoodModal foodName={name} foodId={id} ssid={ssid} closeModal={refresh}/>
        </Modal>
        <Collapse
          in={expanded}
        >
        <>
        <Divider sx={{borderWidth: 0.25, marginBottom: 0.5}} />
          <Grid container 
              direction={{xs: "column", sm: "row"}}
              sx={{paddingX: 2}}
          >
            <Grid item xs={5}>
                <Typography sx={{fontFamily: "Nunito"}}>Energetická hodnota: {calories}</Typography>
                <Typography sx={{fontFamily: "Nunito"}}>Bílkoviny: {proteins}</Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography sx={{fontFamily: "Nunito"}}>Sacharidy: {carbs}</Typography>
                <Typography sx={{fontFamily: "Nunito"}}>Tuky: {fats}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography sx={{fontFamily: "Nunito"}}>Vláknina: {fiber}</Typography>
                <Typography sx={{fontFamily: "Nunito"}}>Sůl: {salt}</Typography>
            </Grid>
          </Grid>
        </>
        </Collapse>
    </Box>
    
  )
}

export default ListedFood