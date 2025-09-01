import { UserProvider } from "./user/UserProvider";
import { LoadingProvider } from "./loading/LoadingProvider";
import { ToastProvider } from "../components/shared/toast/ToastProvider.jsx";
import { PrimeReactProvider } from "primereact/api";
const Provider = ({ children }) => {
  return (
    <LoadingProvider>
      <PrimeReactProvider>
        <ToastProvider>
          <UserProvider>{children}</UserProvider>
        </ToastProvider>
      </PrimeReactProvider>
    </LoadingProvider>
  );
};

export default Provider;
