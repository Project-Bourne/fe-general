// import { API_USER_URL } from '@env';

/**
 * Object Request Header
 */
let access = "";
if (typeof window !== "undefined") {
  access =
    localStorage.getItem("deep-access") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0OWIyNzc3LWNjZjUtNDhhNy05NmRjLTM0M2VkZWYxYmJlMyIsImlhdCI6MTY5NTY2Mzg4OSwiZXhwIjoxNjk1NzUwMjg5fQ.XYcnAR6NRk7q6NuJ303a04gw5tr1w-VjwzA7v-M3MQk"}
export const requestHeader = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  "deep-token": access,
};

let API_USER_URL = "http://192.81.213.226:81/80/";

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 */

export async function request(url, method, payload, token, text, form) {
  requestHeader["Content-Type"] =
    form === true ? "multipart/form-data" : "application/json";

  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then((res) => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        return err;
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then((res) => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        // throw new Error(err);
        return err;
      });
  }
}
