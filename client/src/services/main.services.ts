import { LoginRequest, UserSignUpData, UserSubmit } from "../Types/Types"
import axios from "axios";

const API_URL = "http://localhost:8080/hostease";

export const logInUser = async ( loginData : LoginRequest ) => {
    return axios.post(`${API_URL}/user/login`, loginData);
}

export const signUpUser = async ( userData : UserSubmit ) => {
    return axios.post(`${API_URL}/user/sign`, userData);
} 

export const fetchAllCategories = async () => {
    return axios.get(`${API_URL}/categories`);
}

export const fetchAllEvents = async () => {
    return axios.get(`${API_URL}/events`);
}