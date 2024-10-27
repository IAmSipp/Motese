import React, { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext();

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [masterVolume, setMasterVolume] = useState(50);
  const [musicVolume, setMusicVolume] = useState(50);
  const [effectVolume, setEffectVolume] = useState(50);
  const [motionCapture, setMotionCapture] = useState([false, false, false])
  const [poseStatus, setPoseStatus] = useState([false, false, false, false])

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
    motionCapture,
    setMotionCapture,
    poseStatus,
    setPoseStatus,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
