import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext.jsx';
import { Button } from '../../components/button.jsx';

const StageSelection = ({ onSelect }) => {
  const { setSelectedStage } = useGameContext();

  const handleStageSelect = (stage) => {
    setSelectedStage(stage);
    onSelect();
    console.log(`Selected Stage: ${stage}`);
  };

  return (
    <div className='fixed top-0 left-0 z-50'>
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <h1 className="text-6xl font-bold mb-8">เลือกด่าน</h1>

        <div className="flex flex-col space-y-6">
          <Button 
            text="ด่านที่ 1" 
            text_size="text-4xl"
            width="w-80"
            height="h-20"
            py="py-6"
            rounded="rounded-lg"
            onClick={() => handleStageSelect(0)} 
          />

          <Button 
            text="ด่านที่ 2" 
            text_size="text-4xl"
            width="w-80"
            height="h-20"
            py="py-6"
            rounded="rounded-lg"
            onClick={() => handleStageSelect(1)} 
          />
        </div>
      </div>
    </div>
  );
};

export default StageSelection;
