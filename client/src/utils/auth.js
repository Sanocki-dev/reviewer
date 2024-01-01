import { redirect } from "react-router-dom";
import Cookies from "universal-cookie";

export function getAuthToken() {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }
  
  return null
}
