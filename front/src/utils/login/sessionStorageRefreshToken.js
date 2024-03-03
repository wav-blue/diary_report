const sessionStorageRefreshToken = () => {
  const refreshToken = sessionStorage.getItem("refreshToken");

  if (!refreshToken) {
    return null;
  }

  return refreshToken;
};

export default sessionStorageRefreshToken;
