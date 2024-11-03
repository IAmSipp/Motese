import React, { createContext, useState, useContext, useEffect } from 'react';

const CameraContext = createContext();

export const useCameraContext = () => {
  return useContext(CameraContext);
};

export const CameraProvider = ({ children }) => {
  const [selectedWebcam, setSelectedWebcam] = useState(null);
  const [isFlip, setIsFlip] = useState(false);
  const [webcamList, setWebcamList] = useState([]);

  useEffect(() => {
    const fetchWebcams = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setWebcamList(videoDevices);

        if (videoDevices.length > 0) {
          setSelectedWebcam(videoDevices[0]);
        } else {
          setSelectedWebcam(null);
        }
      } catch (error) {
        console.error("Error fetching webcams:", error);
      }
    };

    fetchWebcams();
  }, []);

  useEffect(() => {
    if (webcamList.length > 0 && !selectedWebcam) {
      setSelectedWebcam(webcamList[0]);
    }
  }, [webcamList, selectedWebcam]);

  const value = {
    webcamList,
    setWebcamList,
    selectedWebcam,
    setSelectedWebcam,
    isFlip,
    setIsFlip,
  };

  return (
    <CameraContext.Provider value={value}>
      {children}
    </CameraContext.Provider>
  );
};
