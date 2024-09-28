import React, { useEffect } from 'react';

const GameBuild = () => {
  useEffect(() => {
    const container = document.querySelector("#unity-container");
    const canvas = document.querySelector("#unity-canvas");
    const loadingBar = document.querySelector("#unity-loading-bar");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const fullscreenButton = document.querySelector("#unity-fullscreen-button");
    const warningBanner = document.querySelector("#unity-warning");

    function unityShowBanner(msg, type) {
      function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? "block" : "none";
      }
      const div = document.createElement("div");
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type === "error") div.style = "background: red; padding: 10px;";
      else {
        if (type === "warning") div.style = "background: yellow; padding: 10px;";
        setTimeout(() => {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    }

    const buildUrl = "../../public/Build"; // Adjust path based on your Unity build output
    const loaderUrl = `${buildUrl}/GameBuild.loader.js`;
    const config = {
      dataUrl: `${buildUrl}/GameBuild.data`,
      frameworkUrl: `${buildUrl}/GameBuild.framework.js`,
      codeUrl: `${buildUrl}/GameBuild.wasm`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Motese",
      productVersion: "1.0",
      showBanner: unityShowBanner,
    };

    loadingBar.style.display = "flex";
    loadingBar.style.justifyContent = "center";
    loadingBar.style.alignItems = "center";
    loadingBar.style.flexDirection = "column";

    let poseStatus = [];
    let curentPoseStatus = [];
    let currentStage = 1;
    let currentLevel = 1;

    function GetPose(pose) {
      const leftHand = pose[0];
      const rightHand = pose[1];
      const leftArm = pose[2];
      const rightArm = pose[3];

      curentPoseStatus = [leftHand, rightHand, leftArm, rightArm];

      if (currentStage === 1) {
        poseStatus = [
          leftHand && !rightHand,
          leftHand && rightHand,
          !leftHand && rightHand,
        ];
      } else if (currentStage === 2) {
        poseStatus = [
          leftArm && !rightArm,
          leftArm && rightArm,
          !leftArm && rightArm,
        ];
      }
    }

    let unityInstance = null;
    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      // CREATE UNITY INSTANCE
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.innerHTML = "กำลังโหลด รอสักครู่...";
      })
        .then((instance) => {
          unityInstance = instance;
          setTimeout(() => {
            loadingBar.style.display = "none";
          }, 2000);
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
          InteractWithUnity();
          ChangeStage(0);
          ChangeLevel(0);
          AudioMasterSetting(50);
          AudioMusicSetting(100);
          AudioEffectSetting(100);
          SendUserData();
        })
        .catch((message) => {
          alert(message);
        });
    };

    // CHANGE UNITY STAGE
    const ChangeStage = (i) => {
      unityInstance.SendMessage("StageManager", "ChangeScene", i);
      currentStage = i + 1;
    };

    const ChangeLevel = (i) => {
      unityInstance.SendMessage("StageManager", "SelectDifficulty", i);
      currentLevel = i + 1;
    };

    const InteractWithUnity = () => {
      for (let i = 0; i < poseStatus.length; i++) {
        if (poseStatus[i] === true) {
          unityInstance.SendMessage("MotionManager", "GetMotion", i + 1);
        } else {
          unityInstance.SendMessage("MotionManager", "GetMotion", -i - 1);
        }
      }
      for (let i = 0; i < curentPoseStatus.length; i++) {
        if (curentPoseStatus[i] === true) {
          unityInstance.SendMessage("MotionManager", "GetPose", i + 1);
        } else {
          unityInstance.SendMessage("MotionManager", "GetPose", -i - 1);
        }
      }
    };

    const AudioMasterSetting = (sound) => {
      unityInstance.SendMessage("AudioManager", "ChangeMasterVolume", sound);
    };

    const AudioMusicSetting = (sound) => {
      unityInstance.SendMessage("AudioManager", "ChangeMusicVolume", sound);
    };

    const AudioEffectSetting = (sound) => {
      unityInstance.SendMessage("AudioManager", "ChangeEffectVolume", sound);
    };

    let username = sessionStorage.getItem("username");

    const SendUserData = () => {
      if (!username || username === "") {
        console.error("Username is not set in sessionStorage.");
        return;
      }
      console.log("Username is: " + username);
      unityInstance.SendMessage("UserParameters(Clone)", "GetData", username);
    };

    document.body.appendChild(script);

    // Cleanup function to remove script when the component unmounts
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="unity-container" style={{ width: '100%', height: '100vh' }}>
      <canvas id="unity-canvas" className='w-96 h-auto'/>
      <div id="unity-loading-bar" style={{ display: 'none' }}>
        <div id="unity-progress-bar-full" style={{ width: '0%', backgroundColor: '#f00' }}></div>
      </div>
      <button id="unity-fullscreen-button">Fullscreen</button>
      <div id="unity-warning" />
    </div>
  );
};

export default GameBuild;
