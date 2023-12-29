import jwt from "jsonwebtoken";

async function validateAccessToken(accessToken) {
  const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
  try {
    const payload = await jwt.verify(accessToken.split(" ")[1], secretKey);
    console.log("payload", payload);
    return payload;
  } catch (error) {
    console.log("error", error);
    return false;
  }
}
// Refresh Token을 검증
function validateRefreshToken(refreshToken) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    jwt.verify(refreshToken, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}

export { validateAccessToken, validateRefreshToken };
