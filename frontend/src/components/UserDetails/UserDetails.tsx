import { useRef } from 'react'

import {
    Alert,
    Button,
    Collapse,
    Grid,
    InputAdornment,
    Modal,
    Slider,
    Typography,
  } from "@mui/material";
  import TextField from '@mui/material/TextField';
  import { styled } from "@mui/system";
  import { useContext, useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import AuthContext from "../../context/AuthProvider";
  import SettingsIcon from '@mui/icons-material/Settings';
  import HomeIcon from '@mui/icons-material/Home';
  import CloseIcon from '@mui/icons-material/Close';
  import { useForm } from "react-hook-form";
  import { DatePicker } from '@mui/x-date-pickers';
  import './UserDetails.css'
  import axios from "../../api/axios";
  import { Navigate } from "react-router-dom"
  import { createTheme, responsiveFontSizes } from '@mui/material/styles';
  import DeleteAccountModal from './DeleteAccountModal';
  import ChangePasswordModal from './ChangePasswordModal';


  const Root = styled("div")({
    display: "flex",
    justifyContent: "center",
  });
  
  const Container = styled("div")({
    textAlign: "center",
    height: "min-content"
  });

  const OrangeButton = styled(Button)({
    backgroundColor: "orange",
    fontWeight: "bold",
    fontFamily: "Nunito",
    margin: 4,
    width: 250,
    transition: "transform 0.2s",
    ":hover": {
      transform: "scale(1.1)",
      backgroundColor: "#f29830",
    }
  });

  export interface Goals {
    calories: number,
    proteins: number,
    carbs: number,
    fats: number,
    fiber: number,
    salt: number
  }

  const marks = [
    {
      value: 5,
      label: "Žena",
    },
    {
      value: 95,
      label: "Muž",
    },
  ];
  
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  
  export default function UserDetails() {
    const [appBarSize, setAppBarSize] = useState(document.getElementById("CustomAppBar") ? document.getElementById("CustomAppBar")!.clientHeight * (100 / document.documentElement.clientHeight) : 0);

    useEffect(() => {
      const curr = document.getElementById("CustomAppBar")
        ? document.getElementById("CustomAppBar")!.clientHeight *
          (100 / document.documentElement.clientHeight)
        : 0;
      if (appBarSize === 0 || curr !== appBarSize) {
        setAppBarSize(
          document.getElementById("CustomAppBar")
            ? document.getElementById("CustomAppBar")!.clientHeight *
                (100 / document.documentElement.clientHeight)
            : 0
        );
      }
    }, [appBarSize]);


    window.addEventListener('resize', () => {
      setAppBarSize(document.getElementById("CustomAppBar") ? document.getElementById("CustomAppBar")!.clientHeight * (100 / document.documentElement.clientHeight) : 0);
    })
    const {
      register: registerEmail,
      reset: resetEmail,
      formState: { errors: errorsEmail },
      handleSubmit: handleSubmitEmail,
    } = useForm();
    
    const onSubmitEmail = (data: any) => {
      setEmail(data.email);
      updateDetails({
        details: {
          email: data.email
        }
      });
    };

    const {
      register: registerUsername,
      reset: resetUsername,
      formState: { errors: errorsUsername },
      handleSubmit: handleSubmitUsername,
    } = useForm();
    
    const onSubmitUsername = (data: any) => {
      setUsername(data.username);
      setAuth({...auth, username: data.username});
      localStorage.setItem("auth", JSON.stringify({...auth, username: data.username}));
      updateDetails({
        details: {
          username: data.username
        }
      });
      
    };

    const {
      register: registerName,
      reset: resetName,
      formState: { errors: errorsName },
      handleSubmit: handleSubmitName,
    } = useForm();
    
    const onSubmitName = (data: any) => {
      setName(data.name);
      updateDetails({
        details: {
          name: data.name
        }
      });
    };

    const {
      register: registerSurname,
      reset: resetSurname,
      formState: { errors: errorsSurname },
      handleSubmit: handleSubmitSurname,
    } = useForm();
    
    const onSubmitSurname = (data: any) => {
      setSurname(data.surname);
      updateDetails({
        details: {
          surname: data.surname
        }
      });
    };

    const {
      register: registerHeight,
      reset: resetHeight,
      formState: { errors: errorsHeight },
      handleSubmit: handleSubmitHeight,
    } = useForm();
  
    const onSubmitHeight = (data: any) => {
      setHeight(data.height);
      updateDetails({
        details: {
          height: data.height
        }
      });
    };

    const {
      register: registerWeight,
      reset: resetWeight,
      formState: { errors: errorsWeight },
      handleSubmit: handleSubmitWeight,
    } = useForm();

    const onSubmitWeight = (data: any) => {
      setWeight(data.weight);
      updateDetails({
        details: {
          weight: data.weight
        }
      });
    };

    const {
      register: registerGoalWeight,
      reset: resetGoalWeight,
      formState: { errors: errorsGoalWeight },
      handleSubmit: handleSubmitGoalWeight,
    } = useForm();

    const onSubmitGoalWeight = (data: any) => {
      setGoalWeight(data.goalWeight);
      updateDetails({
        details: {
          goalWeight: data.goalWeight
        }
      });
    };

    const {
      register: registerGoals,
      reset: resetGoals,
      setValue: setValueGoals,
      formState: { errors: errorsGoals },
      handleSubmit: handleSubmitGoals,
    } = useForm();

    const onSubmitGoals = (data: any) => {
      setGoals(data);
      setCustomGoals(!customGoals);
      updateDetails({
        goals: {
          calories: parseInt(data.calories),
          proteins: parseInt(data.proteins),
          carbs: parseInt(data.carbs),
          fats: parseInt(data.fats),
          fiber: parseInt(data.fiber),
          salt: parseInt(data.salt),
        }
      });
    };

    const [emailAlertMessage, setEmailAlertMessage] = useState("");
    const [emailAlertSeverity, setEmailAlertSeverity] = useState("");

    const [changeEmail, setChangeEmail] = useState<boolean>(false);
    const [email, setEmail] = useState<String>("");

    const [changeUsername, setChangeUsername] = useState<boolean>(false);
    const [username, setUsername] = useState<String>("");

    const [changeName, setChangeName] = useState<boolean>(false);
    const [name, setName] = useState<String>("");

    const [changeSurname, setChangeSurname] = useState<boolean>(false);
    const [surname, setSurname] = useState<String>("");
    
    const [changeSex, setChangeSex] = useState<boolean>(false);
    const [sex, setSex] = useState<number>(50);
    const [newSex, setNewSex] = useState<number>(0);
    
    const [changeHeight, setChangeHeight] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);

    const [changeWeight, setChangeWeight] = useState<boolean>(false);
    const [weight, setWeight] = useState<number>(0);

    const [changeBirthDate, setChangeBirthDate] = useState<boolean>(false);
    const [birthDate, setBirthDate] = useState<Date | null>(new Date());
    const [newBirthDate, setNewBirthDate] = useState<Date | null>(new Date());

    const [changeGoalWeight, setChangeGoalWeight] = useState<boolean>(false);
    const [goalWeight, setGoalWeight] = useState<number>(0);

    const [customGoals, setCustomGoals] = useState<boolean>(false);
    const [goals, setGoals] = useState<Goals>({calories: 0, proteins: 0, carbs: 0, fats: 0, fiber: 0, salt: 0});
    

    const [changePasswordModal, setChangePasswordModal] = useState<boolean>(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState<boolean>(false);
    const [goHome, setGoHome] = useState<boolean>(false);

      // @ts-ignore
    const { auth, setAuth } = useContext(AuthContext);
    useEffect(() => {
      if (window.localStorage.getItem("auth")) {
        // @ts-ignore
        setAuth(JSON.parse(window.localStorage.getItem("auth")));
      };
      getDetails();
    }, []);
  
    const closeAll = () => {
      setChangeEmail(false);
      setChangeSex(false);
      setChangeUsername(false);
      setChangeName(false);
      setChangeSurname(false);
      setChangeHeight(false);
      setChangeWeight(false);
      setChangeBirthDate(false);
      setChangeGoalWeight(false);
      setCustomGoals(false);
    }

    const resetAll = () => {
      resetEmail();
      resetUsername();
      resetName();
      resetSurname();
      resetHeight();
      resetWeight();
      resetGoalWeight();
      resetGoals();
    }

    const setAll = () => {
      setValueGoals("calories", goals.calories);
      setValueGoals("proteins", goals.proteins);
      setValueGoals("carbs", goals.carbs);
      setValueGoals("fiber", goals.fiber);
      setValueGoals("fats", goals.fats);
      setValueGoals("salt", goals.salt);
    }


    const getDetails = async () => {
      try {
         await axios
           .get("/user", {
             headers: { 
              "Authorization": `Bearer ${auth.ssid}`,
             },
           })
           .then((response) => {
             const userDetails = response?.data?.data?.details;
             const userGoals = response?.data?.data?.goals;
             setEmail(userDetails?.email);
             setUsername(userDetails?.username);
             setName(userDetails?.name);
             setSurname(userDetails?.surname);
             setSex(userDetails?.sex * 100);
             setHeight(userDetails?.height);
             setWeight(userDetails?.weight);
             setBirthDate(new Date(userDetails?.birthdate));
             setGoalWeight(userDetails?.goalWeight);
             setGoals({...userGoals, calories: Math.round(userGoals.calories)});
             setAll();
           })
      } catch (err) {
        // @ts-ignore
        if (err.response.status == 401) {
          setAuth({});
          localStorage.removeItem("auth");
          setGoHome(true);
        } else {
          alert("Vyskytla se neočekávaná chyba na naší straně. Zkuste akci zopakovat.");
          getDetails();
        }
      }
    };

    const updateDetails = async (content: any) => {
      try {
        await axios
          .put("/user",
            JSON.stringify(content),
            {
              headers: { 
                "Authorization": `Bearer ${auth.ssid}`, 
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              console.log(response);
              });
              closeAll();
              resetAll();
      }
      catch (err: any) {
        console.log(err);
        resetAll();
        if (err.response.status == 409) {
          setEmailAlertSeverity("error");
          setEmailAlertMessage("Uživatel s tímto e-mailem již existuje");
        } else {
          alert("Vyskytla se neočekávaná chyba na naší straně. Zkuste akci zopakovat.");
        }
        setTimeout(() => {setEmailAlertSeverity("");}, 3000);
        getDetails();
        setAuth({...auth, username: username});
        localStorage.setItem("auth", JSON.stringify({...auth, username: username}));
      }
    }

    const myRef = useRef(null);

    const isAdmin = auth?.role == "admin";

    return (
      <Root id="header" sx={{
        minHeight: `${100 - appBarSize}vh`
        }}>
        {(Object.keys(auth).length === 0 || 
          auth.ssid == null || 
          auth.ssid == "") && <Navigate to='/login'  />}
        <Container 
            sx={{
                backgroundColor: "white",
                marginTop: {xs: 0, md: 5},
                marginBottom: {xs: 5, md: 10},
                borderRadius: {xs: 0, md: 10},
                paddingBottom: 12.5,
                width: {xs: "100vw", md: "91.7vw"},
                overflow: 'auto'
        }}
        >
          <Grid container
          justifyContent={{xs: "center", md: "left"}}
          >
            <Grid item sx={{display: {xs:"none", md:"unset"}}}>
              <Link to="/home">
              <Button
              sx={{
                backgroundColor: "#eeeeee",
                margin: 4,
                paddingY: 2
              }}>
                <HomeIcon fontSize="large" sx={{ color: "black" }} />
              </Button>
              </Link>
            </Grid>

            <Grid item>
              <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}
                variant="h3"
                component="h2"
                textAlign={{xs: "center", md: "left"}}
                paddingY={{xs: 2, md: 5}}
                >
                  Osobní údaje
              </Typography>
            </Grid>
          </Grid>

          <Grid container
            justifyItems={"space-around"}
            direction={"row"}
          >
            <Grid item xs={12} md={6}>
              {/* EMAIL */}
                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography 
                    sx={{ 
                      fontFamily: "Nunito",
                    }}
                  >E-mail</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{email}</Typography>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeEmail ?
                  <CloseIcon onClick={() => setChangeEmail(!changeEmail)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeEmail(!changeEmail)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeEmail}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                    <TextField  
                      label="Nový e-mail"
                      variant="standard" 
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...registerEmail("email", 
                        {
                          required: "Položka je povinná",
                          pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Chybný email",
                          },
                        })}
                      error={!!errorsEmail?.email}
                      helperText={errorsEmail?.email ? errorsEmail.email.message : null}/>
                    </Grid>   
                    <Grid item xs={3} md={4}>
                    <Button type="submit" sx={{fontFamily: "Nunito"}}>Uložit</Button>
                    </Grid>
                  </Grid>
                  </form> 
                  {emailAlertSeverity && 
                  // @ts-ignore
                  <Alert severity={emailAlertSeverity}>{emailAlertMessage}</Alert>
                  }
                </Collapse>

                {/* USERNAME */}
                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Přezdívka</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{username}</Typography>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeUsername ?
                  <CloseIcon onClick={() => setChangeUsername(!changeUsername)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeUsername(!changeUsername)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeUsername}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitUsername(onSubmitUsername)}>
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                    <TextField 
                      label="Nová přezdívka" 
                      variant="standard" 
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...registerUsername("username", {
                        required: "Položka je povinná",
                      })}
                      error={!!errorsUsername?.username}
                      helperText={errorsUsername?.username ? errorsUsername.username.message : null}/>
                    </Grid>   
                    <Grid item xs={3} md={4}>
                    <Button type="submit" sx={{fontFamily: "Nunito"}}>Uložit</Button>
                    </Grid>
                  </Grid>
                  </form> 
                </Collapse>

                {/* NAME */}
                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Jméno</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{name}</Typography>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeName ?
                  <CloseIcon onClick={() => setChangeName(!changeName)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeName(!changeName)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeName}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitName(onSubmitName)}>
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                    <TextField 
                      label="Nové jméno" 
                      variant="standard" 
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...registerName("name", {
                        required: "Položka je povinná",
                      })}
                      error={!!errorsName?.name}
                      helperText={errorsName?.name ? errorsName.name.message : null}/>
                    </Grid>   
                    <Grid item xs={3} md={4}>
                    <Button type="submit" sx={{fontFamily: "Nunito"}}>Uložit</Button>
                    </Grid>
                  </Grid>
                  </form> 
                </Collapse>

                {/* SURNAME */}
                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Příjmení</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{surname}</Typography>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeSurname ?
                  <CloseIcon onClick={() => setChangeSurname(!changeSurname)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeSurname(!changeSurname)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeSurname}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitSurname(onSubmitSurname)}>
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                    <TextField 
                      label="Nové příjmení" 
                      variant="standard" 
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...registerSurname("surname", {
                        required: "Položka je povinná",
                      })}
                      error={!!errorsSurname?.surname}
                      helperText={errorsSurname?.surname ? errorsSurname.surname.message : null}/>
                    </Grid>   
                    <Grid item xs={3} md={4}>
                    <Button type="submit" sx={{fontFamily: "Nunito"}}>Uložit</Button>
                    </Grid>
                  </Grid>
                  </form> 
                </Collapse>

                {/* SEX */}

                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Pohlaví</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Slider disabled track={false} value={sex} marks={marks}/>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeSex ?
                  <CloseIcon onClick={() => setChangeSex(!changeSex)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeSex(!changeSex)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeSex}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                    <Slider track={false} defaultValue={sex} 
                    // @ts-ignore
                    onChange={(e, data) => setNewSex(data)} marks={marks}/>
                    </Grid>   
                    <Grid item xs={3} md={4}>
                    <Button onClick={()=> {
                      setChangeSex(!changeSex); 
                      setSex(newSex);
                      updateDetails({details: {sex: newSex / 100}});
                      }}>Uložit</Button>
                    </Grid>
                  </Grid> 
                </Collapse>

                {/* HEIGHT */}

                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Výška</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{height} cm</Typography>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeHeight ?
                  <CloseIcon onClick={() => setChangeHeight(!changeHeight)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeHeight(!changeHeight)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeHeight}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitHeight(onSubmitHeight)}>
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                    <TextField  
                      label="Nová výška" 
                      variant="standard" 
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                        style: { fontFamily: "Nunito" }
                      }}
                      type="number"
                      {...registerHeight("height", {
                          required: "Položka je povinná",
                          min: {
                            value: 1,
                            message: "Minimální hodnota je 1",
                          },
                        })}
                        error={!!errorsHeight?.height}
                        helperText={errorsHeight?.height ? errorsHeight.height.message : null} />
                    </Grid>   
                    <Grid item xs={3} md={4}>
                    <Button type="submit" sx={{fontFamily: "Nunito"}}>Uložit</Button>
                    </Grid>
                  </Grid> 
                  </form>
                </Collapse>

                {/* WEIGHT */}

                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Hmotnost</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{weight} kg</Typography>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeWeight ?
                  <CloseIcon onClick={() => setChangeWeight(!changeWeight)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeWeight(!changeWeight)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeWeight}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitWeight(onSubmitWeight)}>
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                    <TextField
                          label="Nová hmotnost" 
                          variant="standard" 
                          type= "number"
                          InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                          InputProps={{
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                            style: { fontFamily: "Nunito" }
                          }}
                          {...registerWeight("weight", {
                          required: "Položka je povinná", 
                          min: {
                            value: 1,
                            message: "Minimální hodnota je 1",
                          },
                        })}
                        error={!!errorsWeight?.weight}
                        helperText={errorsWeight?.weight ? errorsWeight.weight.message : null} />
                    </Grid>   
                    <Grid item xs={3} md={4}>
                    <Button type="submit" sx={{fontFamily: "Nunito"}}>Uložit</Button>
                    </Grid>
                  </Grid> 
                  </form>
                </Collapse>

                {/* BIRTHDATE */}

                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Datum narození</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{birthDate?.toLocaleDateString() }</Typography>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeBirthDate ?
                  <CloseIcon onClick={() => setChangeBirthDate(!changeBirthDate)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeBirthDate(!changeBirthDate)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeBirthDate}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                      <DatePicker
                          disableFuture
                          label="Datum narození"
                          InputProps={{ style: { fontFamily: "Nunito" } }}
                          value={newBirthDate}
                          minDate={new Date("1900-01-01")}
                          onChange={(newValue) => {
                            setNewBirthDate(newValue);
                          }}
                          renderInput={(params: any) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                    </Grid>   
                    <Grid item xs={3} md={4}>
                      {newBirthDate?.toString() == "Invalid Date" || newBirthDate == null || newBirthDate < new Date("1900-01-01")
                      ?
                      <Button disabled sx={{fontFamily: "Nunito"}}>Uložit</Button> 
                      : 
                      <Button sx={{fontFamily: "Nunito"}} onClick={() => {
                        setBirthDate(newBirthDate); 
                        setChangeBirthDate(!changeBirthDate);
                        updateDetails({details: {birthdate: newBirthDate}})
                        }}>Uložit</Button>}
                    </Grid>
                  </Grid>
                </Collapse>

                {/* DESIRED WEIGHT */}
                <Grid
                  container
                  direction="row"
                  sx={{ margin: 1 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >

                  <Grid item xs={3} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Cílová hmotnost</Typography>
                  </Grid>   
                  <Grid item xs={6} md={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{goalWeight} kg</Typography>
                  </Grid>   
                  <Grid item xs={3} md={4}>
                  {changeGoalWeight ?
                  <CloseIcon onClick={() => setChangeGoalWeight(!changeGoalWeight)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeGoalWeight(!changeGoalWeight)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeGoalWeight}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitGoalWeight(onSubmitGoalWeight)}>
                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={3} md={4} />
                    
                    <Grid item xs={6} md={4}>
                    <TextField 
                      label="Nová hmotnost" 
                      variant="standard" 
                      type= "number"
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        style: { fontFamily: "Nunito" }
                      }}
                      {...registerGoalWeight("goalWeight", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsGoalWeight?.goalWeight}
                      helperText={errorsGoalWeight?.goalWeight ? errorsGoalWeight.goalWeight.message : null} />
                    </Grid>   
                    <Grid item xs={3} md={4}>
                    <Button type="submit" sx={{fontFamily: "Nunito"}}>Uložit</Button>
                    </Grid>
                  </Grid> 
                  </form>
                </Collapse>

                {/* CUSTOM Goals*/}
                <Grid
                  container
                  direction="row"
                  sx={{ margin: 0 }}
                  // @ts-ignore
                  display={isAdmin && "none"}
                  justifyContent="center"
                >
                  <Grid item >
                  <OrangeButton
                      variant="contained"
                      sx={{display: isAdmin ? "none" : "unset"}}
                      disableRipple
                      onClick={() => {
                        closeAll(); 
                        // @ts-ignore
                        !customGoals && setTimeout(() => { myRef.current.scrollIntoView({behavior: "smooth"}) }, 500);
                        setCustomGoals(!customGoals); 
                        setAll();
                      }}
                    >
                      {customGoals
                        ? "Skrýt nutrienty"
                        : "Upravit nutrienty"}
                    </OrangeButton>
                  </Grid>
                </Grid>

                <Collapse
                        sx={{ width: "100%" }}
                        in={customGoals}
                        {...{ timeout: 500 }}
                        collapsedSize="0px"
                      >
                <form onSubmit={handleSubmitGoals(onSubmitGoals)}>
                <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Kalorie</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      placeholder={goals.calories.toString()} 
                      variant="standard" 
                      type="number"
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      sx= {{width: 70}}
                      {...registerGoals("calories", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsGoals?.calories}
                      helperText={errorsGoals?.calories ? errorsGoals.calories.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Bílkoviny</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      placeholder={goals.proteins.toString()} 
                      hiddenLabel
                      variant="standard"
                      type="number"
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      sx= {{width: 70}}
                      InputProps={{
                        style: { fontFamily: "Nunito" },
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerGoals("proteins", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsGoals?.proteins}
                    helperText={errorsGoals?.proteins ? errorsGoals.proteins.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Sacharidy</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      placeholder={goals.carbs.toString()}
                      variant="standard"  
                      type="number"
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      sx= {{width: 70}}
                      InputProps={{
                        style: { fontFamily: "Nunito" },
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerGoals("carbs", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsGoals?.carbs}
                      helperText={errorsGoals?.carbs ? errorsGoals.carbs.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Tuky</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      placeholder={goals.fats.toString()}
                      variant="standard" 
                      type="number"
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      sx= {{width: 70}}
                      InputProps={{
                        style: { fontFamily: "Nunito" },
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerGoals("fats", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsGoals?.fats}
                      helperText={errorsGoals?.fats ? errorsGoals.fats.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Vláknina</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      placeholder={goals.fiber.toString()}
                      variant="standard" 
                      type="number"
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      sx= {{width: 70}}
                      InputProps={{
                        style: { fontFamily: "Nunito" },
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerGoals("fiber", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsGoals?.fiber}
                      helperText={errorsGoals?.fiber ? errorsGoals.fiber.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Sůl</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      placeholder={goals.salt.toString()}
                      variant="standard" 
                      type="number"
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      sx= {{width: 70}}
                      InputProps={{
                        style: { fontFamily: "Nunito" },
                        endAdornment: <InputAdornment sx={{fontFamily: "Nunito"}} position="start">g</InputAdornment>,
                      }}
                      {...registerGoals("salt", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsGoals?.salt}
                      helperText={errorsGoals?.salt ? errorsGoals.salt.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 
                  <Button sx={{width: 250, fontFamily: "Nunito"}} type="submit">Uložit</Button>
                </form>
                </Collapse>

              {/* CHANGE PASSWORD */}
                <OrangeButton
                  variant="contained"
                  disableRipple
                  onClick={() => {
                    closeAll(); 
                    setChangePasswordModal(!changePasswordModal);
                  }}
                >Změnit heslo</OrangeButton>

                <Modal
                  open={changePasswordModal}
                  onClose={() => setChangePasswordModal(false)}
                >
                  <ChangePasswordModal 
                    changePasswordModal={changePasswordModal} 
                    setChangePasswordModal={setChangePasswordModal} 
                  />
                </Modal>


                <OrangeButton
                  variant="contained"
                  disableRipple
                  sx={{
                    backgroundColor: "red",
                    display: isAdmin ? "none" : "unset",
                    ":hover": {
                      backgroundColor: "darkRed",
                    },
                  }}
                  onClick={() => {
                    closeAll(); 
                    setDeleteAccountModal(!deleteAccountModal);
                  }}
                >
                  Zrušit účet
                </OrangeButton>
                <Modal
                  open={deleteAccountModal}
                  onClose={() => setDeleteAccountModal(false)}
                >
                  <DeleteAccountModal 
                          goHome={goHome} 
                          setGoHome={setGoHome} 
                          setDeleteAccountModal={setDeleteAccountModal}/>
                </Modal>
              </Grid>
              <Grid item xs={0} md={6} sx={{display: {xs:"none", md:"unset"}}}>
                <img src="https://www.budgetbytes.com/wp-content/uploads/2013/07/How-to-Calculate-Recipe-Costs-H.jpg" alt="" />
              </Grid>   
            </Grid>
            <div ref={myRef}></div>
        </Container>
      </Root>
    );
  };