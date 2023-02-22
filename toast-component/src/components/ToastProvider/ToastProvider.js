import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const dismissToast = React.useCallback((id) => {
    setToasts((curToast) => curToast.filter((item) => item.id !== id));
  }, []);

  const addToast = React.useCallback(({ variant, message }) => {
    setToasts((curToast) => [
      ...curToast,
      {
        id: Math.random(),
        message,
        variant,
      }
    ]);
  }, []);

  const value = React.useMemo(() => ({
    toasts,
    addToast,
    dismissToast,
  }), [toasts, dismissToast, addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
