import { LoginRequest, MapLibraries, UserSignUpData, UserSubmit } from "../Types/Types"
import axios from "axios";

const API_URL = 'http://localhost:8080/hostease';

export const logInUser = async ( loginData : LoginRequest ) => {
    return axios.post(`${API_URL}/user/login`, loginData);
}

export const signUpUser = async ( userData : UserSubmit ) => {
    return axios.post(`${API_URL}/user/sign`, userData);
} 

export const mapLibraries: MapLibraries[] = ["places"];