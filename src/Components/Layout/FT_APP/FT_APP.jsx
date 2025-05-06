import { useContext, useEffect, useState, useRef } from "react";
import API from "../../../../service/API";
import HanlerError from "../../middleware/HandleError";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaTrash, FaEdit } from "react-icons/fa";

import InputField from "../../shared/InputField";
import CalendarInput from "../../shared/CalendarInput";
import Title from "../../shared/Title";

import { UserContext } from "/src/context/UserContextFile";

import Modal from "../../shared/Modal";

const FTAPP = () => {
  let { scopo } = useContext(UserContext);
  const toast = useRef(null);
  const today = new Date();

  let [tableData, setTableData] = useState([]);
  let [error, setError] = useState(false);
  let [modalData, setModalData] = useState([]);
  let [openModalEdit, setOpenModalEdit] = useState(false);
  let [excludeModalOpen, setExcludeModalOpen] = useState(false);
  let [excludeModal, setExcludeModal] = useState(null);

  const fetchData = async () => {
    try {
      let response = await API.get("/bolsista");
      setTableData(response.data.bolsistas);
      console.log(response.data);
    } catch (error) {
      setError(error.status);
    }
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async (id) => {
    console.log(modalData);
    let selectedDate = modalData.vencimento;
    try {
      if (id) {
        await API.put(`/bolsista/${id}`, {
          bco: modalData.bco,
          ag: modalData.ag,
          dig_ag: modalData.dig_ag,
          conta: modalData.conta,
          dig_conta: modalData.dig_conta,
          nome: modalData.nome,
          bolsa: modalData.bolsa,
          vencimento: selectedDate,
          cpf: modalData.cpf,
          local: modalData.local,
        });

        toast.current.show({
          severity: "success",
          summary: "Confirmed",
          detail: "Bolsista salvo com sucesso",
          life: 3000,
        });
        setOpenModalEdit(false);
        fetchData();

        return;
      }

      await API.post("/bolsista", {
        bco: modalData.bco,
        ag: modalData.ag,
        dig_ag: modalData.dig_ag,
        conta: modalData.conta,
        dig_conta: modalData.dig_conta,
        nome: modalData.nome,
        bolsa: modalData.bolsa,
        vencimento: selectedDate,
        cpf: modalData.cpf,
        local: modalData.local,
      });
      toast.current.show({
        severity: "success",
        summary: "Confirmed",
        detail: "Bolsista salvo com sucesso",
        life: 3000,
      });
      setOpenModalEdit(false);
      fetchData();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Confirmed",
        detail:
          "Não foi possível salvar o Bolsista " + error.response.data.message ||
          "Erro Desconhecido " + error,
        life: 3000,
      });
    }
  };

  // To delete some item
  const toDelete = (id) => {
    setExcludeModal(id);
    setExcludeModalOpen(true);
  };

  const handleRemove = async (id) => {
    try {
      await API.delete(`/bolsista/${id}`);
      toast.current.show({
        severity: "success",
        summary: "Confirmed",
        detail: "Bolsista Deletado com sucesso",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Não foi possível excluir o bolsista. " + error,
        life: 3000,
      });
    } finally {
      fetchData();
      setExcludeModalOpen(false);
    }
  };

  // sómente para gerenciar os valore dos inputs
  const editableItem = (key, value) => {
    setModalData((e) => ({ ...e, [key]: value }));
  };

  //#endregion EDIT ITEMS

  // apaga os dados do modal
  const clearModal = () => {
    setModalData({});
  };

  //get a cada certo time (10seg nesse caso)
  useEffect(() => {
    fetchData();
  }, []);

  // gerenciamento de erros para caso algo de errado ocorra durante as requisições
  if (error) {
    return <HanlerError error={error} />;
  }

  return (
    <div id="AllDemandasTi" className="content">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div>
        <Title>Com grandes poderes vêm grandes responsabilidades</Title>

        <button
          className="btn-primary"
          onClick={() => {
            setOpenModalEdit(true);
            clearModal();
          }}
        >
          Cadastrar Bolsista
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <DataTable
          id="BolistaTable"
          value={tableData}
          paginator
          rows={25}
          stripedRows
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          className="min-w-full p-4"
          rowClassName="hover:bg-gray-100 transition duration-200"
        >
          <Column
            headerClassName="p-2"
            field="id"
            header="Id"
            className="text-sm text-gray-800 p-4 whitespace-nowrap"
          />

          <Column
            headerClassName="p-2"
            field="nome"
            header="Nome"
            sortable
            filter
            filterPlaceholder="Pesquisar Nome"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4"
          />
          <Column
            headerClassName="p-2"
            field="local"
            header="Local"
            sortable
            filter
            filterPlaceholder="Pesquisar Local"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4"
          />
          <Column
            headerClassName="p-2"
            field="vencimento"
            header="Vencimento"
            sortable
            filter
            filterPlaceholder="Pesquisar status"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4"
          />
          <Column
            headerClassName="p-2"
            field="createdAt"
            header="Criação"
            sortable
            filter
            filterPlaceholder="Pesquisar data"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4 whitespace-nowrap"
            body={(rowData) =>
              new Date(rowData.createdAt).toLocaleDateString("pt-BR")
            }
          />
          {scopo == 1 || scopo == 2 ? (
            <Column
              header="Ações"
              body={(rowData) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-primary-500 hover:bg-primary-700 rounded-lg transition"
                    onClick={() => {
                      setOpenModalEdit(true);
                      setModalData(rowData);
                    }}
                  >
                    <FaEdit /> Editar
                  </button>
                  {(scopo == 1 || scopo == 2) && (
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-xs text-white bg-red-500 hover:bg-red-700 rounded-lg transition"
                      onClick={() => {
                        toDelete(rowData.id);
                      }}
                    >
                      <FaTrash /> Deletar
                    </button>
                  )}
                </div>
              )}
            />
          ) : (
            ""
          )}
        </DataTable>
      </div>

      {/* Modal to create/ edit a bolsista */}
      <Modal
        id="EditBolsista"
        title={modalData.id ? "Atualizar Bolsista" : "Cadastrar Bolsista"}
        acept={() => {
          saveItem(modalData.id || null);
        }}
        aceptLabel={"Salvar"}
        refuse={() => {
          setOpenModalEdit(false);
          clearModal();
        }}
        typeAction={"btn-primary"}
        open={openModalEdit}
        onClose={setOpenModalEdit}
      >
        <div id="bolsistaData">
          <div id="Data" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Nome */}
            <div className="mt-1 col-span-1 sm:col-span-2">
              <InputField
                id="Name"
                inputClass="w-full"
                label="Nome"
                value={modalData.nome || ""}
                onChange={(e) => {
                  editableItem("nome", e.target.value);
                }}
                disabled={modalData.id && scopo > 3 ? "disabled" : false}
              />
            </div>

            {/* CPF */}
            <div className="mt-1 col-span-1 sm:col-span-2">
              <InputField
                id="CPF"
                keyfilter="num"
                inputClass="w-full"
                label="CPF"
                value={modalData.cpf || ""}
                onChange={(e) => {
                  editableItem("cpf", e.target.value);
                }}
                maxLength={11}
                disabled={modalData.id && scopo > 3 ? "disabled" : false}
              />
            </div>

            {/* Local */}
            <div className="mt-1 col-span-1 sm:col-span-2">
              <InputField
                id="CPF"
                keyfilter="alpha"
                inputClass="w-full"
                label="Local"
                value={modalData.local || ""}
                onChange={(e) => {
                  editableItem("local", e.target.value);
                }}
                disabled={modalData.id && scopo > 3 ? "disabled" : false}
              />
            </div>

            {/* Banco */}
            <div className="mt-1 col-span-full">
              <InputField
                id="Banco"
                keyfilter="int"
                inputClass="w-full sm:w-50"
                label="Banco"
                value={modalData.bco || ""}
                onChange={(e) => {
                  editableItem("bco", e.target.value);
                }}
                maxLength={3}
                disabled={modalData.id && scopo > 3 ? "disabled" : false}
              />
            </div>

            {/* agencia */}
            <div className="mt-1 col-span-1">
              <div className="p-inputgroup">
                <InputField
                  id="Ag"
                  keyfilter="int"
                  inputClass="w-full sm:w-25"
                  label="Agência"
                  value={modalData.ag || ""}
                  onChange={(e) => {
                    editableItem("ag", e.target.value);
                  }}
                  maxLength={4}
                  disabled={modalData.id && scopo > 3 ? "disabled" : false}
                />

                <InputField
                  id="Dig_Ag"
                  keyfilter="int"
                  inputClass="w-10"
                  label="Dg"
                  value={modalData.dig_ag || ""}
                  onChange={(e) => {
                    editableItem("dig_ag", e.target.value);
                  }}
                  maxLength={1}
                  disabled={modalData.id && scopo < 3 ? "disabled" : false}
                />
              </div>
            </div>

            <div className="mt-1 col-span-1">
              <div className="p-inputgroup">
                <InputField
                  keyfilter="int"
                  id="Conta"
                  inputClass="w-full sm:w-25"
                  label="Conta"
                  value={modalData.conta || ""}
                  onChange={(e) => {
                    editableItem("conta", e.target.value);
                  }}
                  maxLength={6}
                  disabled={modalData.id && scopo > 3 ? "disabled" : false}
                />

                <InputField
                  keyfilter="int"
                  id="Dig_Conta"
                  inputClass="w-10"
                  label="Dg"
                  value={modalData.dig_conta || ""}
                  onChange={(e) => {
                    editableItem("dig_conta", e.target.value);
                  }}
                  maxLength={1}
                  disabled={modalData.id && scopo > 3 ? "disabled" : false}
                />
              </div>
            </div>

            {/* Bolsa */}
            <div className="mt-1 col-span-1">
              <div className="p-inputgroup">
                <InputField
                  keyfilter="money"
                  id="Bolsa"
                  inputClass="w-full"
                  label="Bolsa"
                  placeHolder={"R$ 0,00"}
                  value={modalData.bolsa || ""}
                  onChange={(e) => {
                    editableItem("bolsa", e.target.value);
                  }}
                  disabled={modalData.id && scopo > 3 ? "disabled" : false}
                />
              </div>
            </div>

            {/* Vencimento */}
            <div className="mt-1 col-span-1">
              <div className="p-inputgroup">
                <CalendarInput
                  label={"Vencimento"}
                  inputClass="w-full"
                  value={
                    modalData?.vencimento
                      ? new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          modalData?.vencimento
                        )
                      : null
                  }
                  onChange={(e) => {
                    editableItem("vencimento", e.target.value.getDate());
                  }}
                  format={"dd"}
                  view="date"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Exclude Confirmation Dialog */}
      <Modal
        id={"ExcludeModalSetor"}
        title={"Excluir Setor?"}
        acept={() => handleRemove(excludeModal)}
        aceptLabel={"Excluir"}
        refuse={() => setExcludeModalOpen(false)}
        typeAction={"btn-danger"}
        open={excludeModalOpen}
        onClose={() => setExcludeModalOpen(false)}
      >
        <p className="text-red-500 font-bold mt-2">
          Tem certeza que deseja excluir esse item? Os dados excluídos não
          poderão ser recuperados.
        </p>
      </Modal>
    </div>
  );
};

export default FTAPP;
