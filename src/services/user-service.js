import { myAxios } from "./helper";

export const register = (user) => {
  return myAxios.post("/register", user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios
    .post("/login", loginDetail)
    .then((response) => {
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Invalid response from server");
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      throw error; // Rethrow the error to handle it in the component
    });
};
