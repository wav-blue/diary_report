import axios from "axios";

const backendPortNumber = "5001";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

// GET 요청
async function get(endpoint) {
  console.log(`%cGET 요청 ${serverUrl + endpoint}`, "color: #a25cd1;");

  return axios.get(serverUrl + endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function post(endpoint, bodyData, isLogin, content_type) {
  console.log(`%cPOST 요청 ${serverUrl + endpoint}`, "color: #a25cd1;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  //"application/x-www-form-urlencoded"
  //"application/json"
  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": `${content_type}`,
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function softDelete(endpoint) {
  console.log(`%cDELETE 요청 ${serverUrl + endpoint}`, "color: #a25cd1;");

  return axios.delete(serverUrl + endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}
export { get, post, softDelete };
