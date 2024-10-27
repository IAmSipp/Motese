import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

const useUnityInstance = (selectedStage, selectedLevel) => {
  const { unityProvider, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: "Build/GameBuild.loader.js",
    dataUrl: "Build/GameBuild.data",
    frameworkUrl: "Build/GameBuild.framework.js",
    codeUrl: "Build/GameBuild.wasm",
  });

  return { Unity, unityProvider, isLoaded, sendMessage };
};

export default useUnityInstance;
