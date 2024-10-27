import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext.jsx';
import { useCameraContext } from '../../contexts/CameraContext.jsx';
import { useUser } from '../../contexts/UserContext.jsx';
import StageSelection from './StageSelectionPage.jsx';
import LevelSelection from './LevelSelectionPage.jsx';
import TutorialVideo from './TutorialPage.jsx';
import LoadingScreen from './LoadingPage.jsx';

import { Button } from '../../components/button.jsx';
import { FilesetResolver, HandLandmarker, PoseLandmarker, DrawingUtils } from '../../../public/Models/tasks_vision';
import useUnityInstance from '../../contexts/UnityContext.jsx';
import { useUnityContext } from 'react-unity-webgl';

const GamePage = () => {
  const [showStageSelection, setShowStageSelection] = useState(true);
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const [gameSelecting, setGameSelecting] = useState(true);
  const [loading, setLoading] = useState(true); 
  const { isLoaded } = useUnityContext();

  const handleStageSelect = () => {
    setShowStageSelection(false);
    setShowLevelSelection(true);
  };

  const handleLevelSelect = () => {
    setShowLevelSelection(false);
    setShowTutorial(true);
  };

  const handleTutorial = () => {
    setShowTutorial(false);
    setGameSelecting(false);
  };

  const loadUnity = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    setLoading(false);
  };

  useEffect(() => {
    loadUnity();
  }, [isLoaded]);

  return (
    <div className='flex flex-col h-screen w-screen'>
      {loading && <LoadingScreen />}

      {gameSelecting && 
        <div className={`absolute top-0 left-0 z-40 bg-gray-600`}>
          <div className="flex flex-col justify-center items-center w-screen h-screen">
            {showStageSelection && <StageSelection onSelect={handleStageSelect} />}
            {showLevelSelection && <LevelSelection onSelect={handleLevelSelect} />}
            {showTutorial && <TutorialVideo onSelect={handleTutorial} />}
          </div>
        </div>
      }

      <div className='h-12 z-50 bg-gray-800'>
        <Setting />
      </div>

      <div className='flex flex-row w-full h-full z-20'>
        <div className='flex flex-col items-center space-y-2 h-full w-[20%] bg-yellow-100 p-2'>
          <div className=' bg-blue-950 w-full h-[40%] rounded-lg'>
            <UserStatView />
          </div>
          <div className='flex flex-col w-full h-[50%]'>
            <WebcamView />
          </div>
        </div>


        <div className='flex-grow h-full bg-yellow-500'>
          <GameView />
        </div>
      </div>
    </div>
  );
};

const UserStatView = () => {
  const { userInformation } = useUser();
  const { selectedStage, selectedLevel } = useGameContext();

  const currentStages = userInformation.history.filter(data => 
    data.stage === selectedStage+1 && data.level === selectedLevel+1
  );
  let highScore = 0;
  currentStages.forEach(data => {
  highScore = Math.max(highScore, data.score);
  });

  return (
    <div className='flex flex-col space-y-2 p-3'>
      <h1 className='text-3xl text-center'>ข้อมูลผู้เล่น</h1>
      <div className='flex flex-col space-y-2 text-3xl'>
        <div className='flex flex-row items-center'>
          <h2>คุณคือ: {userInformation.username}</h2>
        </div>
        <div className='flex flex-row items-center'>
          <h2>ด่าน: {selectedStage+1}</h2>
        </div>
        <div className='flex flex-row items-center'>
          <h2>ความยาก: {selectedLevel+1}</h2>
        </div>
        <div className='flex flex-row items-center'>
          <h2>คะแนนสูงสุด: {highScore ? highScore : 0}</h2>
        </div>
      </div>
    </div>
  )
};

const Setting = () => {
  const { selectedWebcam, setSelectedWebcam, setIsFlip } = useCameraContext();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className={`transition-all duration-500 ease-in-out ${isNavbarVisible ? 'absolute top-1 ml-2 mt-20' : 'absolute top-0 m-2'}`}>
        <Button
          text={isNavbarVisible ? "ปิดตั้งค่า" : "เปิดตั้งค่า"}
          text_size="text-lg"
          text_color="text-white"
          bg_color="bg-blue-500"
          width='w-36'
          py="p-0"
          onClick={toggleNavbar}
        />
      </div>
      
      <div className={`transition-all duration-500 ease-in-out ${isNavbarVisible ? 'h-20 bg-blue-500 opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'}`}>
        <SettingNavbar/>
      </div>
    </div>
  );
};

