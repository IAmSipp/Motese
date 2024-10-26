import React, { createContext, useState, useContext, useEffect } from 'react'; // Import useEffect

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
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setWebcamList(videoDevices);
      } catch (error) {
        console.error("Error fetching webcams:", error);
      }
    };
    
    fetchWebcams();}, []
  );

  useEffect(() => {
   setSelectedWebcam(webcamList[0])
    }, [webcamList]
  );

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
