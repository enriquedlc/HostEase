import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Inputs/PasswordInput/PasswordInput";
import "./SingUp.css";
import { encryptPassword } from "../../services/auth.services";

interface UserSignUpData {
  nickname?: string;
  phone?: number;
  email?: string;
  password?: string;
  confirmPass?: string;
}

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState<UserSignUpData>({
    nickname: "",
    phone: 0,
    email: "",
    password: "",
    confirmPass: "",
  });

  const navigate = useNavigate();

  const spanVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const checkPassStrength = (password: string): JSX.Element => {
    const REGEX =
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$/;
    const MEDIUM_REGEX =
      /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z]).{5,}$/;

    if (REGEX.test(password)) {
      return (
        <div className="strong-password">
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
          />
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
          />
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      );
    } else if (MEDIUM_REGEX.test(password)) {
      return (
        <div className="medium-password">
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
          />
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      );
    } else {
      return (
        <div className="weak-password">
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      );
    }
  };

  const renderPassStrength = (): JSX.Element | null => {
    if (
      userSignUp.password?.trim() !== "" &&
      userSignUp.confirmPass?.trim() !== ""
    ) {
      if (userSignUp.password?.trim() === userSignUp.confirmPass?.trim()) {
        return userSignUp.password ? (
          <div className="password-strength-block">
            <label>Password strength:</label>
            {checkPassStrength(userSignUp.password)}
          </div>
        ) : null;
      } else {
        return (
          <motion.div
            variants={spanVariants}
            className="password-strength-block"
          >
            <motion.label
              variants={spanVariants}
              initial="initial"
              animate="animate"
            >
              Las contraseñas tienen que ser iguales
            </motion.label>
          </motion.div>
        );
      }
    }
    return null;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSignUp({
      ...userSignUp,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userSignUp.password &&
      encryptPassword(userSignUp.password)
        .then((hash) => console.log(hash))
        .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="signupform-block">
        <motion.button
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.4 }}
          className="goBack-button"
          onClick={() => navigate("/login")}
        >
          X
        </motion.button>
        <h1 className="signupform-header">Sign Up</h1>
        <form className="signupform" onSubmit={handleSubmit}>
          <div className="nickname-input">
            <input
              type="text"
              placeholder="Nickname"
              name="nickname"
              autoComplete="off"
              onChange={handleInput}
              required
            />
            <FaUser />
          </div>
          <PasswordInput
            required
            className="password-input"
            placeholder="Password"
            name="password"
            onChange={handleInput}
          />
          <div className="phone-input">
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              autoComplete="off"
              onChange={handleInput}
              required
            />
            <IoMdPhonePortrait />
          </div>
          <PasswordInput
            required
            className="confirm-password-input"
            placeholder="Confirm Password"
            name="confirmPass"
            onChange={handleInput}
          />
          <div className="email-input">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              autoComplete="off"
              onChange={handleInput}
              required
            />
            <MdEmail />
          </div>
          {renderPassStrength()}
          <div className="button-group-signup">
            <button type="submit">Sing Up</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
