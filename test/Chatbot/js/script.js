// 이미지 요소와 시스템 시간 요소
const img = document.querySelector(".chat-input .profile");
// const sysTime = document.querySelector(".topbar-left");

// 현재 시간 값 받기
const currentTime = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
// 현재 시간을 표시
//sysTime.innerHTML = currentTime;

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


// 사이드 스크롤 탑/바텀 버튼 요소
  const scrollTopButton = document.querySelector(".scroll-top-btn");
  const scrollBottomButton = document.querySelector(".scroll-bottom-btn");

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

// document.addEventListener("DOMContentLoaded", function () {
//   // 초기 카드 활성화
//   document.querySelector(".slide-card li:first-child").classList.add("active");

//   // 동그란 버튼 생성 및 이벤트 처리
//   const cards = document.querySelectorAll(".slide-card li");
//   const dotsContainer = document.querySelector(".dot-container");

//   cards.forEach((card, index) => {
//     const dot = document.createElement("span");
//     dot.classList.add("dot");
//     dot.setAttribute("data-index", index); // 인덱스를 데이터 속성에 저장
//     dotsContainer.appendChild(dot);
//   });

//   // 동그란 버튼 클릭 시 카드 활성화
//   const dots = document.querySelectorAll(".dot");
//   dots.forEach((dot) => {
//     dot.addEventListener("click", function () {
//       // 클릭한 dot의 인덱스 가져오기
//       const index = parseInt(dot.getAttribute("data-index"));

//       // 모든 카드 및 동그라미 비활성화
//       cards.forEach((card) => card.classList.remove("active"));
//       dots.forEach((dot) => dot.classList.remove("active"));

//       // 클릭한 인덱스에 해당하는 카드와 동그라미 활성화
//       cards[index].classList.add("active");
//       dots[index].classList.add("active");
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   // 초기 카드 활성화
//   const cards = document.querySelectorAll(".slide-card li");
//   const dots = document.querySelectorAll(".dot");
//   cards[0].classList.add("active");
//   dots[0].classList.add("active");

//   // 동그라미 버튼 클릭 시 카드 이동
//   dots.forEach((dot, index) => {
//     dot.addEventListener("click", function () {
//       // 모든 카드 및 동그라미 비활성화
//       cards.forEach((card) => card.classList.remove("active"));
//       dots.forEach((dot) => dot.classList.remove("active"));

//       // 클릭한 dot의 인덱스에 해당하는 카드와 dot 활성화
//       cards[index].classList.add("active");
//       dots[index].classList.add("active");
//     });
//   });
// });


$(document).ready(function () {
  // 초기 카드 활성화
  $(".slide-card li:first-child").addClass("active");

  // 동그란 버튼 생성 및 이벤트 처리
  const cards = $(".slide-card li");
  const dotsContainer = $(".dot-container");

  cards.each(function (index) {
    const dot = $("<span>").addClass("dot").attr("data-index", index);
    if (index === 0) dot.addClass("active");
    dotsContainer.append(dot);
  });

  // 동그란 버튼 클릭 시 카드 활성화
  $(".dot").on("click", function () {
    const index = $(this).data("index");

    // 모든 카드 및 동그라미 비활성화
    cards.removeClass("active");
    $(".dot").removeClass("active");

    // 클릭한 인덱스에 해당하는 카드와 동그라미 활성화
    $(cards[index]).addClass("active");
    $(this).addClass("active");

    // 카드로 슬라이드 이동
    $(".scroll_x").animate(
      {
        scrollLeft:
          $(cards[index]).position().left + $(".scroll_x").scrollLeft(),
      },
      300
    );
  });

  // 카드 위치에 따라 동그라미 버튼 활성화
  $(".scroll_x").on("scroll", function () {
    let scrollLeft = $(this).scrollLeft();
    let containerWidth = $(this).width();

    cards.each(function (index) {
      let cardLeft = $(this).position().left + scrollLeft;
      if (
        cardLeft <= scrollLeft + containerWidth / 2 &&
        cardLeft + $(this).width() > scrollLeft + containerWidth / 2
      ) {
        // 모든 카드 및 동그라미 비활성화
        cards.removeClass("active");
        $(".dot").removeClass("active");

        // 현재 보이는 카드와 동그라미 활성화
        $(this).addClass("active");
        $(`.dot[data-index=${index}]`).addClass("active");
      }
    });
  });
});

