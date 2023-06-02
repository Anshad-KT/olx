import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import { signInWithEmailAndPassword } from "firebase/auth";

import "./Login.css";

function Login(): JSX.Element {
  const navigate = useNavigate();
  
  const { db, auth } = useContext(FirebaseContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        console.log(userData.user.uid);
        navigate("/");
      })
      .catch((err) => {
        if ("auth/invalid-email" === err.code) {
          console.log("error");
        }
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            name="email"
            defaultValue="John"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            name="password"
            defaultValue="Doe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
