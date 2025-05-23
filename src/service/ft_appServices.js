import API from "./API";

export const getBolsista = async (url) => {
  const response = await API.get( url? url : "/ft/bolsista");
  return response.data;
};

export const updateBolsista = async (id, data) => {
  return await API.put(`/ft/bolsista/${id}`, { ...data });
};

export const postBolsista = async (data) => {
  return await API.post(`/ft/bolsista`, { ...data });
};

export const deleteBolsista = async (id) => {
  return await API.delete(`/ft/bolsista/${id}`);
};

