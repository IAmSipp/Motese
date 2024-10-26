import React, { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext();

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [selectedStage, setSelectedStage] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [masterVolume, setMasterVolume] = useState(50);
  const [musicVolume, setMusicVolume] = useState(50);
  const [effectVolume, setEffectVolume] = useState(50);

  const value = {
    selectedStage,
    setSelectedStage,
    selectedLevel,
    setSelectedLevel,
    masterVolume,
    setMasterVolume,
    musicVolume,
    setMusicVolume,
    effectVolume,
    setEffectVolume,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
