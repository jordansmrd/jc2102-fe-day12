const init_state = {
  id: "",
  username: "",
  email: "",
  full_name: "",
};
import auth_types from "./types/auth";
function auth_reducer(state = init_state, action) {
  if (action.type === auth_types.AUTH_LOGIN) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      email: action.payload.email,
      full_name: action.payload.full_name,
    };
  } else if (action.type === auth_types.AUTH_LOGOUT) {
    return init_state;
  }

  return state;
}

export default auth_reducer;
