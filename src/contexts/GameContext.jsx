import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const value = {
    selectedStage,
    setSelectedStage,
    selectedLevel,
    setSelectedLevel,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
