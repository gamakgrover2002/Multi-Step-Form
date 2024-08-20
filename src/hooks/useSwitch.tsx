import { useState } from "react";
export const useSwitch = () => {
  const [mode, setMode] = useState(true);

  const handleSwitch = () => {
    setMode((prev) => !prev);
  };
  return { mode, handleSwitch };
};
