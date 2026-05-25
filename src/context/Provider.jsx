import { UserProvider } from "./user/UserProvider";
import { LoadingProvider } from "./loading/LoadingProvider";
import { ToastProvider } from "../components/shared/toast/ToastProvider.jsx";
import { PrimeReactProvider } from "primereact/api";
import { ChamadoProvider } from "./chamado/ChamadoProvider.jsx";
import PropTypes from "prop-types";
const Provider = ({ children }) => {
  return (
    <LoadingProvider>
      <PrimeReactProvider>
        <ToastProvider>
          <ChamadoProvider>
            <UserProvider>{children}</UserProvider>
          </ChamadoProvider>
        </ToastProvider>
      </PrimeReactProvider>
    </LoadingProvider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
