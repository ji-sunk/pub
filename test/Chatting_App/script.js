// 이미지 요소와 시스템 시간 요소
const img = document.querySelector(".chat-input img");
const sysTime = document.querySelector(".topbar-left");

// 현재 시간 값 받기
const currentTime = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
// 현재 시간을 표시
sysTime.innerHTML = currentTime;

// 이미지 클릭 이벤트
img.addEventListener("click", () => {
  // 이미지의 src 속성을 변경하여 사용자를 전환
  img.src = img.src.includes("user1") ? "./img/user2.jpg" : "./img/user1.jpg";
});

// 전송 버튼과 메시지 입력란
const btn = document.querySelector("#btn_send");
const txt = document.querySelector("#msg_txt");

// 메시지를 전송하는 함수를 정의
const sendMsg = () => {
  // 입력된 메시지 내용
  const value = txt.value;
  // 채팅 메시지를 HTML 형식으로 구성
  const chatHtml = `<div class="chat-user ${
    img.src.includes("user1") ? "user1" : "user2"
  }">
        <div class="user-img">
            <img src="./img/${
              img.src.includes("user1") ? "user1" : "user2"
            }.jpg" alt="" />
        </div>
        <div class="user-msg">
            <p class="chat-bubble">${value}</p>
            <span class="time">${currentTime}</span>
        </div>
    </div>`;

  // 채팅창과 스크롤
  const chats = document.querySelector(".chats");
  const chatPage = document.querySelector(".chat-area");

  // 입력된 메시지가 비어있지 않은 경우에만 처리
  if (value !== "") {
    // 채팅창에 새로운 메시지를 추가
    chats.innerHTML += chatHtml;
    // 메시지 입력란을 초기화하고 포커스를 다시 설정
    txt.value = "";
    txt.focus();
    // 채팅창을 스크롤하여 가장 최근 메시지가 보이도록 설정
    chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
  }
};

// 전송 버튼 클릭 이벤트
btn.addEventListener("click", () => {
  sendMsg();
});

// 입력란에서 Enter 키를 눌렀을 때 메시지 전송 이벤트
txt.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    sendMsg();
  }
});
