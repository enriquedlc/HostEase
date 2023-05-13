import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";

const MainPage = () => {
    const userContext = useContext(UserContext);
    console.log("PÁGINA PRINCIPAL" , userContext?.user);

    return <div>PÁGINA PRINCIPAL GUAPETON</div>;
};

export default MainPage;
