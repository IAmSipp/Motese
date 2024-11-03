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
      <h1 className="xl:text-8xl 2xl:text-9xl font-bold mb-8">เลือกความยาก</h1>

        <div className="flex flex-col space-y-6">
          <Button 
            text="ง่าย" 
            text_size="xl:text-7xl 2xl:text-9xl"
            width="w-6/6"
            height="w-6/6"
            py="py-6"
            rounded="rounded-lg"
            onClick={() => handleLevelSelect(0)} 
          />

          <Button 
            text="ปานกลาง" 
            text_size="xl:text-7xl 2xl:text-9xl"
            width="w-6/6"
            height="w-6/6"
            py="py-6"
            rounded="rounded-lg"
            onClick={() => handleLevelSelect(1)} 
          />

          <Button 
            text="ยาก" 
            text_size="xl:text-7xl 2xl:text-9xl"
            width="w-6/6"
            height="w-6/6"
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
