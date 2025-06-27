import API from "./API";

export const saveService = async (service) => {
    const {data} = await API.post("/service", service)
    return data
}

export const updateService = async (service, id) => {
    const {data} = await API.put(`/service/${id}`, service)
    return data
}