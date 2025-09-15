import API from "@api/API";

const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export default login;
