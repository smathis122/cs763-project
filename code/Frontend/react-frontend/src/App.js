import React from "react";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages";
import Home from "./pages/home";
import Items from "./pages/AddItem";
import Contact from "./pages/contact";
import CheckoutHelp from "./pages/form_helpbutton";
import CheckoutValidation from "./pages/payment_validation";
// import PaymentSuccessful from "./pages/payment_successful";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="" element={<Home />} />
          <Route path="Items" element={<Items />} />
          <Route path="contact" element={<Contact />} />
          <Route path="CheckoutHelp" element={<CheckoutHelp />} />
          <Route path="CheckoutValidation" element={<CheckoutValidation />} />
          {/* <Route path="PaymentSuccessful" element={<PaymentSuccessful />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
