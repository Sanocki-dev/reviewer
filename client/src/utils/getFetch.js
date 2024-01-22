import axios from "axios";
import { tokenLoader } from "./auth";

const BASE = import.meta.env.VITE_SITE_URL;
//"http://localhost:8888/"

export const GetPatch = async (url, body, headers) => {
  return axios.patch(
    BASE + url,
    { ...body },
    { headers: { Authorization: tokenLoader(), ...headers } }
  );
};

export const GetFetch = async (url, headers) => {
  return axios.get(BASE + url, {
    headers: { Authorization: tokenLoader(), ...headers },
  });
};

export const GetPost = async (url, body, headers) => {
  return axios.post(
    BASE + url,
    { ...body },
    { headers: { Authorization: tokenLoader(), ...headers } }
  );
};

export const GetDelete = async (url, headers) => {
  return axios.delete(BASE + url, {
    headers: { Authorization: tokenLoader(), ...headers },
  });
};
