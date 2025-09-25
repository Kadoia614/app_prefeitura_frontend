import { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { DataTable } from "primereact/datatable";

import TableContainer from "../../../../components/shared/table/TableContainer";
import TableHeader from "../../../../components/shared/table/TableHeader";
import InputFieldLine from "../../../../components/shared/input/inputfield/InputFieldLine";
import { InputSwitch } from "primereact/inputswitch";
import { useToast } from "../../../../components/shared/toast/ToastProvider";
import { Column } from "primereact/column";
const TableCertidao = () => {
  const { showToast } = useToast();

  const [sudoMode, setSudoMode] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [targetDocuments, setTargetDocuments] = useState();

  const mockedData = [
    {
      uuid: "6648094d-5caf-4dcc-a9c3-81012f53ab9c",
      nome: "Miguel Moraes",
      cpf: "47867722831",
      email: "m.morciella@gmail.com",
      documentos: [
        {
          name: "Certidão 1",
          uuid: "6648094d-5caf-4dcc-a9c3-81012f53ab9c",
          src: "https://randomuser.me/",
          // src vai ser o endpoint da api mais o uuid do click, sem preview
        },
        {
          name: "Certidão 3",
          uuid: "6648094d-5caf-4dcc-a9c3-81012f53ab9c",
          src: "https://randomuser.me/",
          // src vai ser o endpoint da api mais o uuid do click, sem preview
        },
        {
          name: "Certidão 2",
          uuid: "6648094d-5caf-4dcc-a9c3-81012f53ab9c",
          src: "https://randomuser.me/",
          // src vai ser o endpoint da api mais o uuid do click, sem preview
        },
      ],
    },
    {
      uuid: "6648094d-5caf-4dcc-a9c3-81012f53ab9c",
      nome: "Miguel Moraes",
      cpf: "47867722831",
      email: "m.morciella@gmail.com",
      documentos: [
        {
          name: "teste 1",
          uuid: "6648094d-5caf-4dcc-a9c3-81012f53ab9c",
          src: "https://randomuser.me/",
          // src vai ser o endpoint da api mais o uuid do click, sem preview
        },
        {
          name: "teste 3",
          uuid: "6648094d-5caf-4dcc-a9c3-81012f53ab9c",
          src: "https://randomuser.me/",
          // src vai ser o endpoint da api mais o uuid do click, sem preview
        },
        {
          name: "teste 2",
          uuid: "6648094d-5caf-4dcc-a9c3-81012f53ab9c",
          src: "https://randomuser.me/",
          // src vai ser o endpoint da api mais o uuid do click, sem preview
        },
      ],
    },
  ];

  const fetchData = async () => {
    try {
      setInterval(10000);

      setData(mockedData);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao buscar documentos " + error.response.data.message ||
          error.message
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <>
      <TableContainer>
        <TableHeader
          start={
            <>
              <InputFieldLine
                id="SearchCertidao"
                placeHolder={"Buscar Certidão por CPF"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></InputFieldLine>
            </>
          }
          center="Tabela de Certidões"
          end={
            <>
              <span>Modo Perigoso</span>
              <InputSwitch
                checked={sudoMode}
                onChange={(e) => setSudoMode(e.value)}
              ></InputSwitch>
            </>
          }
        ></TableHeader>
        <div className="w-full flex md:flex-row p-4 gap-1">
          <div className="w-full">
            <h1 className="text-center font-bold">Painel de Munícipes</h1>
            <DataTable
              value={data}
              header="Em desenvolvimento"
              onRowClick={(e) => {
                setTargetDocuments(e.data.documentos);
                // Aqui você pode navegar, abrir modal, etc.
              }}
            >
              <Column field="uuid" header="uuid"></Column>
              <Column field="nome" header="Nome"></Column>
              <Column field="email" header="Email"></Column>
              {sudoMode && <Column header="Actions"></Column>}
            </DataTable>
          </div>
          <div className="border-1 border-gray-200 rounded-md p-4 w-full max-w-70">
            {targetDocuments &&
              targetDocuments.map((document) => (
                <div key={document.uuid} className="text-md text-gray-400">
                  <div>
                    <a href={document.src} target="_blank">
                      <i className="p-treenode-icon pi pi-file pr-2"></i>
                      <span className="p-treenode-label">{document.name}</span>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </TableContainer>
    </>
  );
};

export default TableCertidao;
