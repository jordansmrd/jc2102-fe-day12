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

      console.log(res.data.result);

      const userData = {
        id: 2,
        username: "steven",
        email: "steven@mail.com",
        password: "pass123",
        full_name: "udin sukamandi",
      };

      // const userData = res.data.result;

      if (!res.data.result) {
        throw new Error("User not found");
      }

      if (userData.password !== values.password) {
        throw new Error("Wrong password");
      }

      // const userData = user;
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
