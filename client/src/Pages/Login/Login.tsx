import React, { useState, useContext } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate, useOutletContext } from "react-router-dom";
import PasswordInput from "../../Components/Inputs/PasswordInput/PasswordInput";
import { HostEaseRoutes } from "../../Types/AppRoutes/HostEaseRoutes";
import "./Login.css";
import UserContext from "../../Context/UserContext";
import { LoginRequest, UserContextValue } from "../../Types/Types";
import { toast } from "react-toastify";

const Login = () => {
  const userContext = useOutletContext<UserContextValue | null>();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.email.trim() !== "" && userData.password !== "") {
      try {
        const link = await userContext?.logIn(userData);
        navigate(`${link && link}`);
      } catch (error) {}
    }
  };

  return (
    <>
      <div className="loginform-block">
        <div className="loginform-header">
          <h1>HostEase</h1>
          <h2>Host it Easier!</h2>
        </div>
        <form className="loginform" onSubmit={handleLogin}>
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
          <PasswordInput
            className="loginform-input"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <div className="loginform-button-panel">
            <button type="button" onClick={() => navigate(HostEaseRoutes.Sign)}>
              Sign Up
            </button>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
