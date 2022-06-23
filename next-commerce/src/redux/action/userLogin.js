import jsCookie from "js-cookie";
import { axiosInstance } from "../../lib/api";
import auth_types from "../reducers/types/auth";
export function userLogin(values, setSubmitting) {
  return async function (dispatch) {
    try {
      const res = await axiosInstance.get("/users", {
        params: {
          email: values.email,
          // password: values.password,
        },
      });

      if (!res.data.length) {
        throw new Error("User not found");
      }

      if (res.data[0].password !== values.password) {
        throw new Error("Wrong password");
      }

      const userData = res.data[0];
      const stringifiedUserData = JSON.stringify(userData);

      console.log(userData);

      jsCookie.set("user_data", stringifiedUserData);
      dispatch({
        type: auth_types.AUTH_LOGIN,
        payload: userData,
      });

      setSubmitting(false);
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }
  };
}
