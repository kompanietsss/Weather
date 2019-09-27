import Config from "../config";
import AuthHelper from "./Auth";

function isEmptyObject(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}

let request = async (uri, data, headers, type) => {
  let url = Config.endPoint + uri;

  if (type === "GET" && !isEmptyObject(data)) {
    url += "?_body=" + JSON.stringify(data);
  }

  let baseContentType =
    data instanceof FormData
      ? {
          "Content-Type": "multipart/form-data"
        }
      : {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        };

  let body = data instanceof FormData ? data : JSON.stringify(data);

  headers = Object.assign({}, headers, baseContentType, {
    // "X-CSRF-TOKEN": AuthHelper.token ? `${AuthHelper.token}` : `${data.token}`
    Authorization: AuthHelper.token ? `Bearer ${AuthHelper.token}` : null
    // Authorization: `Bearer ${token}`
  });

  let fetchData =
    type !== "GET"
      ? {
          method: type,
          headers: headers,
          body: body
          // rejectUnauthorized: false
        }
      : {
          method: type,
          headers: headers

          // rejectUnauthorized: false
        };
  // console.log("fetchData", fetchData, url);
  try {
    let response = await fetch(url, fetchData);

    let responseJSON = await response.json();

    if (!responseJSON.error) {
      responseJSON.error = {};
    }

    if (__DEV__) {
      console.log(
        "Request:",
        body,
        "Headers:",
        headers,
        "Response:",
        responseJSON,
        response
        // "TOKEN",
        // AuthHelper.token
      );
    }

    return responseJSON;
  } catch (error) {
    console.error("can't make request", error);
    return { error };
  }
};

export default class Request {
  static post(uri, data, headers = {}) {
    return request(uri, data, headers, "POST");
  }

  static get(uri, data, headers = {}) {
    return request(uri, data, headers, "GET");
  }

  static put(uri, data, headers = {}) {
    return request(uri, data, headers, "PUT");
  }

  static delete(uri, data, headers = {}) {
    return request(uri, data, headers, "DELETE");
  }

  static api(uri = "", data) {
    return Request.post(uri, data);
  }
}
