import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      history.pop();
      setHistory((prev) => [...history, newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = () => {
    if (history.length >= 2) {
      history.pop();
      setHistory((prev) => [...history]);
      setMode(history[history.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
}
