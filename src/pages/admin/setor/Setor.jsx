import { useEffect, useState, useRef } from "react";
import API from "../../../service/API";
import HandleError from "../../../middleware/HandleError";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Toast } from "primereact/toast";

import InputField from "../../../components/shared/input/InputField";
import Modal from "../../../components/shared/modal/Modal";

const Setor = () => {
  const [tableData, setTableData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(null);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const fetchData = async () => {
    try {
      const response = await API.get("/setor");
      setTableData(response.data.setores);
    } catch (error) {
      setError(error.status);
      showToast("error", "Failed to load sectors: " + error.message);
    }
  };

  const loadTable = () => {
    fetchData();
  };

  const handleSave = async (id) => {
    try {
      if (!id) {
        await API.post("/setor", { setor: modalData });
        showToast("success", "Sector created successfully!");
      } else {
        await API.put(`/setor/${id}`, { setor: modalData });
        showToast("success", "Sector updated successfully!");
      }
      loadTable();
      clearModal();
      setOpenModalEdit(false);
    } catch (error) {
      showToast("error", "Failed to save sector: " + error.message);
    }
  };

  const handleRemove = async (id) => {
    try {
      await API.delete(`/setor/${id}`);
      showToast("success", "Sector deleted successfully!");
      loadTable();
    } catch (error) {
      showToast("error", "Failed to delete sector: " + error.message);
    } finally {
      setExcludeModalOpen(false);
    }
  };

  const clearModal = () => {
    setModalData({});
  };

  const showToast = (severity, detail) => {
    toast.current.show({
      severity,
      summary: severity.charAt(0).toUpperCase() + severity.slice(1),
      detail,
      life: 3000,
    });
  };

  useEffect(() => {
    loadTable();
  }, []);

  const editableItem = (key, value) => {
    setModalData((prev) => ({ ...prev, [key]: value }));
  };
  if (error) {
    return <HandleError Error={error} />;
  }

  return (
    <>
      <div id="PainelSetor">
        <Toast ref={toast} />
        <Button
          label="Cadastrar Setor"
          className="btn-primary mb-4"
          onClick={() => {
            clearModal();
            setOpenModalEdit(true);
          }}
        />
        <DataTable
          value={tableData}
          size="large"
          rowHover
          stripedRows
          tableClassName="mt-4"
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          tableStyle={{ minWidth: "40rem" }}
        >
          <Column field="id" header="#" />
          <Column field="name" header="Nome" />
          <Column field="description" header="Descrição" />
          <Column
            header="Editar"
            body={(rowData) => (
              <Button
                className="btn-primary"
                label={<FaEdit />}
                onClick={() => {
                  setModalData(rowData);
                  setOpenModalEdit(true);
                }}
              />
            )}
          />
          <Column
            header="Excluir"
            body={(rowData) => (
              <Button
                className="btn-danger"
                label={<FaTrash />}
                onClick={() => {
                  setExcludeModal(rowData.id);
                  setExcludeModalOpen(true);
                }}
              />
            )}
          />
        </DataTable>

        {/* Edit/Create Sector Modal */}
        <Modal
          id={"ModalEdit"}
          title={modalData.id ? "Atualizar Setor" : "Cadastrar Setor"}
          open={openModalEdit}
          onClose={() => setOpenModalEdit(false)}
          acept={() => handleSave(modalData.id || null)}
          aceptLabel={"Salvar"}
          refuse={() => {
            setOpenModalEdit(false);
            clearModal();
          }}
          typeAction={"btn-primary"}
        >
          <div id="UserConfig">
            <div id="Data" className="sm:grid grid-cols-1 gap-4">
              {/* Name Field */}
              <InputField
                id="Name"
                label="Nome do Setor"
                value={modalData.name || ""}
                onChange={(e) => editableItem("name", e.target.value)}
              />
              {/* Description Field */}
              <InputField
                id="Description"
                label="Descrição do Setor"
                value={modalData.description || ""}
                onChange={(e) => editableItem("description", e.target.value)}
                isTextArea
              />
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
    </>
  );
};

export default Setor;
