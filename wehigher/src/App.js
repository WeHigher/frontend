import './App.css';

function sendMessage() {
  const userInput = document.getElementById('user-input-text').value;
  const chatLog = document.getElementById('chat-log');
  const userMessage = document.createElement('div');
  userMessage.textContent = 'You: ' + userInput;
  chatLog.appendChild(userMessage);

  const chatGptResponse = 'ChatGPT: ' + '안녕하세요! 저는 ChatGPT입니다.';
  const chatGptMessage = document.createElement('div');
  chatGptMessage.textContent = chatGptResponse;
  chatLog.appendChild(chatGptMessage);

  document.getElementById('user-input-text').value = '';
}

function App() {
  return (
    <div className="chat-container">
      <div className="chat-log" id="chat-log">
        {/* <!-- 채팅 로그 표시 --> */}
      </div>
      <div className="user-input">
        <input
          type="text"
          id="user-input-text"
          placeholder="문장을 입력하세요..."
        ></input>
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default App;
