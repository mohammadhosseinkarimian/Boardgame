import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";

export default function Signup() {
  const [username, setUname] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  function validateForm() {
    return email.length > 0 &&
     password.length >= 8 && 
     c_password === password;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setUname("test");

  }
  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        <div className="uname">
          <FormGroup controlId="username" bsSize="large">
            <div><ControlLabel>UserName </ControlLabel></div>
            <FormControl
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUname(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="email">
          <FormGroup controlId="email" bsSize="large">
            <div><ControlLabel>Email </ControlLabel></div>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="password">
        <FormGroup controlId="password" bsSize="large">
          <div><ControlLabel>Password <h6 style={{display:"inline",color:"red"}}>(َat last 8 character)</h6>
          </ControlLabel></div>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup></div>
        
        <div className="c_password"><FormGroup controlId="c_password" bsSize="large">
         <div> <ControlLabel>Confirm</ControlLabel></div>
          <FormControl
            value={c_password}
            onChange={(e) => setC_Password(e.target.value)}
            type="password"
          />
        </FormGroup></div>
      <div className="botton">
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          SignUp
        </Button></div>
      </form>
    </div>
  );
}

