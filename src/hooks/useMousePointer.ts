import { useEffect, useState } from 'react';

const useMousePointer = () => {
  const [point, setPoint] = useState({
    x: 0,
    y: 0,
  });

  const mousemoveHandler = (e: MouseEvent) => {
    const point = {
      x: e.clientX,
      y: e.clientY,
    };
    setPoint(point);
  };
  useEffect(() => {
    //监听鼠标事件
    window.addEventListener('mousemove', mousemoveHandler);
    //组件销毁时，一定要解绑dom事件！！（否则可能会出现内存泄漏）
    return () => {
      window.removeEventListener('mousemove', mousemoveHandler);
    };
  }, []);

  return [point.x, point.y];
};

export default useMousePointer;
