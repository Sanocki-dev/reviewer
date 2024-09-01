import axios from "axios";
import { tokenLoader } from "./auth";

const BASE = import.meta.env.VITE_SITE_URL;
// "http://localhost:3001/";

export const GetPatch = (url, body, headers) => {
  return axios.patch(
    BASE + url,
    { ...body },
    { headers: { Authorization: tokenLoader(), ...headers } }
  );
};

export const GetFetch = (url, headers) => {
  return axios.get(BASE + url, {
    headers: { Authorization: tokenLoader(), ...headers },
  });
};

export const GetPost = (url, body, headers) => {
  return axios.post(
    BASE + url,
    { ...body },
    { headers: { Authorization: tokenLoader(), ...headers } }
  );
};

export const GetDelete = (url, headers) => {
  return axios.delete(BASE + url, {
    headers: { Authorization: tokenLoader(), ...headers },
  });
};
