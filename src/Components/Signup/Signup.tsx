import React, { ChangeEvent, FormEvent, useState, useContext, } from "react";
import { useNavigate } from 'react-router-dom'
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  addDoc,
  collection,
  
} from "firebase/firestore";

export default function Signup(): JSX.Element {
  const {db,auth} = useContext(FirebaseContext)

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            console.log("success");

            // Add user data to Firestore
           

            addDoc(collection(db,"users"), {
              id: user.uid,
              username: username,
              email:email,
              password:password,
              phone:phone

            })
              .then((docRef) => {
                console.log("User added to Firestore:", docRef.id);
                navigate('/login')
                
              })
              .catch((error) => {
                console.log("Error adding user to Firestore:", error);
              });
          })
          .catch((error) => {
            console.log("Error updating profile:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error creating user:", error);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="#">Login</a>
      </div>
    </div>
  );
}
