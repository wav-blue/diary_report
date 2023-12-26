import { validateAccessToken } from "../utils/validateAccessToken";
import { NotFoundError, TokenExpiredError } from "../../libraries/custom-error";

async function loginRequired(req, res, next) {
  try {
    const accessToken = req.signedCookies.accessToken ?? null;
    if (!accessToken) {
      throw new NotFoundError("Access token이 존재하지 않음");
    }
    console.log("accessToken: ", accessToken);

    // token 유효기간 검증
    const isAccessTokenValidate = await validateAccessToken(accessToken);

    // Access Token 만료 => 재발급 요청
    if (!isAccessTokenValidate) {
      throw new TokenExpiredError("Access Token 만료");
    }
    // user_id 추출
    const user_id = validateAccessToken(accessToken).user_id;
    req.currentUserId = user_id;
    next();
  } catch (err) {
    next(err);
  }
}

export { loginRequired };
