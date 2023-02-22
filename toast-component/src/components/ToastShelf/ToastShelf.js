import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToastContext } from '../ToastProvider';

function ToastShelf() {
  const { toasts, clearToast, dismissToast } = React.useContext(ToastContext);

  React.useEffect(() => {
    if (!toasts.length) return;

    const handleClearToasts = (evt) => {
      if (evt.code === 'Escape')
        clearToast();
    };

    document.addEventListener('keydown', handleClearToasts);

    return () => {
      document.removeEventListener('keydown', handleClearToasts);
    };
  }, [clearToast, toasts.length]);
  
  if (!toasts.length) return null;

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="assertive"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast variant={toast.variant} dismiss={() => dismissToast(toast.id)}>
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
