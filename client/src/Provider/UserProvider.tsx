import React, { ReactNode, useState } from "react";
import { User, Theme, UserSignUpData, LoginRequest } from "../Types/Types";
import { encryptPassword } from "../services/auth.services";
import UserContext from "../Context/UserContext";
import { logInUser, signUpUser } from "../services/main.services";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const [user, setUser] = useState<User | null>(null);
 
  const logIn = async (loginParams: LoginRequest) => {
    try {
      const response = await logInUser(loginParams);
      if (response.data.status === "200 OK") {
        setUser(response.data.data);
        return true;
      } else {
        if (!toast.isActive("loginErrorMessage")) {
          toast.error("Se ha producido un error al iniciar sesión.", {
            toastId: "loginErrorMessage",
            theme: theme,
          });
        }
        return false;
      }
    } catch (err) {
      if (!toast.isActive("loginErrorMessage")) {
        toast.error("Los datos introducidos no son correctos.", {
          toastId: "loginErrorMessage",
          theme: theme,
        });
      }
      return false;
    }
  };

  const logOut = () => {
    setUser(null);
  };

  const signUp = async (userData: UserSignUpData): Promise<boolean> => {
    try {
      const encryptedPassword = await encryptPassword(userData.password);
      const response = await signUpUser({
        ...userData,
        password: encryptedPassword,
      });
      if (response.data.status === "201 Created") {
        setUser(response.data.data);
        return true;
      } 
      return false;
    } catch (err) {
      if (!toast.isActive("loginErrorMessage")) {
        toast.error(
          "El correo seleccionado ya está siendo usado por otro usuario.",
          {
            toastId: "loginErrorMessage",
            theme: theme,
          }
        );
      }
      return false;
    }
  };

  const fetchUserEvents = async () => {};

  return (
    <UserContext.Provider
      value={{ user, theme, setTheme, logIn, logOut, signUp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
