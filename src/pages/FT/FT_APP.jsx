import { TabView, TabPanel } from "primereact/tabview";

import Title from "@/components/shared/title/Title";

import Bolsista from "./bolsistas/Bolsista";
import Edital from "./edital/Edital";

const FTAPP = () => {
  return (
    <div id="Bolsistas" className="content">
      <Title>Frente de Trabalho</Title>

      <div>
        <TabView>
          <TabPanel header="Bolsistas" lazy>
            <Bolsista />
          </TabPanel>

          <TabPanel header="Editais" lazy>
            <Edital />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default FTAPP;
