import React, { useEffect } from 'react';
import { Button } from '../../components/button.jsx';
import { useGameContext } from '../../contexts/GameContext.jsx';

const TutorialVideo = ({ onSelect }) => {
  const { selectedStage } = useGameContext();

  const playTutorialVideo = (videoNumber) => {
    const videoElement = document.getElementById('tutorialVideo');

    const videoSources = {
      1: '../../../videos/stage1.mp4',
      2: '../../../videos/stage2.mp4',
    };

    if (videoSources[videoNumber]) {
      videoElement.src = videoSources[videoNumber];
      videoElement.load();
      videoElement.play();
    } else {
      console.error('Invalid video number');
    }
  };

  useEffect(() => {
    if (selectedStage !== null) {
      playTutorialVideo(selectedStage+1);
    }
  }, []);

  const skipTutorial = () => {
    console.log('Tutorial skipped');
    onSelect();
  };

  return (
    <div className='fixed top-5 left-0 z-50'>
      <div className="flex flex-col justify-center items-center w-screen h-screen text-black">
        <div className="flex flex-col justify-center items-center tutorial-video-container bg-yellow-100 shadow-lg p-8 rounded-3xl">
          <h1 className="text-5xl font-bold mb-8 text-center">วิดีโอฝึกสอนด่านที่ {selectedStage+1}</h1>
          
          <video id="tutorialVideo" width="640px" height="480px" controls className="rounded-lg mb-8">
            Your browser does not support the video tag.
          </video>

          <Button 
            text="ข้ามวิดีโอฝึกสอน" 
            text_size="text-3xl"
            bg_color="bg-orange-400"
            width="w-80"
            height="h-16"
            py="py-4"
            rounded="rounded-lg"
            onClick={skipTutorial}
          />
        </div>
      </div>
    </div>
  );
};

export default TutorialVideo;
