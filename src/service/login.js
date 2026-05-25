import API from "@api/API";

const login = async (email, password) => {
  const response = await API.post("/login", {
    email,
    password,
  });
  return response.data;
};

export default login;
