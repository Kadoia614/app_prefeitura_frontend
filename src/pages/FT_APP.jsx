import { TabView, TabPanel } from "primereact/tabview";

import Title from "@/components/shared/title/Title";

import Bolsista from "../components/components-ft/bolsistas/Bolsista";
import Edital from "../components/components-ft/edital/Edital";
import { BolsistaProvider } from "../context/ft/bolsista/BolsistaProvider";

const FTAPP = () => {
  return (
    <div id="FT">
      <Title>Frente de Trabalho</Title>

      <div>
        <BolsistaProvider>
          <TabView>
            <TabPanel header="Bolsistas">
              <Bolsista lazy />
            </TabPanel>

            <TabPanel header="Editais">
              <Edital lazy />
            </TabPanel>
          </TabView>
        </BolsistaProvider>
      </div>
    </div>
  );
};

export default FTAPP;
