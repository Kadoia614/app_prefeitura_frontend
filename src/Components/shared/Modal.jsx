import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { Button } from "primereact/button";

const Modal = ({
  id,
  title,
  acept,
  aceptLabel,
  refuse,
  typeAction,
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10" id={id}>
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-left sm:mt-0 w-full">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                  {children}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex sm:flex-row-reverse sm:px-6">
              <Button
                label={`${aceptLabel}`}
                onClick={acept}
                className={`${typeAction}`}
              />
              <Button
                label="Cancelar"
                onClick={refuse}
                className={`btn-cancel mr-3`}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
