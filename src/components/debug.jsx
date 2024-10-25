export const DebugStatus = ({ handResults, poseResults }) => {
    return (
      <div className="debug-status p-4 bg-gray-800 text-white rounded">
        <h3 className="text-lg font-bold">Detection Status</h3>
        
        <div className="hand-status">
          <h4 className="font-semibold">Hand Detection:</h4>
          {handResults && handResults.handednesses.length > 0 ? (
            handResults.handednesses.map((hand, index) => (
              <div key={index}>
                <span>Hand {index + 1}: {hand.category} (Confidence: {hand.confidence.toFixed(2)})</span>
              </div>
            ))
          ) : (
            <span>No hands detected.</span>
          )}
        </div>
  
        <div className="pose-status mt-2">
          <h4 className="font-semibold">Pose Detection:</h4>
          {poseResults && poseResults.landmarks.length > 0 ? (
            poseResults.landmarks.map((landmark, index) => (
              <div key={index}>
                <span>Landmark {index + 1}: X: {landmark.x.toFixed(2)}, Y: {landmark.y.toFixed(2)}, Z: {landmark.z.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <span>No pose detected.</span>
          )}
        </div>
      </div>
    );
  };
 