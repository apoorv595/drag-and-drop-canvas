// src/Canvas.js
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ItemTypes = {
  CARD: 'card',
};

const Canvas = () => {
  const [cards, setCards] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => moveCard(item.id),
  }));

  const moveCard = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, x: Math.random() * 500, y: Math.random() * 500 }
          : card
      )
    );
  };

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      text: 'This is a card. Click "Show More" to see the full text.',
      x: Math.random() * 500,
      y: Math.random() * 500,
      isExpanded: false,
    };
    setCards([...cards, newCard]);
  };

  const handleExpand = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, isExpanded: !card.isExpanded }
          : card
      )
    );
  };

  return (
    <div
      ref={drop}
      style={{ width: '100vw', height: '100vh', overflow: 'auto', position: 'relative' }}
    >
      <button onClick={handleAddCard}>Add Card</button>
      {cards.map((card) => (
        <DraggableCard key={card.id} card={card} onExpand={handleExpand} />
      ))}
    </div>
  );
};

const DraggableCard = ({ card, onExpand }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: card.x,
        top: card.y,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <ResizableBox width={200} height={100} minConstraints={[100, 50]} maxConstraints={[300, 300]}>
        <div style={{ border: '1px solid black', padding: '10px', background: 'white' }}>
          <p>{card.isExpanded ? card.text : `${card.text.slice(0, 20)}...`}</p>
          <button onClick={() => onExpand(card.id)}>
            {card.isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </ResizableBox>
    </div>
  );
};

export default Canvas;
