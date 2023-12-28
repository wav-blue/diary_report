export function loginReducer(userState, action) {
  console.log("loginReducer userState>> ", userState);
  console.log("loginReducer action.payload>> ", action.payload);
  switch (action.type) {
    case "LOGIN":
      console.log("%c로그인!", "color: #d93d1a;");
      return {
        ...userState,
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
      };
    case "LOGOUT":
      console.log("%c로그아웃!", "color: #d93d1a;");
      console.log("리듀서 >> ", {
        ...userState,
        user_id: null,
        user_name: null,
      });
      return {
        ...userState,
        user_id: null,
        user_name: null,
      };
    default:
      return userState;
  }
}
