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
export { validateAccessToken };
