import API from "../service/API";

export const getDemandas = async (url) => {
  const response = await API.get( url? url : "/demandas");
  return response.data;
};

export const updateDemanda = async (id, data) => {
  return await API.put(`/demandas/${id}`, { demanda: data });
};

export const createDemanda = async (data) => {
  return await API.post("/demandas", { demanda: data });
};

export const assumeDemanda = async (id) => {
  return await API.put(`/demandas/${id}/assume`);
};

export const assumeDemanda = async (id) => {
  return await API.put(`/demandas/${id}/assume`);
};
