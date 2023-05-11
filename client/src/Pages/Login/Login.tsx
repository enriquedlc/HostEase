import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Inputs/PasswordInput/PasswordInput";

interface UserLoginData {
  email: string;
  pass: string;
}

const Login = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserLoginData>({
    email: "",
    pass: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="loginform-block">
        <div className="loginform-header">
          <h1>HostEase</h1>
          <h2>Host it Easier!</h2>
        </div>
        <form className="loginform">
          <h1>Sign In</h1>
          <div className="loginform-input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              onChange={handleInput}
            />
            <MdEmail />
          </div>
          <PasswordInput className="loginform-input" name="pass" placeholder="Password" onChange={handleInput}/>
          <div className="loginform-button-panel">
            <button onClick={() => navigate('/sign')}>Sign Up</button>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
