import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const clearToast = React.useCallback(() => {
    setToasts((curToasts) => !curToasts.length ? curToasts : []);
  }, []);
  
  const dismissToast = React.useCallback((id) => {
    setToasts((curToasts) => curToasts.filter((item) => item.id !== id));
  }, []);

  const addToast = React.useCallback(({ variant, message }) => {
    setToasts((curToasts) => [
      ...curToasts,
      {
        id: Math.random(),
        message,
        variant,
      }
    ]);
  }, []);

  const value = React.useMemo(() => ({
    toasts,
    clearToast,
    addToast,
    dismissToast,
  }), [toasts, clearToast, dismissToast, addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
