import React from 'react';

interface CardProps {
  card: any;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div
      id={`task-${card.id}`}
      className="bg-gray-100 p-4 mb-2 rounded-lg shadow hover:bg-gray-200"
    >
      <h3 className="font-semibold">{card.code}</h3>
      <p>{card.description}</p>
    </div>
  );
};

export default Card;
