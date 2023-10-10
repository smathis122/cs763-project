import React, { useState } from "react";
import { Link } from "react-router-dom";

function PaymentSuccessful() {

    const marginStyle = {
        marginLeft: "20px",
      };


      const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", 
        alignItems: "center", 
        minHeight: "60vh", 
      };

         return (
    <div>
        <br />
        <br />
        <h2 style = {marginStyle}>Payment Successfully Processed</h2>
         <br />
         <br />
        <h3 style = {marginStyle}>Thank you for renting with GearOnTheGo!</h3>
        <h3 style = {marginStyle}>A copy of your purchase has been sent to your email</h3>
        
      <div style = {containerStyle}>
           <h5 style = {marginStyle}>Have any questions? Feel free to {" "}
          < Link to= "/contact">Contact Us!</Link></h5>
      </div>
      </div>
 );
 }

 export default PaymentSuccessful;