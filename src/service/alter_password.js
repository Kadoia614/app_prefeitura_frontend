import API from "../api/API";

export const alterPassword = async (new_password, old_password) => {
  const payload = { new_password, old_password };
  const { data } = await API.put(`/user/alter_password`, { ...payload });

  return data;
};
