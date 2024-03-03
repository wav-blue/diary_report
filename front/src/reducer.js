export function loginReducer(userState, action) {
  switch (action.type) {
    case "LOGIN":
      console.log("%c로그인!", "color: #d93d1a;");
      return {
        ...userState,
        userId: action.payload.userId,
        userName: action.payload.userName,
      };
    case "LOGOUT":
      console.log("%c로그아웃!", "color: #d93d1a;");

      return {
        ...userState,
        userId: null,
        userName: null,
      };
    default:
      return userState;
  }
}
