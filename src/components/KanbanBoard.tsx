import React, { useState, useEffect, useRef } from 'react';
import Column from './Column';
import ConnectingLine from './ConnectingLine';

interface KanbanBoardProps {
  data: {
    code: string;
    description: string;
    systemStatus: { label: string; value: string };
    nextIds: string[];
  }[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ data }) => {
  const [boardData, setBoardData] = useState(data);
  const [lines, setLines] = useState<any[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBoardData(data);
  }, [data]);

  useEffect(() => {
    const updateLines = () => {
      const taskElements = new Map<string, HTMLElement>();

      data.forEach((task) => {
        const sanitizedCode = task.code.replace(/\W/g, '-');
        const element = document.getElementById(`task-${sanitizedCode}`);
        if (element) {
          taskElements.set(task.code, element);
        }
      });

      const newLines = data.flatMap((task) =>
        task.nextIds.map((nextId) => {
          // const sanitizedNextId = nextId.replace(/\W/g, '-');
          const startElement = taskElements.get(task.code);
          const endElement = taskElements.get(nextId);

          if (startElement && endElement) {
            const startRect = startElement.getBoundingClientRect();
            const endRect = endElement.getBoundingClientRect();

            return {
              startPoint: {
                x: startRect.left + startRect.width / 2,
                y: startRect.top + startRect.height / 2,
              },
              endPoint: {
                x: endRect.left + endRect.width / 2,
                y: endRect.top + endRect.height / 2,
              },
            };
          }
          return null;
        })
      ).filter(Boolean);

      setLines(newLines);
    };

    const observer = new ResizeObserver(updateLines);
    observer.observe(boardRef.current!);

    return () => observer.disconnect();
  }, [data]);

  const groupedData = (filter: string) =>
    boardData.filter((item) => item.systemStatus.label === filter);

  const handleDrop = (itemCode: string, newStatusLabel: string) => {
    setBoardData((prevData) =>
      prevData.map((item) =>
        item.code === itemCode
          ? { ...item, systemStatus: { ...item.systemStatus, label: newStatusLabel } }
          : item
      )
    );
  };

  return (
    <div className="relative flex gap-4 overflow-x-auto p-4" ref={boardRef}>
      {['Created', 'Allocated', 'In Progress', 'Rejected', 'Completed', 'On Hold', 'Cancelled'].map((status) => (
        <Column
          key={status}
          title={status}
          cards={groupedData(status)}
          onDrop={(itemCode) => handleDrop(itemCode, status)}
        />
      ))}
      
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {lines.map((line, index) => (
          <ConnectingLine key={index} startPoint={line.startPoint} endPoint={line.endPoint} />
        ))}
      </svg>
    </div>
  );
};

export default KanbanBoard;
