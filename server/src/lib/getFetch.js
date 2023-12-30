import axios from "axios";

export function getFetch({ url, params = {}, method = "GET", headers }) {
  const headerOptions = {
    accept: "appication/json",
    ...headers,
  };

  return axios
    .request({
      url,
      method,
      params,
      headers: headerOptions,
      timeout: 5000,
    })
    .then((res) => res.data);
}
