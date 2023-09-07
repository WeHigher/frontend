import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Webcam from 'react-webcam';
import {
  HandLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import { CheckHandness } from './utils/angle';
import { signApi, sentenceCreate } from '../../api/interviewApi';
import './Interview.css';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { api } from '../../Axios.js';

const Interview = () => {
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [webcamRunning, setWebcamRunning] = useState(false);

  const [userName, setUserName] = useState('');
  const [schoolRecordId, setSchoolRecordId] = useState('');

  const webcamRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [subtitle, setSubtitle] = useState([]);

  useEffect(() => {
    const createHandLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
      );
      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO', // Default to video mode
        numHands: 2,
      });
      setHandLandmarker(handLandmarker);
    };
    createHandLandmarker();
  }, []);

  useEffect(() => {
    const predictWebcam = async () => {

      if (!handLandmarker) {
        console.log('미디어파이프 로드중 ...');
        return;
      }

      setWebcamRunning(!webcamRunning);

      if (!webcamRunning) {
        
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            webcamRef.current.srcObject = stream;
          });

        handLandmarker.setOptions({ runningMode: 'VIDEO' });
      }

      if (handLandmarker && webcamRunning) {
        const video = webcamRef.current.video;
        const startTimeMs = performance.now();
        const results = await handLandmarker.detectForVideo(video, startTimeMs);
        const result = await CheckHandness(results);

        if (result !== null) {
          resultsArray.push(result);
          frameCount++;
        }

        if (resultsArray.length === 30 && frameCount === 30) {
          // API 통신
          signApi(resultsArray).then((res) => {
            // 
            const answerArr = JSON.parse(localStorage.getItem('wordArray') || '[]');
            answerArr.push(res.data);
            localStorage.setItem('wordArray', JSON.stringify(answerArr));
          });
          frameCount = 0;
          resultsArray = [];
        }

        requestAnimationFrame(predictWebcam);
      }
    };

    let frameCount = 0;
    let resultsArray = [];

    predictWebcam();
  }, [webcamRunning, handLandmarker]);

  useEffect(() => {
    //  API 호출
    api
      .get('/user')
      .then((response) => {
        setUserName(response.data.name);
        const userSchoolRecordId = response.data.schoolRecordId;
        setSchoolRecordId(userSchoolRecordId);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  }, []);

  useEffect(() => {
    const questionString = localStorage.getItem('messageLines');
    const questionStringArray = JSON.stringify(questionString);

    if(Array.isArray(questionStringArray)){
      setQuestion(questionStringArray);
    }

  },[]);
  
  const subtitlePrint = (currentIndex) => {
    setSubtitle([
      ...subtitle,
      { question : question[currentIndex], answer : answer[currentIndex]}
    ]);
  };
  const handleClick = () => {
    // localStorage에서 wordArray 가져오기
    const wordArray = JSON.parse(localStorage.getItem('wordArray') || '[]');

    if (wordArray === []){
      return;
    }
    
    try {
      
      sentenceCreate(wordArray).then((res) => {
        const receiveSentence = res;
        console.log(receiveSentence);
        const answerArray = answer;
        answerArray.push(receiveSentence);
        subtitlePrint(currentIndex)
        setAnswer(answerArray);
        setCurrentIndex(currentIndex + 1);
      });
    } catch (error) {
      console.error('데이터 전송 중 오류 발생', error);
    }

  };

  return (
    <AppContainer>
      <Header>
        <Navbar userName={userName} />
      </Header>
    <ContentContainer>
      <LeftContainer>
        <Sidebar userName={userName} />
      </LeftContainer>
      <CameraContainer>
        <WebcamContainer>
            <Webcam
              audio={false}
              
              width={1024}
              height={768}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
              className='Webcam'
            />
        </WebcamContainer>
        <Button onClick={handleClick}>답변 전송</Button>
      </CameraContainer>
      <SubtitleContainer>
        {
          subtitle.map((item, index) =>{
            <div key = {index} className = "subtitle">
              <div>{item.question}</div>
              <div>{item.answer}</div>
            </div>
          })
        }
      </SubtitleContainer>
    </ContentContainer>
  </AppContainer >
  );
};

const Header = styled.div`
  display :fixed;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100vh; 
`;

const LeftContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
`;

const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  margin-left : 100px;
  margin-right : 20px;
`;

const WebcamContainer = styled.div`
  display : flex;
`;

const Button = styled.button`
  background-color: #0074cc;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px; /* 원하는 여백 조정 */
`;

const SubtitleContainer = styled.div`
  display : flex;
  flex-direction : column;
  justify-content: center;
`;

export default Interview;
