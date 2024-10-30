import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/button.jsx';


const ProfilePage = () => {
  const { userInformation } = useUser();
  const [highScores, setHighScores] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [highScoreDisplay, setHighScoreDisplay] = useState("คะแนนสูงสุดที่เคยทำได้: (โปรดเลือกด่านและระดับก่อน)");

  useEffect(() => {
    if (userInformation && userInformation.history) {
      calculateHighScores(userInformation.history);
      filterHistory(userInformation.history);
    }
  }, [userInformation, selectedStage, selectedLevel]);

  const calculateHighScores = (historyData) => {
    const stageCount = 2;
    const levelCount = 3;
    const highScoreData = Array.from({ length: stageCount }, () => Array(levelCount).fill(0));

    historyData.forEach((element) => {
      const stageIndex = element.stage - 1;
      const levelIndex = element.level - 1;

      if (stageIndex >= 0 && stageIndex < stageCount && levelIndex >= 0 && levelIndex < levelCount) {
        if (element.score > highScoreData[stageIndex][levelIndex]) {
          highScoreData[stageIndex][levelIndex] = element.score;
        }
      }
    });

    setHighScores(highScoreData);
  };

  const filterHistory = (historyData) => {
    let filtered = historyData.filter((element) => {
      if (selectedStage === 'all' && selectedLevel === 'all') return true;
      if (selectedStage === 'all') return element.level == selectedLevel;
      if (selectedLevel === 'all') return element.stage == selectedStage;
      return element.stage == selectedStage && element.level == selectedLevel;
    });
    setFilteredHistory(filtered);

    const stageIndex = selectedStage === 'all' ? -1 : selectedStage - 1;
    const levelIndex = selectedLevel === 'all' ? -1 : selectedLevel - 1;

    if (stageIndex >= 0 && levelIndex >= 0 && highScores[stageIndex] && highScores[stageIndex][levelIndex] !== undefined) {
      setHighScoreDisplay(`คะแนนสูงสุดที่เคยทำได้: ${highScores[stageIndex][levelIndex]}`);
    } else {
      setHighScoreDisplay("คะแนนสูงสุดที่เคยทำได้: (โปรดเลือกด่านและระดับก่อน)");
    }
  };

  const handleStageChange = (e) => setSelectedStage(e.target.value);
  const handleLevelChange = (e) => setSelectedLevel(e.target.value);

  const getLevelName = (level) => {
    switch (parseInt(level)) {
      case 1:
        return 'ง่าย';
      case 2:
        return 'ปานกลาง';
      case 3:
        return 'ยาก';
      default:
        return '';
    }
  };

  return (
    <div className="bg-[#7077a1] text-black flex flex-col justify-center items-center w-screen mt-4 font-semibold">
      {userInformation ? (
        <div className="flex flex-col items-center bg-[#e8e9a1] rounded-3xl p-6 w-10/12">
          <h1 className="text-6xl font-bold">ชื่อของคุณ:</h1>
          <h2 className="text-4xl">{highScoreDisplay}</h2>

          <div className="flex flex-row space-x-2 items-center mb-2">
            <label className="mb-2 text-4xl">เลือกด่าน:</label>
            <select
              value={selectedStage}
              onChange={handleStageChange}
              className="bg-red-300 border-2 text-2xl border-black rounded-lg py-1 px-3 mb-3"
            >
              <option value="all" className='font-bold'>ทั้งหมด</option>
              <option value="1" className='font-bold'>ด่านที่ 1</option>
              <option value="2" className='font-bold'>ด่านที่ 2</option>
            </select>

            <label className="mb-2 text-4xl">เลือกระดับ:</label>
            <select
              value={selectedLevel}
              onChange={handleLevelChange}
              className="bg-red-300 border-2 text-2xl border-black rounded-lg py-1 px-3 mb-4"
            >
              <option value="all" className='font-bold'>ทั้งหมด</option>
              <option value="1" className='font-bold'>ง่าย</option>
              <option value="2" className='font-bold'>ปานกลาง</option>
              <option value="3" className='font-bold'>ยาก</option>
            </select>
          </div>

          <div className="user-history overflow-y-auto border-4 border-black rounded-2xl p-2 w-full h-80">
            <ul className="list-none">
              {filteredHistory.map((element, index) => (
                <li key={index} className="bg-white border border-black text-4xl rounded-lg p-2 my-1 font-extrabold">
                  วันที่: {element.date}, เวลา: {element.time} <br />
                  ด่านที่: {element.stage} ({getLevelName(element.level)}) <br />
                  คะแนน: {element.score}, ความแม่นยำ: {element.accuracy}, เกรด: {element.rank}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between space-x-2 w-full mt-4">
            <Link to="/checkuser">
                <Button text="กลับไปหน้าหลัก" text_size="text-4xl" bg_color="bg-red-300" />
            </Link> 

            <Link to="/game">
              <Button text="เล่นเกม" text_size="text-4xl" bg_color="bg-red-300"/>
            </Link>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl text-white">กำลังโหลดข้อมูลผู้ใช้...</h1>
      )}
    </div>
  );
};

export default ProfilePage;