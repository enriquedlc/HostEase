import axios from "axios";
import bcrypt from "bcryptjs";
import { HostEaseEventForm, LoginRequest, MapLibraries, UserSubmit } from "../Types/Types";

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

export const createEvent = async (eventData: HostEaseEventForm, ownerId: number) => {
  return axios.post(`${API_URL}/event/${eventData.category?.id}?owner=${ownerId}`, eventData);
}

export const fetchUserEvents = async (userId: number) => {
  return axios.get(`${API_URL}/user/${userId}/events`)
};

export const deleteEvent = async (eventId: number) => {
  return axios.delete(`${API_URL}/event/${eventId}`)
}

export const removeUserFromEvent = async (eventId: number) => {
  return axios.delete(`${API_URL}/user?eventId=${eventId}`)
}

export const fetchAllUsers = async () => {
  return axios.get(`${API_URL}/users`)
};

export const fetchAllEvents = async () => {
  return axios.get(`${API_URL}/events`);
}

export const fetchAllCategories = async () => {
  return axios.get(`${API_URL}/categories`);
};

export const fetchAllTags = async () => {
  return axios.get(`${API_URL}/tags`);
};

export const fetchAllMessages = async () => {
  return axios.get(`${API_URL}/messages`);
};

export const mapLibraries: MapLibraries[] = ["places"];
