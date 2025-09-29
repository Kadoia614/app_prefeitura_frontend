import API from "../api/API";

export const postCertidao = async (payload) => {
    const {data} = await API.post(`/iptu/cert`, payload);

    return data
}

export const getMunicipe = async () => {
    const {data} = await API.get(`/iptu/municipe`);

    return data
}