//*******************펼쳐보기 /접기 버튼 *****************************

  document.addEventListener("DOMContentLoaded", function () {
    // 펼쳐보기 버튼 요소 가져오기
    const moreButton = document.querySelector(".btn_more");
    // 더보기 텍스트 요소 가져오기
    const moreText = document.querySelector(".more_type_area");
    // more_box 요소 가져오기
    const moreBox = document.querySelector(".more_box");
    // li 요소 목록 가져오기
    const listItems = moreBox.querySelectorAll("li");

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


    // 더보기 버튼을 클릭했을 때 이벤트 처리
    // document.addEventListener('DOMContentLoaded', function () {
    //     // 펼쳐보기 버튼 요소 가져오기
    //     const moreButton = document.querySelector('.btn_more');
    //     // 더보기 텍스트 요소 가져오기
    //     const moreText = document.querySelector('.more_type_area');

    //     // 더보기 버튼에 클릭 이벤트 리스너 추가
    //     moreButton.addEventListener('click', function () {
    //         // 만약 현재 텍스트가 펼쳐져 있는 상태라면
    //         if (moreText.classList.contains('expanded')) {
    //             // 텍스트를 다시 숨김
    //             moreText.classList.remove('expanded');
    //             // 버튼 텍스트 변경
    //             moreButton.querySelector('span').textContent = '펼쳐보기';
    //             // 화살표 아이콘을 아래로 변경
    //             moreButton.querySelector('img').style.transform = 'rotate(0deg)';
    //         } else {
    //             // 현재 텍스트가 숨겨진 상태라면
    //             // 텍스트를 펼침
    //             moreText.classList.add('expanded');
    //             // 버튼 텍스트 변경
    //             moreButton.querySelector('span').textContent = '접기';
    //             // 화살표 아이콘을 위로 변경
    //             moreButton.querySelector('img').style.transform = 'rotate(180deg)';
    //         }
    //     });
    // })


    
    
//*******************test case (click evt)*****************************

// 보험금 청구 버튼을 클릭했을 때 이벤트를 처리하는 함수
function showChatTypeCase01() {
    // chat-type-case01 요소를 가져옴
    const chatTypeCase01 = document.getElementById("chat-type-case01");
    // chat-type-case01 요소 노출
    chatTypeCase01.style.display = "block";
}

// 보험금 청구 버튼을 가져와서 클릭 이벤트를 추가
const insuranceClaimButton = document.querySelector('.chat-btn-box.set6 li:nth-child(1) a');
insuranceClaimButton.addEventListener('click', showChatTypeCase01);


// 보험증권 버튼을 클릭했을 때 이벤트를 처리하는 함수
function showChatTypeCase02() {
    // chat-type-case02 요소를 가져옴
    const chatTypeCase02 = document.getElementById("chat-type-case02");
    // chat-type-case02 요소를 노출
    chatTypeCase02.style.display = "block";
}

// 보험증권 버튼을 가져와서 클릭 이벤트 추가
const insuranceCertificateButton = document.querySelector('.chat-btn-box.set6 li:nth-child(2) a');
insuranceCertificateButton.addEventListener('click', showChatTypeCase02);


function showChatTypeCase03() {
    const chatTypeCase03 = document.getElementById("chat-type-case03");
    chatTypeCase03.style.display = "block";
}
const 
openingLineButton = document.querySelector('.chat-btn-box.set6 li:nth-child(3) a');
openingLineButton.addEventListener("click", showChatTypeCase03);


//*******************퀵메뉴버튼 눌렀을 때 액션*****************************
document.addEventListener("DOMContentLoaded", function () {
  const quickMenuButton = document.querySelector(".quickMenu_btn");
  const quickMenu = document.querySelector(".quickMenu");
  const chatInputWrap = document.querySelector(".chat-input-wrap");

  quickMenuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 함
    quickMenu.classList.toggle("show");
  });

  chatInputWrap.addEventListener("click", function () {
    quickMenu.classList.remove("show");
  });

  // quickMenu 안쪽 클릭 시 이벤트 전파 방지
  quickMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});











