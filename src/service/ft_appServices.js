import API from "@api/API";
import { APIBolsistaImage } from "@api/API";

const baseURL = "/frente-de-trabalho";

// bolsistas
export const getBolsista = async (query) => {
  const { page, limit, search } = query;
  const url = search
    ? `${baseURL}/bolsista?page=${page || 0}&limit=${limit || 10}&search=${search}`
    : `${baseURL}/bolsista?page=${page || 0}&limit=${limit || 10}`;
  const { data } = await API.get(url);
  return data;
};

export const getBolsistaToExpire = async () => {
  const { data } = await API.get(`${baseURL}/bolsista/toexpire`);
  return data;
}

export const putBolsistaToExpire = (bolsistas) => {
  return API.put(`${baseURL}/bolsista/prorrogate`, { bolsistas });
}

export const updateBolsista = async (id, payload) => {
  const { data } = await API.put(`${baseURL}/bolsista/${id}`, { ...payload });
  return data;
};

export const postBolsista = async (payload) => {
  const { data } = await API.post(`${baseURL}/bolsista`, { ...payload });
  return data;
};

export const deleteBolsista = async (id) => {
  const { data } = await API.delete(`${baseURL}/bolsista/${id}`);
  return data;
};

export const getBolsistaEdital = async (id) => {
  const { data } = await API.get(`${baseURL}/bolsista/edital/${id}`);
  return data;
};

export const toggleBolsista = async (bolsista, edital) => {
  const { data } = await API.put(`${baseURL}/bolsista/${bolsista}/edital/${edital}`);
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
  const { data } = await API.get(url ? url : `${baseURL}/edital`);
  return data;
};

export const updateEdital = async (id, payload) => {
  const { data } = await API.put(`${baseURL}/edital/${id}`, payload);
  return data;
};

export const postEdital = async (payload) => {
  return await API.post(`${baseURL}/edital`, payload);
};

export const deleteEdital = async (id) => {
  return await API.delete(`${baseURL}/edital/${id}`);
};

export const getEditalWithBolsista = async (id, query) => {
    const { page, limit, search } = query;
  const url = search
    ? `${baseURL}/edital/${id}/bolsista?page=${page || 0}&limit=${limit || 10}&search=${search || ""}`
    : `${baseURL}/edital/${id}/bolsista?page=${page || 0}&limit=${limit || 10}`;
  const { data } = await API.get(url);

  return data;
};

export const getAllEditalWithBolsista = async () => {
  const { data } = await API.get(`${baseURL}/edital/bolsista`);

  return data;
};

export const vincularBolsista = async (id, bolsistas, data_vinculo) => {
  const { data } = await API.post(`${baseURL}/edital/vincularbolsista/${id}`, {
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
