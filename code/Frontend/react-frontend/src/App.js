import React from "react";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages";
import Home from "./pages/home";
import Items from "./pages/AddItem";
import Contact from "./pages/contact";
import RegisterPage from "./pages/RegisterPage";
// import RegisterForm from "./pages/RegisterForm";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="" element={<Home />} />
          <Route path="Items" element={<Items />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<RegisterPage />} />
          {/* <Route path="register" element={<RegisterForm />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
