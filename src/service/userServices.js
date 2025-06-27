import API from "./API";

export const saveUser = async (user) => {
    const {data} = await API.post("/user", user)
    return data
}

export const updateUser = async (user, id) => {
    const {data} = await API.put(`/user/${id}`, user)
    return data
}