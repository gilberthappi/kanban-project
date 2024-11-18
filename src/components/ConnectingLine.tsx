import React from 'react';

interface ConnectingLineProps {
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
}

const ConnectingLine: React.FC<ConnectingLineProps> = ({ startPoint, endPoint }) => {
  return (
    <line
      x1={startPoint.x}
      y1={startPoint.y}
      x2={endPoint.x}
      y2={endPoint.y}
      stroke="black"
      strokeWidth="2"
    />
  );
};

export default ConnectingLine;
