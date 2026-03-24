'use client';

import { useState, useEffect, useRef } from 'react';

export default function AnimatedValue({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    if (value === prev.current) return;
    const start = prev.current;
    const diff = value - start;
    const duration = 600;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    prev.current = value;
  }, [value]);

  return <>{display.toLocaleString('ko-KR')}{suffix}</>;
}
