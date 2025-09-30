import API from "../api/API";

export const postCertidao = async (payload) => {
    const {data} = await API.post(`/iptu/cert`, payload);

    return data
}

export const getMunicipe = async (query) => {
    const {page, limit, search} = query
     const url = search
    ? `/iptu/municipe?page=${page || 0}&limit=${limit || 10}&search=${search}`
    : `/iptu/municipe?page=${page || 0}&limit=${limit || 10}`;
    const {data} = await API.get(`${url}`);

    return data
}