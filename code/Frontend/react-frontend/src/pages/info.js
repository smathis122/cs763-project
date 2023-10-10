import React from "react";
import Header from '../Components/Header';
import AboutUs from '../Components/AboutUs';
import { NavbarCustom } from "../Components/Navbar";

function Info() {
    return (
        <div className="info">
            <NavbarCustom />
            <Header />
            <AboutUs />
        </div>
    );
}

export default Info;

