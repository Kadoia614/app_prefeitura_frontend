import API from "../api/API";

export class IPTUMunicipeService {
  static getMunicipe = async (query) => {
    const { page, limit, search } = query;
    const url = search
      ? `/iptu/municipe?page=${page || 0}&limit=${limit || 10}&search=${search}`
      : `/iptu/municipe?page=${page || 0}&limit=${limit || 10}`;
    const { data } = await API.get(`${url}`);

    return data;
  };

  static post = async (payload) => {
    const { data } = await API.post(`/iptu/municipe`, payload);
    return data;
  };

  static delete = async (id) => {
    const { data } = await API.delete(`/iptu/municipe/${id}`);
    return data;
  };

  static getOne = async (uuid) => {
    const { data } = await API.get(`/iptu/municipe/${uuid}`);
    return data;
  };

  static update = async (id, payload) => {
    const { data } = await API.put(`/iptu/municipe/${id}`, payload);
    return data;
  };
}

export class IPTUCertidaoService {
  static post = async (payload) => {
    const { data } = await API.post(`/iptu/cert`, payload);

    return data;
  };

  static delete = async (id) => {
    const { data } = await API.delete(`/iptu/cert/${id}`);
    return data;
  };

  static getOne = async (uuid) => {
    const { data } = await API.get(`/iptu/cert/${uuid}`);
    return data;
  };
}
