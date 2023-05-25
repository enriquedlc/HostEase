import axios, { AxiosAdapter, AxiosResponse } from "axios";
import bcrypt from "bcryptjs";
import {
  HostEaseEventForm,
  LoginRequest,
  MapLibraries,
  UserSubmit,
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

export const createEvent = async (
  eventData: HostEaseEventForm,
  ownerId: number
) => {
  return axios.post(
    `${API_URL}/event/${eventData.category?.id}?owner=${ownerId}`,
    eventData
  );
};

export const fetchUserEvents = async (userId: number) => {
  return axios.get(`${API_URL}/user/${userId}/events`);
};

export const deleteEvent = async (eventId: number) => {
  return axios.delete(`${API_URL}/event/${eventId}`);
};

export const userOnEvent = async (eventId: number, userId: number) => {
  return axios.post(`${API_URL}/user/${userId}?eventId=${eventId}`);
};

export const sendMessage = (
  eventId: number,
  userId: number,
  message: string
) => {
  return axios.post(`${API_URL}/events/${eventId}/messages?userId=${userId}`, {
    message: message,
  });
};

export const likeInteraction = async (userId: number, eventId: number) => {
  return axios.post(
    `${API_URL}/event/like?eventId=${eventId}&userId=${userId}`
  );
};

export const followInteraction = async (followerUserId: number, toFollowUserId: number) => {
  return axios.post(`${API_URL}/users/follow?followerUserId=${followerUserId}&followedUserId=${toFollowUserId}`)
}

export const fetchInfoFromEvent = async (eventId: number, userId: number) => {
  return axios.get(`${API_URL}/event/${eventId}?userId=${userId}`);
};

export const fetchMessages = async (eventId: number) => {
  return axios.get(`${API_URL}/events/${eventId}/messages`);
};

export const fetchAllEvents = async () => {
  return axios.get(`${API_URL}/events`);
};

export const fetchAllCategories = async () => {
  return axios.get(`${API_URL}/categories`);
};

export const fetchAllTags = async () => {
  return axios.get(`${API_URL}/tags`);
};

export const fetchUser = async (userId: number) => {
  return axios.get(`${API_URL}/users/${userId}`);
}

export const fetchFollowers = async (userId: number) => {
  return axios.get(`${API_URL}/users/followers/${userId}`)
}

export const mapLibraries: MapLibraries[] = ["places"];