const SettingNavbar = () => {
  const { selectedStage, selectedLevel, setSelectedStage, setSelectedLevel, setMasterVolume, setMusicVolume, setEffectVolume } = useGameContext();
  const { webcamList, selectedWebcam, setSelectedWebcam, setIsFlip } = useCameraContext([]);
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStageOpen, setIsStageOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  const stages = [
    { id: 1, name: 'ด่านที่ 1 กำมือ' },
    { id: 2, name: 'ด่านที่ 2 ยกมือ' },
  ];

  const levels = [
    { id: 1, name: 'ง่าย' },
    { id: 2, name: 'ปานกลาง' },
    { id: 3, name: 'ยาก' },
  ];

  const handleStageSelect = (stage) => {
    setSelectedStage(stage.id-1);
    setIsStageOpen(false);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level.id-1);
    setIsLevelOpen(false);
  };
  
  const ToggleFlipCamera = () => {
    setIsFlip(prev => !prev);
  }

  const SelectWebcam = (webcam) => {
    setSelectedWebcam(webcam);
  }

  const Back = () => {
    navigate("/profile");
  }

  return (
    <div className="fixed top-0 left-0 w-full h-20 bg-gray-800 text-white text-2xl flex justify-between items-center px-4 z-50">
      <div className="flex space-x-4 items-center">
        <div className="relative">
          <Button 
            text='กลับหน้าแรก'
            text_size='text-xl'
            width='w-28'
            py='p-1'
            onClick={Back}
          />
        </div>

        <div className="relative">
          <Button
            text='เลือกด่าน'
            text_size="text-xl"
            width="w-24"
            py="p-1"
            onClick={() => {
              setIsStageOpen(!isStageOpen);
              setIsLevelOpen(false);
            }}
          />
          {isStageOpen && (
            <ul className="absolute bg-white text-black rounded mt-2 w-48 shadow-lg">
              {stages.map((stage) => (
                <li
                  key={stage.id}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleStageSelect(stage)}
                >
                  {stage.name}{" "}{stage.id-1 == selectedStage ? "✔": ''}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <Button
            text='เลือกความยาก'
            text_size="text-xl"
            width="w-28"
            py="p-1"
            onClick={() => {
              setIsLevelOpen(!isLevelOpen);
              setIsStageOpen(false);
            }}
          />
          {isLevelOpen && (
            <ul className="absolute bg-white text-black rounded mt-2 w-40 shadow-lg">
              {levels.map((level) => (
                <li
                  key={level.id}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleLevelSelect(level)}
                >
                  {level.name}{" "}{level.id-1 == selectedLevel  ? "✔": ''}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="flex space-x-4 items-center">
        <div className="flex flex-col items-center">
          <label className="font-bold">เสียงหลัก</label>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-24 appearance-none h-2 bg-gray-300 rounded-lg"
            onChange={(e) => setMasterVolume(e.target.value)}
          />
          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              height: 16px;
              width: 16px;
              border-radius: 9999px; /* Full rounding */
              background-color: #4caf50; /* Green thumb */
              cursor: pointer;
            }
            
            input[type='range']::-moz-range-thumb {
              height: 16px;
              width: 16px;
              border-radius: 9999px;
              background-color: #4caf50;
              cursor: pointer;
            }
          `}</style>
        </div>

        <div className="flex flex-col items-center">
          <label className="font-bold">เสียงเพลง</label>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-24 appearance-none h-2 bg-gray-300 rounded-lg"
              onChange={(e) => setMusicVolume(e.target.value)}
            />
            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                appearance: none;
                height: 16px;
                width: 16px;
                border-radius: 9999px; /* Full rounding */
                background-color: #4caf50; /* Green thumb */
                cursor: pointer;
              }
              
              input[type='range']::-moz-range-thumb {
                height: 16px;
                width: 16px;
                border-radius: 9999px;
                background-color: #4caf50;
                cursor: pointer;
              }
            `}</style>
        </div>

        <div className="flex flex-col items-center">
          <label className="font-bold">เสียงเอฟเฟค</label>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-24 appearance-none h-2 bg-gray-300 rounded-lg"
              onChange={(e) => setEffectVolume(e.target.value)}
            />
            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                appearance: none;
                height: 16px;
                width: 16px;
                border-radius: 9999px; /* Full rounding */
                background-color: #4caf50; /* Green thumb */
                cursor: pointer;
              }
              
              input[type='range']::-moz-range-thumb {
                height: 16px;
                width: 16px;
                border-radius: 9999px;
                background-color: #4caf50;
                cursor: pointer;
              }
            `}</style>
        </div>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <div>
          <b>กล้อง: </b>
          <span className="ml-2">{selectedWebcam ? selectedWebcam.label : 'ไม่เลือกกล้อง'}</span>
        </div>
        <div className="relative space-x-2">
          <Button 
            text="เลือกกล้อง" 
            text_size="text-xl" 
            text_color="text-white" 
            bg_color="bg-gray-700" 
            width="w-28" 
            height="h-auto" 
            py="p-1"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        
          {isDropdownOpen && (
            <ul className="absolute bg-white text-black rounded mt-2 w-48 shadow-lg">
              {webcamList.map((webcam, index) => (
                <li
                  key={webcam.deviceId}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    SelectWebcam(webcam);
                    setIsDropdownOpen(false);
                  }}
                >
                  {webcam.label || `Webcam ${index + 1}`}{" "}{webcam.label == selectedWebcam.label ? "✔": ''}
                </li>
              ))}
            </ul>)}
          <Button 
            text="กลับด้านกล้อง" 
            text_size="text-xl" 
            text_color="text-white" 
            bg_color="bg-gray-700" 
            width="w-28" 
            height="h-auto" 
            py="p-1"
            onClick={ToggleFlipCamera}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

const WebcamView = () => {
  const { selectedWebcam, isFlip } = useCameraContext();
  const { motionCapture, setMotionCapture, poseStatus, setPoseStatus, selectedStage, selectedLevel } = useGameContext();

  const [handLandmarker, setHandLandmarker] = useState(undefined);
  const [poseLandmarker, setPoseLandmarker] = useState(undefined);

  const [webcamRunning, setWebcamRunning] = useState(false);
  const isWebcamRunningRef = useRef(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  let handResults, poseResults;
  let lastVideoTime = -1;
  
  useEffect(() => {
    const createLandmarkers = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks("Models/wasm");

        const hand_landmarks = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "Models/hand_model/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: 'VIDEO',
          minHandDetectionConfidence: 0.4,
          minHandPresenceConfidence: 0.4,
          minTrackingConfidence: 0.4,
          numHands: 2
        });

        const pose_landmarks = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "Models/pose_model/pose_landmarker_lite.task",
            delegate: "GPU"
          },
          runningMode: 'VIDEO',
          minPoseDetectionConfidence: 0.9,
          minPosePresenceConfidence: 0.9,
          minTrackingConfidence: 0.1,
          numPose: 1
        });

        setHandLandmarker(hand_landmarks);
        setPoseLandmarker(pose_landmarks);

      } catch (error) {
        console.error("Error loading FilesetResolver or landmarkers:", error);
      }
    };

    createLandmarkers();
  }, []);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      videoRef.current.style.transform = isFlip ? "scaleX(-1)" : "scaleX(1)";
      canvasRef.current.style.transform = isFlip ? "scaleX(-1)" : "scaleX(1)";
    }
  }, [isFlip]);

  const EnableWebcam = async () => {
    if (!handLandmarker || !poseLandmarker) {
      console.log("Wait! Landmarkers not loaded yet.");
      return;
    }

    
    if (isWebcamRunningRef.current) {
      DeactivateCam();
    } else {
      try {
        ActivateCam();
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }
  };

  const DeactivateCam = async () => {
    isWebcamRunningRef.current = false;
    setWebcamRunning(isWebcamRunningRef.current);

    let tracks = videoRef.current.srcObject?.getTracks();
      tracks?.forEach(track => track.stop());
  }

  const ActivateCam = async () => {
    isWebcamRunningRef.current = true;
    setWebcamRunning(isWebcamRunningRef.current);

    const constraints = {
      video: {
        deviceId: selectedWebcam ? {exact: selectedWebcam.deviceId} : undefined
      }
    };

    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
    videoRef.current.play();
    videoRef.current.addEventListener("loadeddata", () => PredictWebcam());
  }

  useEffect(() => {
    if (selectedWebcam && selectedWebcam.deviceId) {
      DeactivateCam();
    }
  }, [selectedWebcam]);

  const PredictWebcam = async () => {
    const canvasCtx = canvasRef.current.getContext("2d");

    while (isWebcamRunningRef.current) {
      await DetectingVideo();

      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      DrawHandDetection(canvasCtx);
      DrawPoseDetection(canvasCtx);

      HandlePoseAndInteract();

      await new Promise(resolve => setTimeout(resolve, 16));
    }

    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const DetectingVideo = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.videoWidth && video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const startTimeMs = performance.now();
      if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;

        try {
          const handDetection = handLandmarker.detectForVideo(video, startTimeMs);
          const poseDetection = poseLandmarker.detectForVideo(video, startTimeMs);

          handResults = handDetection;
          poseResults = poseDetection;
        } catch (error) {
          console.error("Error detecting landmarks:", error);
        }
      }
    } else {
      console.log("Video not playing or dimensions not available.");
    }
  };

  const DrawPoseDetection = (ctx) => {
    const draw = new DrawingUtils(ctx);
    if (poseResults && poseResults.landmarks.length > 0) {
      for (const landmark of poseResults.landmarks) {
        draw.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
        draw.drawLandmarks(landmark);
      }

      CheckCurrentArmPose();
    }

  };

  const DrawHandDetection = (ctx) => {
    const draw = new DrawingUtils(ctx);
    if (handResults && handResults.handednesses.length > 0) {
      for (const landmark of handResults.landmarks) {
        draw.drawConnectors(landmark, HandLandmarker.HAND_CONNECTIONS);
        draw.drawLandmarks(landmark);
      }

      CheckCurrentHandPose();
    }
  };

  let LHandFisting, RHandFisting;
  function CheckCurrentHandPose() {
    let LHandLandmarks, RHandLandmarks;

    if (handResults && handResults.landmarks.length > 0) {
      handResults.landmarks.sort((a, b) => a[0].x - b[0].x);

      if (handResults.landmarks.length > 1) {
        LHandLandmarks = handResults.landmarks[0];
        RHandLandmarks = handResults.landmarks[1];
      } else {
        const videoCenterX = videoRef.current.width / 2;
        if (handResults.landmarks[0][0].x < videoCenterX) {
          LHandLandmarks = handResults.landmarks[0];
        } else {
          RHandLandmarks = handResults.landmarks[1];
        }
      }

      const handCheckAngle = 70;

      if (LHandLandmarks) {
        const LHandAngle = FindAngle(LHandLandmarks[9], LHandLandmarks[10], LHandLandmarks[11]);
        LHandFisting = LHandAngle < handCheckAngle && LHandLandmarks[9].y < LHandLandmarks[0].y && !!poseResults;
      }

      if (RHandLandmarks) {
        const RHandAngle = FindAngle(RHandLandmarks[9], RHandLandmarks[10], RHandLandmarks[11]);
        RHandFisting = RHandAngle < handCheckAngle && RHandLandmarks[9].y < RHandLandmarks[0].y && !!poseResults;
      }
    }
  }

  let LArmUp, RArmUp;
  function CheckCurrentArmPose() {
    const LFirst = poseResults.landmarks[0][12];
    const LMid = poseResults.landmarks[0][14];
    const LLast = poseResults.landmarks[0][16];
    const RFirst = poseResults.landmarks[0][11];
    const RMid = poseResults.landmarks[0][13];
    const RLast = poseResults.landmarks[0][15];

    let LArmAngle = FindAngle(LFirst, LMid, LLast);
    let RArmAngle = FindAngle(RFirst, RMid, RLast);

    const armCheckAngle = 90;
    LArmUp = handResults ? LArmAngle >= armCheckAngle : false;
    RArmUp = handResults ? RArmAngle >= armCheckAngle : false;

  }

  const HandlePoseAndInteract = () => {
    const pose = [LHandFisting, RHandFisting, LArmUp, RArmUp];
    const flipPose = [RHandFisting, LHandFisting, RArmUp, LArmUp];

    GetPose(isFlip ? flipPose: pose);
  }

  const GetPose = (status) => {
    let leftHand = status[0];
    let rightHand = status[1];
    let leftArm = status[2];
    let rightArm = status[3];

    setPoseStatus([leftHand, rightHand, leftArm, rightArm]);

    if (selectedStage === 0) {
      setMotionCapture([
        leftHand && !rightHand,
        leftHand && rightHand,
        !leftHand && rightHand]
      );
    } else if (selectedStage === 1) {
      setMotionCapture([
        leftArm && !rightArm,
        leftArm && rightArm,
        !leftArm && rightArm]
      );
    }
  }

  function FindAngle(a, b, c) {
    const radian = Math.atan2(a.y - b.y, a.x - b.x) - Math.atan2(c.y - b.y, c.x - b.x);
    return radian * (180 / Math.PI);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative w-full h-full bg-pink-400">
        <video ref={videoRef} className="w-full h-full bg-black" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-30" />
      </div>
      <div className='mt-2'>
        <Button
          text={webcamRunning ? "ปิดกล้อง" : "เปิดกล้อง"}
          text_size="text-2xl"
          text_color="text-white"
          width="w-[100%]"
          bg_color="bg-blue-500"
          py="py-2"
          onClick={EnableWebcam}
        />
      </div>
    </div>
  );
};

const GameView = () => {
  const { motionCapture, poseStatus, selectedStage, selectedLevel, masterVolume, musicVolume, effectVolume } = useGameContext();
  const { Unity, unityProvider, isLoaded, sendMessage } = useUnityInstance(selectedStage, selectedLevel);

  const ChangeStage = (stage_index) =>{
    sendMessage("StageManager", "ChangeScene", stage_index);
  }

  const ChangeLevel = (level_index) =>{
    sendMessage("StageManager", "SelectDifficulty", level_index);
  }

  const SetMasterVolume = (volume) => {
    sendMessage("AudioManager", "ChangeMasterVolume", volume);
  };

  const SetMusicVolume = (volume) => {
    sendMessage("AudioManager", "ChangeMusicVolume", volume);
  };

  const SetEffectVolume = (volume) => {
    sendMessage("AudioManager", "ChangeEffectVolume", volume);
  };

  const MotionControl = () => {
    for (let i = 0; i < motionCapture.length; i++) {
      if (motionCapture[i] == true) {
        sendMessage("MotionManager", "GetMotion", i + 1);
      } else {
        sendMessage("MotionManager", "GetMotion", -i - 1);
      }
    }
  };

  const PoseStatus = () => {
    for (let i = 0; i < poseStatus.length; i++) {
      if (poseStatus[i] == true) {
        sendMessage("MotionManager", "GetPose", i + 1);
      } else {
        sendMessage("MotionManager", "GetPose", -i - 1);
      }
    }
  }

  useEffect(() => {
    SetMasterVolume(parseInt(masterVolume));
  }, [masterVolume]);

  useEffect(() => {
    SetMusicVolume(parseInt(musicVolume));
  }, [musicVolume]);

  useEffect(() => {
    SetEffectVolume(parseInt(effectVolume));
  }, [effectVolume]);

  useEffect(() => {
    ChangeStage(selectedStage)
  }, [selectedStage])
  
  useEffect(() => {
    ChangeLevel(selectedLevel)
  }, [selectedLevel])

  useEffect(() => {
    ChangeStage(selectedStage)
    ChangeLevel(selectedLevel)
  }, [isLoaded])

  useEffect(() => {
    MotionControl();
  }, [motionCapture])
  
  useEffect(() => {
    PoseStatus();
  }, [poseStatus])

  useEffect(() => {
    ChangeStage(selectedStage)
    ChangeLevel(selectedLevel)
  }, [isLoaded])


  return (
    <div className='flex items-center justify-center w-full h-full bg-black'>
      <Unity
        className='w-[90%] h-auto'
        unityProvider={unityProvider}
      />
    </div>
  );
};

export default GamePage;
