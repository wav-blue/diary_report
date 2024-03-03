function sessionStorageExpireToken() {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
}

export default sessionStorageExpireToken;
