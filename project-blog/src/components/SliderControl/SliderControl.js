import React from 'react';

import Slider from '@/components/Slider';
import styles from './SliderControl.module.css';

function SliderControl({ id: initialId, label, value, ...delegated }) {
  const id = React.useId();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label htmlFor={initialId ?? id} className={styles.label}>
          {label}
        </label>
        <span className={styles.value}>{value}</span>
      </div>
      <Slider {...delegated} value={value} id={initialId ?? id} />
    </div>
  );
}

export default SliderControl;
