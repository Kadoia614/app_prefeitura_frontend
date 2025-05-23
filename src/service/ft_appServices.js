import API from "./API";
import { APIBolsistaImage } from "./API";

// bolsistas
export const getBolsista = async (url) => {
  const response = await API.get(url ? url : "/ft/bolsista");
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

// images
export const getDocs = async (id) => {
  return await APIBolsistaImage.get(`/bolsista/${id}`);
};

// images
export const getOneDoc = async (image) => {
  return await APIBolsistaImage.get(`/${image}`, {
    responseType: "blob",
  });
};

export const postDoc = async (id, data) => {
  return await APIBolsistaImage.post(`/bolsista/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },  
  });
};
