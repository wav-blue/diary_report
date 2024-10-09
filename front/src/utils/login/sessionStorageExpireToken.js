function sessionStorageExpireToken() {
  sessionStorage.removeItem("accessToken");
}

export default sessionStorageExpireToken;
