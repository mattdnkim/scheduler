import Empty from "components/Appointment/Empty";
import { process_params } from "express/lib/router";
import react, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), newMode]);
    } else {
      setHistory([...history, newMode]);
    }
  }
  function back() {
    if (history.length <= 1) {
      return;
    }
    setMode(history[history.length - 2]);
    setHistory([...history.slice(0, history.length - 1)]);
  }

  return { mode, transition, back };
}

