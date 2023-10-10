import React, { useState } from "react";
import { Link } from "react-router-dom";

function PaymentUnsuccessful() {

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
        <h2 style = {marginStyle}>Payment Unsuccessful</h2>
         <br />
         <br />
        <h3 style = {marginStyle}>Please make sure to input the correct Payment Information</h3>
        
      <div style = {containerStyle}>
     
          <h5 style={marginStyle}>Having trouble making a payment? Feel free to {" "}
          < Link to= "/contact">Contact Us!</Link></h5>
       
      </div>
      </div>
 );
 }

 export default PaymentUnsuccessful;