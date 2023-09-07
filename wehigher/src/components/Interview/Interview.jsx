import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Webcam from 'react-webcam';
import {
  HandLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import { CheckHandness } from './utils/angle';
import { signApi } from '../../api/interviewApi';
import './Interview.css';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import api from '../../Axios.js';

const Interview = () => {
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [results, setResults] = useState(null);

  const [userName, setUserName] = useState('');
  const [schoolRecordId, setSchoolRecordId] = useState('');

  const webcamRef = React.useRef(null);

  // useEffect(() => {
  //   const createHandLandmarker = async () => {
  //     const vision = await FilesetResolver.forVisionTasks(
  //       'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
  //     );
  //     const handLandmarker = await HandLandmarker.createFromOptions(vision, {
  //       baseOptions: {
  //         modelAssetPath:
  //           'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
  //         delegate: 'GPU',
  //       },
  //       runningMode: 'VIDEO', // Default to video mode
  //       numHands: 2,
  //     });
  //     setHandLandmarker(handLandmarker);
  //   };
  //   createHandLandmarker();
  // }, []);

  // useEffect(() => {
  //   const predictWebcam = async () => {

  //     if (!handLandmarker) {
  //       console.log('미디어파이프 로드중 ...');
  //       return;
  //     }

  //     setWebcamRunning(!webcamRunning);

  //     if (!webcamRunning) {
  //       // Start the webcam
  //       navigator.mediaDevices
  //         .getUserMedia({ video: true })
  //         .then((stream) => {
  //           webcamRef.current.srcObject = stream;
  //         });

  //       // Set the running mode to video
  //       handLandmarker.setOptions({ runningMode: 'VIDEO' });
  //     }

  //     if (handLandmarker && webcamRunning) {
  //       const video = webcamRef.current.video;

  //       // Detect hands in the webcam feed
  //       const startTimeMs = performance.now();
  //       const results = await handLandmarker.detectForVideo(video, startTimeMs);
  //       const result = await CheckHandness(results);

  //       if (result !== null) {
  //         resultsArray.push(result);
  //         frameCount++;
  //       }

  //       // Check if 30 frames have been collected
  //       if (frameCount === 30) {

  //         if (resultsArray.length === 30) {
  //           // API 통신
  //           signApi(resultsArray).then((res) => {
  //             console.log(res);
  //           });
  //         }

  //         // Reset the frame count
  //         frameCount = 0;
  //         resultsArray = [];
  //       }

  //       // setResults(results);
  //       // Request the next frame
  //       requestAnimationFrame(predictWebcam);
  //     }
  //   };

  //   let frameCount = 0;
  //   let resultsArray = [];

  //   predictWebcam();
  // }, [webcamRunning, handLandmarker]);

  // useEffect(() => {
  //   //  API 호출
  //   api
  //     .get('/user')
  //     .then((response) => {
  //       setUserName(response.data.name);
  //       const userSchoolRecordId = response.data.schoolRecordId;
  //       setSchoolRecordId(userSchoolRecordId);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user name:', error);
  //     });
  // }, []);

  return (
    <>
      <AppContainer>
        <Navbar userName={userName} />
        <ContentContainer>
          <LeftContainer>
            <Sidebar userName={userName} />
          </LeftContainer>
          <RightContainer>
            <WebcamContainer>
              <WebcamWrapper>
                <Webcam
                  audio={false}
                  style={{ visibility: "visible" }}
                  width={1024}
                  height={768}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ width: 1024, height: 768, facingMode: "user" }}
                  className='Webcam'
                />
              </WebcamWrapper>
            </WebcamContainer>
          </RightContainer>
        </ContentContainer>
      </AppContainer >
    </>
  );
};
const AppContainer = styled.div`
  /* 전체 앱 컨테이너 스타일 */
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
`;

const ContentContainer = styled.div`
  /* 콘텐츠 컨테이너 스타일 */
  display: flex;
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
`;

const SidebarContainer = styled.div`
  /* 사이드바 컨테이너 스타일 */
  width: 250px; /* 원하는 너비로 조절 */
  background-color: #333; /* 원하는 배경색 지정 */
  color: white;
  padding: 16px;
`;

const MainContent = styled.div`
  /* 메인 콘텐츠 스타일 */
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
  padding: 16px;
`;

const WebcamWrapper = styled.div`
  /* 웹캠 래퍼 스타일 */
  border: 2px solid #ccc;
  border-radius: 8px;
`;

const WebcamContainer = styled.div`
  border: 2px solid #ccc; /* 테두리 스타일 설정 */
  border-radius: 5px; /* 테두리 둥글기 설정 */
  overflow: hidden; /* 넘치는 부분 숨김 */
  width: 80%; /* 웹캠 컨테이너의 너비 지정 */
  max-width: 1280px; /* 최대 너비 설정 */
  margin-left: 150px;
  display: flex; /* 내부 요소들을 가로로 나열 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const LeftContainer = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const RightContainer = styled.div`
  position: relative;
  width: 80vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Interview;
