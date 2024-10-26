import React from 'react';
import { Button } from './button.jsx';

const SettingNavbar = ({ onSelectWebcam, onVolumeChange, selectedWebcam, onFlipCamera }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-20 bg-gray-800 text-white text-2xl flex justify-between items-center px-4 z-50">
      <div className="flex space-x-4 items-center">
      <div className="flex flex-col items-center">
          <label className="font-bold">เสียงหลัก</label>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-24 appearance-none h-2 bg-gray-300 rounded-lg"
            onChange={(e) => onVolumeChange('music', e.target.value)}
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
            onChange={(e) => onVolumeChange('music', e.target.value)}
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
            onChange={(e) => onVolumeChange('music', e.target.value)}
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
          <span className="ml-2">{selectedWebcam || 'ไม่เลือกกล้อง'}</span>
        </div>
        <div className="flex space-x-2 group">
          <Button 
            text="เลือกกล้อง" 
            text_size="text-2xl" 
            text_color="text-white" 
            bg_color="bg-gray-700" 
            width="w-44" 
            height="h-auto" 
            py="py-2"
            onClick={() => {}}
          />
          <ul className="absolute hidden group-hover:block bg-white text-black rounded mt-10 w-40 shadow-lg">
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => onSelectWebcam('Webcam 1')}
            >
              Webcam 1
            </li>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => onSelectWebcam('Webcam 2')}
            >
              Webcam 2
            </li>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => onSelectWebcam('Webcam 3')}
            >
              Webcam 3
            </li>
          </ul>
          <Button 
            text="กลับด้านกล้อง" 
            text_size="text-2xl" 
            text_color="text-white" 
            bg_color="bg-gray-700" 
            width="w-44" 
            height="h-auto" 
            py="py-2"
            onClick={onFlipCamera}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingNavbar;
