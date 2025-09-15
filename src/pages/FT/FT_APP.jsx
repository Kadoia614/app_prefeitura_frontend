import { TabView, TabPanel } from "primereact/tabview";

import Title from "@/components/shared/title/Title";

import Bolsista from "./bolsistas/Bolsista";
import Edital from "./edital/Edital";

const FTAPP = () => {
  return (
    <div id="Bolsistas">
      <Title>Frente de Trabalho</Title>

      <div>
        <TabView>
          <TabPanel header="Bolsistas" >
            <Bolsista lazy/>
          </TabPanel>

          <TabPanel header="Editais" >
            <Edital lazy/>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default FTAPP;
