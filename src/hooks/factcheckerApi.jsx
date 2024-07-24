// import { useRouter } from 'next/router';

/**
 * Object Request Header
 */
import NotificationService from "@/services/notification.service";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
let access = "";

if (typeof window !== "undefined") {
  access = cookies.get("deep-access");
}
export let requestHeader = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  "deep-token": cookies.get("deep-access"),
};

const logout = () => {
  let access = cookies.get("deep-access");
  fetch("http://192.81.213.226:81/80/logout", {
    method: "POST",
    body: {
      refreshToken: access,
    },
  }).then((res) => {
    requestHeader["deep-token"] = "";
    requestHeader["user-id"] = "";
    cookies.remove("deep-access");
    cookies.remove("uuid");
    console.log("Access 3: ", access);
    localStorage.clear();
    window.location.replace("/auth/login");
  });
};

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 *
 */

let API_USER_URL = "http://192.81.213.226:81/84";
export async function factCheckRequest(
  url,
  method,
  payload,
  token,
  text,
  form,
) {
  console.log("Access: ", access);
  console.log("Headers: ", requestHeader);
  requestHeader["Content-Type"] =
    form === true ? "multipart/form-data" : "application/json";

  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: requestHeader,
    })
      .then(async (res) => {
        if (res.status === 403) {
          // Redirect to the login page
          // window.location.href = "/auth/login";
          // throw new Error("Access forbidden. Redirecting to login page.
          logout();
          cookies.remove("deep-access");
          cookies.remove("uuid");
          console.log("Access 2: ", access);
          requestHeader["deep-token"] = "";
          requestHeader["user-id"] = "";
          window.location.replace("/auth/login");
          throw new Error("Access forbidden. Redirecting to login page.");
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        return Promise.reject(err);
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then(async (res) => {
        if (res.status === 403) {
          logout();
          cookies.remove("deep-access");
          cookies.remove("uuid");
          requestHeader["deep-token"] = "";
          requestHeader["user-id"] = "";
          window.location.replace("/auth/login");
          throw new Error("Access forbidden. Redirecting to login page.");
        } else if (text === true) {
          return res.text();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}:`, err);
        return Promise.reject(err);
      });
  }
}
