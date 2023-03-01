import React, { useState, useEffect } from 'react';
import { exceptLastValue } from './helper.js';
import './style.css';

export default function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [redo, setRedo] = useState([]);

  const clickedHandle = function (e) {
    if (e.target.querySelector('.btn')) {
      setCoordinates([...coordinates, { x: e.clientX - 8, y: e.clientY - 8 }]);
      setRedo([]);
    }
  };

  useEffect(() => {
    document.querySelector('body').addEventListener('mousedown', clickedHandle);

    return () => {
      document
        .querySelector('body')
        .removeEventListener('mousedown', clickedHandle);
    };
  });

  const redoHandle = () => {
    if (redo.length === 0) return;
    setCoordinates([...coordinates, ...redo.slice(-1)]);
    setRedo(exceptLastValue(redo));
  };

  const undoHandle = () => {
    if (coordinates.length === 0) return;

    setRedo([...redo, ...coordinates.slice(-1)]);
    setCoordinates(exceptLastValue(coordinates));
  };

  const allClear = () => {
    setCoordinates([]);
    setRedo([]);
  };

  return (
    <>
      <button className="btn" onClick={(e) => undoHandle(e)}>
        undo
      </button>
      <button className="btn" onClick={() => redoHandle()}>
        redo
      </button>
      <button className="btn" onClick={() => allClear()}>
        All Clear
      </button>
      {coordinates.map((coordinate) => (
        <div
          key={coordinate.x + coordinate.y}
          className="dot"
          style={{ left: coordinate.x, top: coordinate.y }}
        ></div>
      ))}
    </>
  );
}
