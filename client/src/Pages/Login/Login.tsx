import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import "./AuthForm.css";

interface AuthFormProps {
  type: "logIn" | "signUp";
}

interface UserDataForm {
  email: string;
  pass: string;
}

const Login = (props: AuthFormProps) => {

  const [userData, setUserData] = useState<UserDataForm>({
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
    <section className="authform-section">
      <div className="authform-block">
        <div className="authform-header">
          <h1>HostEase</h1>
          <h2>Host it Easier!</h2>
        </div>
        <form className="authform">
          <h1>Sign In</h1>
          <div className="authform-input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
            <MdEmail />
          </div>
          <div className="authform-input">
            <input
              type="password"
              name="pass"
              placeholder="Password"
              onChange={handleInput}
            />
            <HiLockClosed />
          </div>
          <div className="authform-button-panel">
            <button>Sign Up</button>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
