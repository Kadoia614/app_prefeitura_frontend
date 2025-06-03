import API from "./API";
import { APIBolsistaImage } from "./API";

// bolsistas
export const getBolsista = async (url) => {
  const { data } = await API.get(url ? url : "/ft/bolsista");
  return data;
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

export const getBolsistaEdital = async (id) => {
  const { data } = await API.get(`/ft/bolsista/edital/${id}`);
  return data;
};

// images
export const getDocs = async (id) => {
  return await APIBolsistaImage.get(`/bolsista/${id}`);
};

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

// editais
export const getEdital = async (url) => {
  const response = await API.get(url ? url : "/ft/edital");
  return response.data;
};

export const updateEdital = async (id, data) => {
  return await API.put(`/ft/edital/${id}`, data);
};

export const postEdital = async (data) => {
  return await API.post(`/ft/edital`, data);
};

export const deleteEdital = async (id) => {
  return await API.delete(`/ft/edital/${id}`);
};

export const getEditalWithBolsista = async () => {
  const { data } = await API.get(`/ft/edital/bolsista`);

  return data;
};

export const vincularBolsista = async (id, bolsistas) => {
  console.log([bolsistas])
  const { data } = await API.post(`/ft/edital/vincularbolsista/${id}`, {
    bolsista: bolsistas,
  });

  return data;
};
