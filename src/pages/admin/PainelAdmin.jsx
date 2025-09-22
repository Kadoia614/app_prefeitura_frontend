import Title from "../../components/shared/title/Title";
import { useOutletContext } from "react-router";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import Roles from "./roles/Roles";
import Services from "./services_user/Services";
import Setor from "./setor/Setor";
import User from "./users/Users";

import { useSearchParams } from "react-router";
const Admin = () => {
  const { attIsLoading } = useOutletContext();
  const [searchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(
    searchParams.get("tab") ? parseInt(searchParams.get("tab")) : 0
  );

  return (
    <div id="Admin">
      <Title>Com grandes poderes vêm grandes responsabilidades</Title>
      <div className="card">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Users">
            <User attIsLoading={attIsLoading} lazy />
          </TabPanel>
          <TabPanel header="Setores">
            <Setor attIsLoading={attIsLoading} lazy />
          </TabPanel>
          <TabPanel header="Serviços">
            <Services attIsLoading={attIsLoading} lazy />
          </TabPanel>
          <TabPanel header="Permissões">
            <Roles attIsLoading={attIsLoading} lazy />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Admin;
