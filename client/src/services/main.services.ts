import axios from "axios";
import bcrypt from "bcryptjs";
import {
    LoginRequest,
    MapLibraries,
    UserSubmit
} from "../Types/Types";

const API_URL = "http://localhost:8080/hostease";
const SALTROUNDS = 10;

export function encryptPassword(passwordToEncrypt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(passwordToEncrypt, SALTROUNDS, (err: Error, hash: string) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

export const logInUser = async (loginData: LoginRequest) => {
  return axios.post(`${API_URL}/user/login`, loginData);
};

export const signUpUser = async (userData: UserSubmit) => {
  return axios.post(`${API_URL}/user/sign`, userData);
};

export const fetchUserEvents = async (userId: number) => {
  return axios.get(`${API_URL}/user/events/${userId}`);  
}

export const mapLibraries: MapLibraries[] = ["places"];
