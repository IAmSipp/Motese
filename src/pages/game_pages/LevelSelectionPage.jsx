import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext.jsx';
import { Button } from '../../components/button.jsx';

const LevelSelection = () => {
  const navigate = useNavigate();
  const { setSelectedLevel } = useGame();

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    console.log(`Selected Level: ${level}`);
    navigate(`/tutorial`);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-6xl font-bold mb-8">เลือกระดับ</h1>

      <div className="flex flex-col space-y-6">
        <Button 
          text="ง่าย" 
          text_size="text-4xl"
          width="w-80"
          height="h-20"
          py="py-6"
          rounded="rounded-lg"
          onClick={() => handleLevelSelect('ง่าย')} 
        />

        <Button 
          text="ปานกลาง" 
          text_size="text-4xl"
          width="w-80"
          height="h-20"
          py="py-6"
          rounded="rounded-lg"
          onClick={() => handleLevelSelect('ปานกลาง')} 
        />

        <Button 
          text="ยาก" 
          text_size="text-4xl"
          width="w-80"
          height="h-20"
          py="py-6"
          rounded="rounded-lg"
          onClick={() => handleLevelSelect('ยาก')} 
        />
      </div>
    </div>
  );
};

export default LevelSelection;
