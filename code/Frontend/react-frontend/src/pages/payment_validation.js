import React, { useState } from "react";
import '../styles/pages/checkoutFormstyle.css';
import '../styles/pages/overallstyle.css';

function CheckoutForm() {
    return (
        
        <div>
            <p><h1>Checkout</h1></p>
            <p class = "redpoints">Please enter your payment details below:</p>
            <input type = "submit" id = "clickme" value = "Help" />
            <hr />
            <br />
            <form name = "Payment Details"
            method = "post"
            action = ""
            novalidate
            onSubmit={(e) => {
                e.preventDefault();
                if (validateForm()) {
                    console.log("Form is valid. Submitting...");
                }
            }}
            >
            <p class = "teal">Full Name as it appears on your Card:
                <input type = "text" name = "textName" id = "fullName" required /></p>

            <p class = "teal">Enter your Billing Address:</p><br />

            <p class = "teal">Street Address:
            <input type = "text" name = "textName" id = "streetAddress" required /></p>
            
            <p class = "teal">House/Unit/Apartment No:
              <input type = "text" name = "textName" id = "unitNo" required /></p>
         
            <p class = "teal">State:
            <input type = "text" name = "textName" id = "state" required /></p>
        
            <p class = "teal">Zip Code:
            <input type = "text" name = "textName" id = "zipCode" required /></p>
            <br />

            <p class = "teal">Card Number:
              <input type = "text" name = "textName" id = "cardNumber" required /></p>
              

            <p class = "teal">Valid Through (MM/YY):
            <input type = "text" name = "textName" id = "validThru" required /></p>
            
            <p class = "teal">CVC:
            <input type = "text" name = "textName" id = "cvc" required /></p>
            <br />

            <p class = "teal">Please write your experience here: (required)
            <p><textarea rows = "5" cols = "50" name = "taComments" id = "message" required></textarea></p>
            
            <p><input type = "submit" name = "send" value = "Pay" /></p></p>
        </form>
        </div>
    );
}

function validateForm(){

var fullName = document.getElementById("fullName");
if (fullName.value.length < 2){
    alert("Sorry: Full Name should be at least two characters");
    fullName.focus();
    return false;
}

var streetAddress = document.getElementById("streetAddress");
if (streetAddress.value.length < 2){
    alert("Sorry: Street Address should be at least 2 characters");
    streetAddress.focus();
    return false;
}

var state = document.getElementById("state");
if (state.value.length != 2){
    alert("Sorry: State should be only 2 characters, e.g: MA");
    state.focus();
    return false;
}

var zipCode = document.getElementById("zipCode");
if (zipCode.value.length < 4){
    alert("Sorry: Zip Code should be at least 4 characters");
    zipCode.focus();
    return false;
}

var cvc = document.getElementById("cvc");
if (cvc.value.length != 3){
    alert("Sorry: The CVC number should be of 3 digits");
    cvc.focus();
    return false;
}


var message = document.getElementById("message");
if (message.value.length < 30){
    alert("Sorry: Please enter a message of at least 30 characters before you submit");
    message.focus();
    return false;
}


var cardNumberElement = document.getElementById("cardNumber");
var cardNumber = cardNumberElement.value;

if (cardNumber.length < 12 || cardNumber.length > 16){
    alert("Sorry: Card Number should be of 12 to 16 digits");
    cardNumberElement.focus();
    return false;
}

else {
    
    const cardDigits = cardNumber.split('').map(Number);
    cardDigits.reverse();

    for (let i = 1; i < cardDigits.length; i += 2) {
        cardDigits[i] *= 2;

    if (cardDigits[i] >= 10) {
            cardDigits[i] -= 9;
        }
    }

    const valid = cardDigits.reduce((acc, val) => acc + val, 0);
    
    if (valid % 10 == 0) {
        alert("Card number is valid");
        return true;
    } else {
        alert("Invalid card number");
        return false;
        }

    }
}


export default CheckoutForm;