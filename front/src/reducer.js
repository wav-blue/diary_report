export function loginReducer(userState, action) {
  console.log("loginReducer userState>> ", userState);
  console.log("loginReducer action.payload>> ", action.payload);
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
      console.log("리듀서 >> ", {
        ...userState,
        userId: null,
        userName: null,
      });
      return {
        ...userState,
        userId: null,
        userName: null,
      };
    default:
      return userState;
  }
}
