import { useState, useEffect, useRef } from 'react';

export function useCountUp(target: number, duration = 600): string {
  const [value, setValue] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    if (target === prev.current) return;
    const start = prev.current;
    const diff = target - start;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    prev.current = target;
  }, [target, duration]);

  return value.toLocaleString('ko-KR');
}
