import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

const useUnityInstance = (selectedStage, selectedLevel) => {
  const { unityContext, unityProvider, isLoaded, sendMessage, unload } = useUnityContext({
    loaderUrl: "Build/GameBuild.loader.js",
    dataUrl: "Build/GameBuild.data",
    frameworkUrl: "Build/GameBuild.framework.js",
    codeUrl: "Build/GameBuild.wasm",
  });

  return { Unity, unityProvider, isLoaded, sendMessage, unload };
};

export default useUnityInstance;
