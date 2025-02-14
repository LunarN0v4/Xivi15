
import { useEffect } from 'react';

interface SelectionBoxProps {
  isSelecting: boolean;
  setIsSelecting: (isSelecting: boolean) => void;
  start: { x: number; y: number };
  current: { x: number; y: number };
  setCurrent: (current: { x: number; y: number }) => void;
}

export function SelectionBox({ isSelecting, setIsSelecting, start, current, setCurrent }: SelectionBoxProps) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isSelecting) {
        setCurrent({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsSelecting(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, setCurrent, setIsSelecting]);

  if (!isSelecting) return null;

  const width = Math.abs(current.x - start.x);
  const height = Math.abs(current.y - start.y);
  
  if (width === 0 || height === 0) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    left: Math.min(start.x, current.x),
    top: Math.min(start.y, current.y),
    width,
    height,
    backgroundColor: 'rgba(0, 120, 215, 0.1)',
    border: '1px solid rgba(0, 120, 215, 0.8)',
    pointerEvents: 'none',
    zIndex: 9999,
  };

  return <div style={style} />;
}
