import React, { useEffect, useRef, useState } from 'react';
import SettingNavbar from '../../components/navbar.jsx';
import { Button } from '../../components/button.jsx';
import { FilesetResolver, HandLandmarker, PoseLandmarker } from '@mediapipe/tasks-vision';

const GamePage = () => {
  return (
    <>
      <Setting />
    </>
  ); 
};

const Setting = () => {
  const [selectedWebcam, setSelectedWebcam] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const handleVolumeChange = (type, value) => {
    console.log(`Volume for ${type}: ${value}`);
  };

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <div className='flex flex-col items-start justify-start'>
      <div className={`absolute top-0 ml-2 mt-20`}>
        <Button
          text={isNavbarVisible ? "ปิดตั้งค่า" : "เปิดตั้งค่า"}
          text_size="text-2xl"
          text_color="text-white"
          bg_color="bg-blue-500"
          width='w-36'
          py="py-2"
          onClick={toggleNavbar}
        />
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isNavbarVisible ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <SettingNavbar
          onSelectWebcam={setSelectedWebcam}
          onVolumeChange={handleVolumeChange}
          selectedWebcam={selectedWebcam}
        />
      </div>
      
      <div>
        <WebcamView selectedWebcam={selectedWebcam} />
      </div>
    </div>
  );
};

const WebcamView = () => {
  const [handLandmarker, setHandLandmarker] = useState(undefined);
  const [poseLandmarker, setPoseLandmarker] = useState(undefined);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [handResults, setHandResults] = useState(undefined);
  const [poseResults, setPoseResults] = useState(undefined);

  let lastVideoTime = -1;

  useEffect(() => {
    const createLandmarkers = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "node_modules/@mediapipe/tasks-vision/wasm"
      );

      const handLm = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "models/hand_landmarks.task",
          delegate: "GPU"
        },
        minHandDetectionConfidence: 0.4,
        minHandPresenceConfidence: 0.4,
        minTrackingConfidence: 0.4,
        numHands: 2
      });

      const poseLm = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `models/pose_landmarker_lite.task`,
          delegate: "GPU"
        },
        minPoseDetectionConfidence: 0.9,
        minPosePresenceConfidence: 0.9,
        minTrackingConfidence: 0.1,
        numPose: 1
      });

      setHandLandmarker(handLm);
      setPoseLandmarker(poseLm);
    };

    createLandmarkers();
  }, []);

  const enableCam = async () => {
    if (!handLandmarker || !poseLandmarker) {
      console.log("Wait! ObjectDetector not loaded yet.");
      return;
    }

    setWebcamRunning(!webcamRunning);
    if (webcamRunning) {
      let tracks = videoRef.current.srcObject?.getTracks();
      tracks?.forEach(track => track.stop());
      videoRef.current.style.display = "none";
    } else {
      videoRef.current.style.display = "inline-block";
      try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }
  };

  const predictWebcam = async () => {
    if (!webcamRunning) return;

    await DetectingVideo();

    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    DrawHandDetection(canvasCtx);
    DrawPoseDetection(canvasCtx);

    window.requestAnimationFrame(predictWebcam);
  };

  const DetectingVideo = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;

      setHandResults(handLandmarker.detectForVideo(video, startTimeMs));
      setPoseResults(poseLandmarker.detectForVideo(video, startTimeMs));
    }
  };

  const DrawPoseDetection = (ctx) => {
    if (poseResults && poseResults.landmarks.length > 0) {
      for (const landmark of poseResults.landmarks) {
        poseDrawingUtils.drawConnectors(ctx, landmark, PoseLandmarker.POSE_CONNECTIONS);
        poseDrawingUtils.drawLandmarks(ctx, landmark);
      }
    }
  };

  const DrawHandDetection = (ctx) => {
    if (handResults && handResults.handednesses.length > 0) {
      for (const landmark of handResults.landmarks) {
        handDrawingUtils.drawConnectors(ctx, landmark, HandLandmarker.HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 2
        });
        handDrawingUtils.drawLandmarks(ctx, landmark, {
          color: "#FF0000",
          lineWidth: 1
        });
      }
    }
  };

  return (
    <div className="webcam-container">
      <Button
        text={webcamRunning ? "ปิดกล้อง" : "เปิดกล้อง"}
        text_size="text-2xl"
        text_color="text-white"
        bg_color="bg-blue-500"
        py="py-2"
        onClick={enableCam}
      />
      <video ref={videoRef} style={{ display: 'none' }} playsInline autoPlay />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default GamePage;
