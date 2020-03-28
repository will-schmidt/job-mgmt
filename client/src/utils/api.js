import axios from "axios";
import {setUserSession, getToken} from "./authentication";

const baseURL = "http://localhost:5000";

export const login = async user => {
  try {
    const {data, status} = await axios.post(`${baseURL}/users/signin`, user);
    if (status === 200) {
      setUserSession(data.token, data.user);
      return {
        ok: true
      };
    }

    return {
      ok: false,
      error: "There was a problem"
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message
    };
  }
};

export const api = async (path, type = "get") => {
  const res = await axios[type](`${baseURL}${path}`, {
    headers: {"X-token": getToken()}
  });

  return res;
};
