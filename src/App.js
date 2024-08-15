// src/App.js
import React from 'react';
import Canvas from './Canvas';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Canvas />
      </div>
    </DndProvider>
  );
}

export default App;
