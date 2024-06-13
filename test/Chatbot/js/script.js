// // 이미지 요소와 시스템 시간 요소
// const img = document.querySelector(".chat-input .profile");
// // const sysTime = document.querySelector(".topbar-left");

// // 현재 시간 값 받기
// const currentTime = new Date().toLocaleTimeString([], {
//   hour: "2-digit",
//   minute: "2-digit",
//   hour12: false,
// });
// // 현재 시간을 표시
// //sysTime.innerHTML = currentTime;

// // 이미지 클릭 이벤트
// img.addEventListener("click", () => {
//   // 이미지의 src 속성을 변경하여 사용자를 전환
//   img.src = img.src.includes("master1") ? "./img/user2.jpg" : "./img/master1.jpg";
// });

// // 전송 버튼과 메시지 입력란
// const btn = document.querySelector("#btn_send");
// const txt = document.querySelector("#msg_txt");

// // 메시지를 전송하는 함수를 정의
// const sendMsg = () => {
//   // 입력된 메시지 내용
//   const value = txt.value;
//   // 채팅 메시지를 HTML 형식으로 구성
//   const chatHtml = `<div class="chat-user ${
//     img.src.includes("master1") ? "master1" : "user2"
//   }">
//         <div class="user-img">
//             <img src="./img/${
//               img.src.includes("master1") ? "master1" : "user2"
//             }.jpg" alt="" />
//         </div>
//         <div class="user-msg">
//             <p class="chat-bubble">${value}</p>
//             <span class="time">${currentTime}</span>
//         </div>
//     </div>`;

//   // 채팅창과 스크롤
//   const chats = document.querySelector(".chats");
//   const chatPage = document.querySelector(".chat-area");

//   // 입력된 메시지가 비어있지 않은 경우에만 처리
//   if (value !== "") {
//     // 채팅창에 새로운 메시지를 추가
//     chats.innerHTML += chatHtml;
//     // 메시지 입력란을 초기화하고 포커스를 다시 설정
//     txt.value = "";
//     txt.focus();
//     // 채팅창을 스크롤하여 가장 최근 메시지가 보이도록 설정
//     chatPage.scrollTop = chatPage.scrollHeight - chatPage.clientHeight;
//   }
// };

// // 전송 버튼 클릭 이벤트
// btn.addEventListener("click", () => {
//   sendMsg();
// });

// // 입력란에서 Enter 키를 눌렀을 때 메시지 전송 이벤트
// txt.addEventListener("keydown", (e) => {
//   if (e.keyCode === 13) {
//     sendMsg();
//   }
// });


// 사이드 스크롤 탑/바텀 버튼 요소
  const scrollTopButton = document.querySelector(".scroll-top-btn");
  const scrollBottomButton = document.querySelector(".scroll-bottom-btn");

  // 페이지가 스크롤될 때 버튼 show / hide를 처리하는 함수
  function handleScroll() {
      // 현재 스크롤 위치가 30px보다 큰 경우에만 Top 버튼
      if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
          scrollTopButton.classList.add("show");
      } else {
          scrollTopButton.classList.remove("show");
      }
  }
  // 스크롤 Top 버튼을 클릭했을 때의 함수
  function scrollTopFunction() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
}
  // 스크롤 Bottom 버튼을 클릭했을 때의 함수
  function scrollBottomFunction() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  // 페이지가 스크롤될 때 버튼 show / hide를 처리하는 함수
  function handleScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollTopButton.classList.add("show");
      scrollBottomButton.style.display = 'none';
    } else {
      scrollTopButton.classList.remove("show");
      scrollBottomButton.style.display = 'inline-block';
    }
  }

  // 스크롤 이벤트 리스너 추가
  window.addEventListener("scroll", handleScroll);



//*******************layer popup*****************************

// 상담 종료하기 버튼 클릭 시 layer popup 띄우기
document.querySelector('.btn-type3').addEventListener('click', function() {
    // layer popup 보이게 설정
    document.querySelector(".layer-popup").style.display = "block";
});

// 상담종료 버튼 클릭 시 layer popup 닫기
document.querySelector('.btn-type-close').addEventListener('click', function() {
    // layer popup 감추기 설정
    document.querySelector(".layer-popup").style.display = "none";
});

// 취소 버튼 클릭 시 layer popup 닫기
document.querySelector('.btn-type-cancel').addEventListener('click', function() {
    // layer popup 감추기 설정
    document.querySelector(".layer-popup").style.display = "none";
});



//******************* 슬라이드 *****************************

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});


