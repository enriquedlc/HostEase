import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import "./MainPage.css"

const MainPage = () => {
    const userContext = useContext(UserContext);
    console.log("PÁGINA PRINCIPAL" , userContext?.user);

    return <div className="dashboard-site-page"></div>;
};

export default MainPage;
