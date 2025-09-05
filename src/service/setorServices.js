import API from "@api/API";

export const saveSetor = async (setor) => {
  const { data } = await API.post("/setor", setor);
  return data;
};

export const updateSetor = async (setor, id) => {
  const { data } = await API.put(`/setor/${id}`, setor);
  return data;
};