//*******************펼쳐보기 /접기 버튼 *****************************
document.addEventListener("DOMContentLoaded", function () {
  // 펼쳐보기 버튼 요소 목록 가져오기
  const moreButtons = document.querySelectorAll(".btn_more");
  // 더보기 텍스트 요소 목록 가져오기
  const moreTexts = document.querySelectorAll(".more_type_area");
  // more_box 요소 목록 가져오기
  const moreBoxes = document.querySelectorAll(".more_box");

  moreButtons.forEach((moreButton, index) => {
    const moreText = moreTexts[index];
    const listItems = moreBoxes[index].querySelectorAll("li");

    // li가 6개 이상일 때만 펼쳐보기 버튼 표시
    if (listItems.length >= 6) {
      moreButton.classList.remove("hide");
    }

    // 더보기 버튼에 클릭 이벤트 리스너 추가
    moreButton.addEventListener("click", function () {
      // 만약 현재 텍스트가 펼쳐져 있는 상태라면
      if (moreText.classList.contains("expanded")) {
        // 텍스트를 다시 숨김
        moreText.classList.remove("expanded");
        // 버튼 텍스트 변경
        moreButton.querySelector("span").textContent = "펼쳐보기";
        // 화살표 아이콘을 아래로 변경
        moreButton.querySelector("img").style.transform = "rotate(0deg)";
      } else {
        // 현재 텍스트가 숨겨진 상태라면
        // 텍스트를 펼침
        moreText.classList.add("expanded");
        // 버튼 텍스트 변경
        moreButton.querySelector("span").textContent = "접기";
        // 화살표 아이콘을 위로 변경
        moreButton.querySelector("img").style.transform = "rotate(180deg)";
      }
    });
  });
});
    
//*******************test case (click evt)*****************************

// // 보험금 청구 버튼을 클릭했을 때 이벤트를 처리하는 함수
// function showChatTypeCase01() {
//     // chat-type-case01 요소를 가져옴
//     const chatTypeCase01 = document.getElementById("chat-type-case01");
//     // chat-type-case01 요소 노출
//     chatTypeCase01.style.display = "block";
// }

// // 보험금 청구 버튼을 가져와서 클릭 이벤트를 추가
// const insuranceClaimButton = document.querySelector('.chat-btn-box.set6 li:nth-child(1) a');
// insuranceClaimButton.addEventListener('click', showChatTypeCase01);


// // 보험증권 버튼을 클릭했을 때 이벤트를 처리하는 함수
// function showChatTypeCase02() {
//     // chat-type-case02 요소를 가져옴
//     const chatTypeCase02 = document.getElementById("chat-type-case02");
//     // chat-type-case02 요소를 노출
//     chatTypeCase02.style.display = "block";
// }

// // 보험증권 버튼을 가져와서 클릭 이벤트 추가
// const insuranceCertificateButton = document.querySelector('.chat-btn-box.set6 li:nth-child(2) a');
// insuranceCertificateButton.addEventListener('click', showChatTypeCase02);


// function showChatTypeCase03() {
//     const chatTypeCase03 = document.getElementById("chat-type-case03");
//     chatTypeCase03.style.display = "block";
// }
// const 
// openingLineButton = document.querySelector('.chat-btn-box.set6 li:nth-child(3) a');
// openingLineButton.addEventListener("click", showChatTypeCase03);


//*******************퀵메뉴버튼 눌렀을 때 액션*****************************
document.addEventListener("DOMContentLoaded", function () {
  const quickMenuButton = document.querySelector(".quickMenu_btn");
  const quickMenu = document.querySelector(".quickMenu");
  const chatInputWrap = document.querySelector(".chat-input-wrap");

  quickMenuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    quickMenu.classList.toggle("show");
    quickMenuButton.classList.toggle("rotated");
  });

  chatInputWrap.addEventListener("click", function () {
    quickMenu.classList.remove("show");
    quickMenuButton.classList.remove("rotated");
  });
  quickMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});



// 아이콘 최적화
document.addEventListener("DOMContentLoaded", function () {
  var icons = document.querySelectorAll(".icon");
  icons.forEach(function (icon) {
    var scaleFactor = window.devicePixelRatio || 1;
    icon.style.width = 64 * scaleFactor + "px";
    icon.style.height = 64 * scaleFactor + "px";
  });
});
//글자 확대/축소
document.addEventListener("DOMContentLoaded", function () {
  const textSizeButton = document.querySelector(".text-size");
  let isTextEnlarged = false;

  textSizeButton.addEventListener("click", function (event) {
    event.preventDefault();
    isTextEnlarged = !isTextEnlarged;

    if (isTextEnlarged) {
      document.body.classList.add("enlarged-text");
      textSizeButton.textContent = "글자축소";
    } else {
      document.body.classList.remove("enlarged-text");
      textSizeButton.textContent = "글자확대";
    }
  });
});









