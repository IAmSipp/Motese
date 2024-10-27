import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext.jsx';
import { Button } from '../../components/button.jsx';

const LevelSelection = ({ onSelect }) => {
  const { setSelectedLevel } = useGameContext();

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    onSelect();
    console.log(`Selected Level: ${level}`);
  };

  return (
    <div className='fixed top-0 left-0 z-50'>
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
            onClick={() => handleLevelSelect(0)} 
          />

          <Button 
            text="ปานกลาง" 
            text_size="text-4xl"
            width="w-80"
            height="h-20"
            py="py-6"
            rounded="rounded-lg"
            onClick={() => handleLevelSelect(1)} 
          />

          <Button 
            text="ยาก" 
            text_size="text-4xl"
            width="w-80"
            height="h-20"
            py="py-6"
            rounded="rounded-lg"
            onClick={() => handleLevelSelect(2)} 
          />
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;
