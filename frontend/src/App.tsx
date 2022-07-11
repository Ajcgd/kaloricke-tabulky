import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginRegister/LoginPage";
import RegisterPage from "./components/LoginRegister/RegisterPage";
import HomePage from "./components/HomePage/HomePage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import UserDetailsPage from "./components/UserDetails/UserDetailsPage";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import FoodDetailsPage from "./components/FoodDetailsPage/FoodDetailsPage";
import AdminHomepage from "./components/AddFood/AdminHomepage";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin-home" element={<AdminHomepage />} />
          <Route path="/details/:id" element={<FoodDetailsPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
