import API from "../../api/API";

export default class Atleta {
    static Create = (data) => {
        // return API.post("/atleta", data);
        alert("Funcionando" + data);
    };
}