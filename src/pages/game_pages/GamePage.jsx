import React, { useEffect, useRef, useState } from 'react';
import SettingNavbar from '../../components/navbar.jsx';
import { useGame } from '../../contexts/GameContext.jsx';
import { Button } from '../../components/button.jsx';
import { FilesetResolver, HandLandmarker, PoseLandmarker, DrawingUtils } from '../../../public/Models/tasks_vision';
import useUnityInstance from '../../contexts/UnityContext.jsx';

const GamePage = () => {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <div className='h-12 z-50 bg-gray-800'>
        <Setting />
      </div>

      <div className='flex flex-row w-full h-full'>
        <div className='flex flex-col items-center space-y-2 h-full w-[20%] bg-yellow-100 p-2'>
          <div className=' bg-red-500 w-full h-[40%]'>
            <p className='text-white text-center w-full'>User Stats Section</p>
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

const Setting = () => {
  const { selectedWebcam, setSelectedWebcam, isFlip, setIsFlip } = useGame();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const toggleFlipCamera = () => {
    setIsFlip(prev => !prev);
  }

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
        <SettingNavbar
          onSelectWebcam={setSelectedWebcam}
          // onVolumeChange={}
          onFlipCamera={toggleFlipCamera}
          selectedWebcam={selectedWebcam}
        />
      </div>
    </div>
  );
};

const WebcamView = () => {
  const { selectedWebcam, setSelectedWebcam, isFlip, setIsFlip } = useGame();
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

    isWebcamRunningRef.current = !isWebcamRunningRef.current;
    setWebcamRunning(isWebcamRunningRef.current);

    if (!isWebcamRunningRef.current) {
      let tracks = videoRef.current.srcObject?.getTracks();
      tracks?.forEach(track => track.stop());
    } else {
      try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        videoRef.current.addEventListener("loadeddata", () => PredictWebcam());
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }
  };

  const PredictWebcam = async () => {
    const canvasCtx = canvasRef.current.getContext("2d");

    while (isWebcamRunningRef.current) {
      await DetectingVideo();

      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      DrawHandDetection(canvasCtx);
      DrawPoseDetection(canvasCtx);

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

    GetPose(
      (arg = () => {
        return isFlip ? flipPose : pose;
      })
    );
  }

  function FindAngle(a, b, c) {
    const radian = Math.atan2(a.y - b.y, a.x - b.x) - Math.atan2(c.y - b.y, c.x - b.x);
    return radian * (180 / Math.PI);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative w-full h-full bg-pink-400">
        <video ref={videoRef} className="w-full h-full bg-black" />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-40" />
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
  const { Unity, unityProvider, sendMessage } = useUnityInstance();

  const sendDataToUnity = () => {
    sendMessage('AudioManager', 'ChangeMasterVolume', 0);
  };

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
