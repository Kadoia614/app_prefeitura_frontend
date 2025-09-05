import API from "@api/API";
import { APIBolsistaImage } from "@api/API";

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

// export const deleteBolsista = async (id) => {
//   return await API.delete(`/ft/bolsista/${id}`);
// };

export const getBolsistaEdital = async (id) => {
  const { data } = await API.get(`/ft/bolsista/edital/${id}`);
  return data;
};

export const toggleBolsista = async (bolsista, edital) => {
  const { data } = await API.put(`/ft/bolsista/${bolsista}/edital/${edital}`);
  return data;
};

// images
export const getDocs = async (id) => {
  return await APIBolsistaImage.get(`/img/bolsista/${id}`);
};

export const getOneDoc = async (image) => {
  return await APIBolsistaImage.get(`/img/${image}`, {
    responseType: "blob",
  });
};

export const postDoc = async (id, data) => {
  return await APIBolsistaImage.post(`/img/bolsista/${id}`, data, {
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

export const getEditalWithBolsista = async (id) => {
  const { data } = await API.get(`/ft/edital/${id}/bolsista`);

  return data;
};

export const getAllEditalWithBolsista = async () => {
  const { data } = await API.get(`/ft/edital/bolsista`);

  return data;
};

export const vincularBolsista = async (id, bolsistas, data_vinculo) => {
  console.log([bolsistas]);
  const { data } = await API.post(`/ft/edital/vincularbolsista/${id}`, {
    bolsista: bolsistas,
    data_vinculo,
  });

  return data;
};

// RELATORIO
export const getRelatory = async (id) => {
  const { data } = await APIBolsistaImage.get(`/relatory/${id}`, {
    responseType: "blob",
  });

  return data;
};
