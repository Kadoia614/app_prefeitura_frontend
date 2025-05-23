// src/components/ui/ToastProvider.jsx
import { Toast } from "primereact/toast";
import { createContext, useContext, useRef } from "react";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  const showToast = (severity = "info", summary = "", detail = "", life = 3000) => {
    toastRef.current?.show({ severity, summary, detail, life });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
