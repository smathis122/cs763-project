import React, { useState } from 'react';
import "../styles/Components/popup.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UserTypePopUp(props) {
    const [type, setType] = useState("renter")
    const navigate = useNavigate();

    const onOptionChange = (event) => {
        setType(event.target.value)
    }

    const updateUser = async () => {
        const res = await fetch('http://127.0.0.1:5000/api/update-google', {
            method: 'POST',
            body: JSON.stringify({
                email: props.email,
                type: type,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok)
            navigate("/");
    }

    return (
        <div className="UserTypePopUp">
            <Modal show={props.trigger}>
                <div className="popup-inner">
                    <h3>Will you be renting or Hosting?</h3>
                    <p>You can choose from the following options</p>
                    <div className="radio-button-group">
                        <input
                            type="radio"
                            name="type"
                            value="renter"
                            id="renter"
                            checked={type === "renter"}
                            onChange={onOptionChange}
                        />
                        <label htmlFor="regular">Renter</label>
                        <br />
                        <input
                            type="radio"
                            name="type"
                            value="host"
                            id="host"
                            checked={type === "host"}
                            onChange={onOptionChange}
                        />
                        <label htmlFor="host">Host</label>
                        <br />
                        <input
                            type="radio"
                            name="type"
                            value="both"
                            id="both"
                            checked={type === "both"}
                            onChange={onOptionChange}
                        />
                        <label htmlFor="both">Both</label>
                        <br />
                    </div>
                    <Button classname="closeButton" onClick={updateUser}>Submit</Button>
                </div>
            </Modal>
        </div>
    );
}

export default UserTypePopUp;
