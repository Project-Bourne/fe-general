/**
 * Object Request Header
 */
import { Cookies } from "react-cookie";
const cookies = new Cookies();
let access = "";
if (typeof window !== "undefined") {
  access =
    cookies.get("deep-access") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyMzFiOTVjLWRkOWUtNGNkYS04ZTg3LWFkOGIyZWVjYTg5YSIsImlhdCI6MTY5NzQzODMzOSwiZXhwIjoxNjk3NTI0NzM5fQ.SqMWWSVzMeQ4ipsoa-lyfHZ0dOHlj2LmJi5f8hsnwRA"}

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

let API_USER_URL2 = "http://192.81.213.226:81/84/";

export async function request2(url, method, payload, token, text, form) {
  if (form === true) {
    requestHeader["Content-Type"] = "multipart/form-data";
  } else {
    requestHeader["Content-Type"] = "application/json";
  }

  if (method === "GET") {
    return fetch(API_USER_URL2 + url, {
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
        throw new Error(err);
      });
  } else {
    return fetch(API_USER_URL2 + url, {
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
        throw new Error(err);
      });
  }
}

let API_USER_URL3 = "http://192.81.213.226:81/80/";

export async function request3(url, method, payload, token, text, form) {
  if (form === true) {
    requestHeader["Content-Type"] = "multipart/form-data";
  } else {
    requestHeader["Content-Type"] = "application/json";
  }

  if (method === "GET") {
    return fetch(API_USER_URL3 + url, {
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
        throw new Error(err);
      });
  } else {
    return fetch(API_USER_URL3 + url, {
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
        throw new Error(err);
      });
  }
}

let API_USER_URL4 = "http://192.81.213.226:81/80/";

export async function request4(url, method, payload, token, text, form) {
  if (form === true) {
    requestHeader["Content-Type"] = "multipart/form-data";
  } else {
    requestHeader["Content-Type"] = "application/json";
  }

  if (method === "GET") {
    return fetch(API_USER_URL4 + url, {
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
        throw new Error(err);
      });
  } else {
    return fetch(API_USER_URL4 + url, {
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
        throw new Error(err);
      });
  }
}
