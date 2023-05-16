import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import PasswordInput from "../../Components/Inputs/PasswordInput/PasswordInput";
import { HostEaseRoutes } from "../../Types/AppRoutes/HostEaseRoutes";

import UserContext from "../../Context/UserContext";
import { UserSignUpData } from "../../Types/Types";
import "./SingUp.css";
import { toast } from "react-toastify";

const SignUp = () => {
  const userContext = useContext(UserContext);

  const [userSignUp, setUserSignUp] = useState<UserSignUpData>({
    nickname: "",
    phone: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      userSignUp.nickname.trim() !== "" &&
      userSignUp.phone.trim() !== "" &&
      userSignUp.email.trim() !== "" &&
      userSignUp.password.trim() !== "" &&
      userSignUp.confirmPass.trim() !== ""
    ) {
      try {
        const signedUp = await userContext?.signUp(userSignUp);
        if (signedUp) {
          navigate('/dashboard')
        }
      } catch (error: any) {
        console.log("ERROR");
      }
    } else {
      if (!toast.isActive("loginErrorMessage")) {
        toast.error(
          "Necesitas rellenar todos los campos para poder registrarte.",
          {
            toastId: "loginErrorMessage",
            theme: userContext?.theme,
          }
        );
      }
    }
  };

  return (
    <>
      <div className="signupform-block">
        <motion.button
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.4 }}
          className="goBack-button"
          onClick={() => navigate(HostEaseRoutes.Login)}
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
            />
            <FaUser />
          </div>
          <PasswordInput
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
            />
            <IoMdPhonePortrait />
          </div>
          <PasswordInput
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
