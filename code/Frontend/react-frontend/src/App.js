import React from "react";
import { HashRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Index from "./pages";
import Home from "./pages/home";
import Items from "./pages/AddItem";
import Contact from "./pages/contact";
import { useUser } from "./Components/UserContext";
import CheckoutValidation from "./pages/payment_validation";
import ItemSearchAndFilter from "./pages/search";
import Reservations from "./pages/MakeReservation";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import View from "./pages/ViewItem";
import Profile from "./pages/profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserProfile from "./Components/UserProfile";
import { Navigate } from "react-router-dom";

function App() {
  const { username, userType } = useUser();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="" element={<Home />} />
          <Route path="contact" element={<Contact />} />

          <Route
            path="Items"
            element={
              <ProtectedRoute>
                {userType === "host" ? <Items /> : <Navigate to="/" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="CheckoutValidation"
            element={
              <ProtectedRoute>
                <CheckoutValidation />
              </ProtectedRoute>
            }
          />
          <Route
            path="search"
            element={
              <ProtectedRoute>
                <ItemSearchAndFilter />
              </ProtectedRoute>
            }
          />
          <Route
            path="View"
            element={
              <ProtectedRoute>
                <View />
              </ProtectedRoute>
            }
          />
          <Route
            path="reservations"
            element={
              <ProtectedRoute>
                {userType === "renter" ? <Reservations /> : <Navigate to="/" />}
              </ProtectedRoute>
            }
          />

          <Route path="AllProfile" element={<Profile />} />
          <Route
            path="AllProfile/user/:usernameSelected"
            element={<UserProfile />}
          />

          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
