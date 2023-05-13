import { LoginRequest, UserSignUpData, UserSubmit } from "../Types/Types"
import axios from "axios";

export const logInUser = async ( loginData : LoginRequest ) => {
    return axios.post(`http://localhost:8080/hostease/user/login`, loginData);
}

export const signUpUser = async ( userData : UserSubmit ) => {
    return axios.post(`http://localhost:8080/hostease/user/sign`, userData);
} 