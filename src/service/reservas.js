import API from "../api/API";

export class Agendamentos {
  static APIBaseURL = "/reservas/agendamento";
  
  static get = async (query) => {
    const { page, limit, search } = query;
    const url = search
      ? `${this.APIBaseURL}?page=${page || 0}&limit=${limit || 10}&search=${search}`
      : `${this.APIBaseURL}?page=${page || 0}&limit=${limit || 10}`;
    const { data } = await API.get(`${url}`);
    return data;
  };

  static getById = async (id) => {
    const { data } = await API.get(`${this.APIBaseURL}/${id}`);
    return data;
  };

  static getDisponivel = async (data_agendamento, hora_inicio, hora_fim) => {

    const {data} = await API.get(`${this.APIBaseURL}/disponiveis?data=${data_agendamento}&inicio=${hora_inicio}&fim=${hora_fim}`);

    return data
  }

  static post = async (payload) => {
    const { data } = await API.post(`${this.APIBaseURL}`, payload);
    return data;
  };

  static delete = async (id) => {
    const { data } = await API.delete(`${this.APIBaseURL}/${id}`);
    return data;
  };

  static update = async (id, payload) => {
    const { data } = await API.put(`${this.APIBaseURL}/${id}`, payload);
    return data;
  };

  static confirm = async (id, payload) => {
    const { data } = await API.put(`${this.APIBaseURL}/${id}/confirmar`, {
      ...payload
    });

    return data;
  };
}

export class Veiculos {
  static APIBaseURL = "/reservas/veiculo";

  static getVeiculos = async (query) => {
    const { page, limit, search } = query;
    const url = search
      ? `${this.APIBaseURL}?page=${page || 0}&limit=${limit || 10}&search=${search}`
      : `${this.APIBaseURL}?page=${page || 0}&limit=${limit || 10}`;

    const { data } = await API.get(`${url}`);

    return data;
  };

  static getOne = async (uuid) => {
    const { data } = await API.get(`${this.APIBaseURL}/${uuid}`);
    return data;
  };

  static post = async (payload) => {
    const { data } = await API.post(`${this.APIBaseURL}`, payload);
    return data;
  };

  static delete = async (id) => {
    const { data } = await API.delete(`${this.APIBaseURL}/${id}`);
    return data;
  };

  static update = async (id, payload) => {
    const { data } = await API.put(`${this.APIBaseURL}/${id}`, payload);
    return data;
  };
}

export class Motoristas {
    static APIBaseURL = "/reservas/motorista";

    static getMotoristas = async (query) => {
      const { page, limit, search } = query;


      const url = search
        ? `${this.APIBaseURL}?page=${page || 0}&limit=${limit || 10}&search=${search}`
        : `${this.APIBaseURL}?page=${page || 0}&limit=${limit || 10}`;
  
      const { data } = await API.get(`${url}`);

      console.log(data)
  
      return data;
    };

    static getOne = async (uuid) => {
      const { data } = await API.get(`${this.APIBaseURL}/${uuid}`);
      return data;
    };

    static post = async (payload) => {
      const { data } = await API.post(`${this.APIBaseURL}`, payload);
      return data;
    };

    static delete = async (id) => {
      const { data } = await API.delete(`${this.APIBaseURL}/${id}`);
      return data;
    };

    static update = async (id, payload) => {
      const { data } = await API.put(`${this.APIBaseURL}/${id}`, payload);
      return data;
    };    
}
