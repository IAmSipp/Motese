import { Unity, useUnityContext } from "react-unity-webgl";

const useUnityInstance = () => {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "Build/GameBuild.loader.js",
    dataUrl: "Build/GameBuild.data",
    frameworkUrl: "Build/GameBuild.framework.js",
    codeUrl: "Build/GameBuild.wasm",
  });

  return { Unity, unityProvider, sendMessage };
};

export default useUnityInstance;
