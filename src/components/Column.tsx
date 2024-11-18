import React, { useState } from 'react';

interface ColumnProps {
  title: string;
  cards: { code: string; description: string; systemStatus: { label: string; value: string }; nextIds: string[] }[];
  onDrop: (itemCode: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, cards, onDrop }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemCode = event.dataTransfer.getData('text/plain'); // Use `code`
    onDrop(itemCode);
    setIsDraggingOver(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <div
      className={`p-4 rounded-md w-64 transition-colors ${
        isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {cards.map((card) => (
          <div
            key={card.code}
            id={`task-${(card.code).replace(/\W/g, '-')}`} 
            className="p-3 bg-white shadow rounded-md cursor-pointer"
            draggable
            onDragStart={(event) => event.dataTransfer.setData('text/plain', card.code)} // Set `code`
          >
            <p>{card.description}</p>
            <span className="text-sm text-gray-500">{card.systemStatus.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
