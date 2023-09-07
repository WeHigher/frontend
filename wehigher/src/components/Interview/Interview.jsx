import React, { useEffect } from 'react';

function InterviewComponent() {
    useEffect(() => {
        // 웹캠 시작 코드 (startWebcam 함수 내용)
        const webcamVideo = document.getElementById("webcam-video");

        async function startWebcam() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                webcamVideo.srcObject = stream;
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        }

        startWebcam();
    }, []); // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div className="card2 mb-4">
            <div className="card-header">
                모의 면접 1
            </div>
            <div className="card-body">
                <div className="webcam-container">
                    <div id="webcam-wrapper">
                        <video id="webcam-video" autoPlay playsInline></video>
                    </div>
                    <div className="col">
                        <div className="question-card">
                            <h5>질문 1</h5>
                            <p>본인의 장점이 무엇이라고 생각하십니까?</p>
                        </div>
                        <div className="question-card">
                            <h5>질문 2</h5>
                            <p>본인의 단점이 무엇이라고 생각하십니까?</p>
                        </div>
                    </div>
                </div>
                <form>
                    <div className="submit-button-container">
                        <button className="submit-button" type="submit">면접 시작하기</button>
                        <button className="submit-button" type="submit">면접 종료하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InterviewComponent;
