import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

export const drawCanvas = (ctx, results) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.save();
  ctx.clearRect(0, 0, width, height);
  // 캔버스의 좌우 반전
  ctx.scale(-1, 1);
  ctx.translate(-width, 0);
  // 캡처 이미지 그리기
  ctx.drawImage(results.image, 0, 0, width, height);
  // 손의 묘사
  if (results.multiHandLandmarks) {
    // 골격 묘사
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
        lineWidth: 3,
      });
      drawLandmarks(ctx, landmarks, {
        lineWidth: 1,
        radius: 3,
      });
    }
  }
  ctx.restore();
};
