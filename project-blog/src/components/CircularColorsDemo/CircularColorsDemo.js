'use client';
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import { motion, MotionConfig } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

const SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
};

function CircularColorsDemo() {
  const id = React.useId();
  const [isPlaying, setPlaying] = React.useState(null);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected =
              color.value === selectedColor.value;

            return (
              <li
                className={styles.color}
                key={index}
              >
                {isSelected && (
                  <motion.div
                    layoutId={id}
                    transition={SPRING}
                    className={
                      styles.selectedColorOutline
                    }
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected &&
                      styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>
                    {color.label}
                  </VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => setPlaying((state) => !state)}>
              {isPlaying ? <Pause /> : <Play />}
              <VisuallyHidden>
                {isPlaying ? 'Pause' : 'Play'}
              </VisuallyHidden>
            </button>
            <button onClick={() => {
              setPlaying(false);
              setTimeElapsed(0);
            }}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
