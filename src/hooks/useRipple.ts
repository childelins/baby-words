import { useState, useCallback, useRef, useEffect } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
  key: string;
}

const RIPPLE_DURATION_MS = 600;

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const timeoutIdsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // 组件卸载时清理所有 timeout
  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>, key: string) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id, key }]);

    // 动画结束后移除涟漪
    const timeoutId = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
      timeoutIdsRef.current.delete(timeoutId);
    }, RIPPLE_DURATION_MS);
    timeoutIdsRef.current.add(timeoutId);
  }, []);

  const getRipples = useCallback((key: string) => {
    return ripples.filter((r) => r.key === key);
  }, [ripples]);

  return { ripples, createRipple, getRipples };
}
