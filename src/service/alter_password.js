import API from "../api/API";

export const alterPassword = async (new_password, password) => {
  const payload = { new_password, password };
  const { data } = await API.put(`/auth/alterpwd`, { ...payload });

  return data;
};
