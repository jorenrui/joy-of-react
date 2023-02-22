import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToastContext } from '../ToastProvider';
import { useEscapeKey } from '../../hooks/useEscapeKey';

function ToastShelf() {
  const { toasts, clearToast, dismissToast } = React.useContext(ToastContext);

  useEscapeKey(clearToast);
  
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
