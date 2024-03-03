const sessionStorageAccessToken = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    return null;
  }

  return accessToken;
};

export default sessionStorageAccessToken;
