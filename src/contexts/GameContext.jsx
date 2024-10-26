import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedWebcam, setSelectedWebcam] = useState(null);
  const [isFlip, setIsFlip] = useState(false);

  const value = {
    selectedStage,
    setSelectedStage,
    selectedLevel,
    setSelectedLevel,
    selectedWebcam,
    setSelectedWebcam,
    isFlip,
    setIsFlip,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
