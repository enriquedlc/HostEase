import { useLoadScript } from "@react-google-maps/api";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../Context/UserContext";
import { HostEaseRoutes } from "../Types/AppRoutes/HostEaseRoutes";
import { LoginRequest, Theme, User, UserSignUpData } from "../Types/Types";
import { encryptPassword, fetchUserEvents, logInUser, mapLibraries, signUpUser } from "../services/main.services";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const [user, setUser] = useState<User | null>(null);


  const logIn = async (loginParams: LoginRequest) => {
    try {
      const response = await logInUser(loginParams);
      if (response.data.status === "200 OK") {
        setUser(response.data.data);
        const link = response.data.data.role === "USER" ? HostEaseRoutes.MainPage : HostEaseRoutes.Admin;
        return link;
      } else {
        console.log(response.data)
        if (!toast.isActive("loginErrorMessage")) {
          toast.error("Se ha producido un error al iniciar sesión.", {
            toastId: "loginErrorMessage",
            theme: theme,
          });
        }
        return null;
      }
    } catch (err) {
      if (!toast.isActive("loginErrorMessage")) {
        toast.error("Los datos introducidos no son correctos.", {
          toastId: "loginErrorMessage",
          theme: theme,
        });
      }
      return null;
    }
  };

  const getUserEvents = async () => {
    try {
      if (user?.id) {
        await fetchUserEvents(user?.id).then((response) => {
          setUser({ ...user, events: response.data.data })
        })
      }
    } catch (err: any) {
      if (!toast.isActive("mainPageErrorMessage")) {
        toast.error("No se han podido cargar los eventos del usuario en cuestión.", {
          toastId: "mainPageErrorMessage",
          theme: theme,
        });
      }
    }
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB09X3RuC3qKVhtqxqw4QAZudU3h0GIZEM",
    libraries: mapLibraries,
  });

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

  return (
    <UserContext.Provider
      value={{ user, setUser, getUserEvents, theme, setTheme, logIn, logOut, signUp, isLoaded }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
