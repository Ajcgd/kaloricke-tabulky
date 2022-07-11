import {
    Box,
    Button,
    Grid,
    Typography,
  } from "@mui/material";
  import { styled } from "@mui/system";
  import { useContext, useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import AuthContext from "../../context/AuthProvider";
  import './NotFound.css'
  import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { max } from "date-fns";

  const Root = styled("div")({
    display: "flex",
    justifyContent: "center",
  });
  
  const Container = styled("div")({
    textAlign: "center",
    height: "min-content"
  });

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

  
  
  
  const NotFound = () => {
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
  
    const [authState, setAuthState] = useState<Boolean>();
      // @ts-ignore
    const { auth, setAuth } = useContext(AuthContext);
    useEffect(() => {
      setAuthState(!(Object.keys(auth).length === 0 || auth === undefined));
    }, [auth]);
  
    return (
      <Root id="header" sx={{
        minHeight: `${100 - appBarSize}vh`
        }}>          
          <ThemeProvider theme={theme}>
            <Container 
              sx={{
                  backgroundColor: "white",
                  marginTop: {xs: 0, md: 10},
                  marginBottom: {xs: 5, md: 10},
                  borderRadius: {xs: 0, md: 10},
                  width: {xs: "100vw", md: "91.7vw"},
                  overflow: 'auto',
                }}
            >
              <Grid
                      container
                      justifyContent={{ xs: "center", md: "space-between" }}
                      direction={{ xs: "column", md: "column", lg: "row" }}
                      alignItems={{ xs: "center", md: "normal" }}
                      paddingY={{xs:5}}
                  >
                  <Grid item xs={6}>
                      <Grid 
                          container
                          justifyContent={"space-evenly"}
                          direction={"column"}
                          alignItems={"center"}
                          sx={{height: "100%"}}
                          >
                          <Grid item>
                              <Typography
                              component="h2"
                              variant="h2"
                              sx={{
                                  fontFamily: "Nunito",
                              }}
                              textAlign={"center"}
                              >
                                  Nic takového jsme nenašli...
                              </Typography>
                          </Grid>
                          <Grid item>
                              <Typography
                              variant="h4"
                              component="h3"
                              sx={{
                                  fontFamily: "Nunito",
                                  marginTop: 3 
                              }}
                              textAlign="center">
                                  Jste si jistí, že hledáte něco, <br />
                                  co by tu mělo být?
                              </Typography>
                          </Grid>
                          <Grid item>
                              <Box textAlign={"center"}>
                                  <Link to="/" style={{ textDecoration: "none" }}>
                                  <Button
                                      variant="contained"
                                      disableRipple
                                      sx={{
                                          backgroundColor: "orange",
                                          marginY: 3,
                                          fontWeight: "bold",
                                          transition: "transform 0.5s",
                                          ":hover": {
                                              transform: "scale(1.1)",
                                              backgroundColor: "#f29830",
                                          },
                                      }}
                                  >
                                      Zpět na hlavní stránku
                                  </Button>
                                  </Link>
                              </Box>
                          </Grid>
                      </Grid>
                  </Grid>  
                  <Grid item xs={6}>
                      <img className="fridge" src="https://img.freepik.com/free-vector/opened-wider-empty-refrigerator_1284-23309.jpg?w=2000" alt=""/>
                  </Grid>
              </Grid>
            </Container>
          </ThemeProvider>
      </Root>
    );
  };
  
  export default NotFound;
  