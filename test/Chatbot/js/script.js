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
    behavior: "smooth",
  });
}
// 스크롤 Bottom 버튼을 클릭했을 때의 함수
function scrollBottomFunction() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

// 페이지가 스크롤될 때 버튼 show / hide를 처리하는 함수
function handleScroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopButton.classList.add("show");
    scrollBottomButton.style.display = "none";
  } else {
    scrollTopButton.classList.remove("show");
    scrollBottomButton.style.display = "inline-block";
  }
}

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", handleScroll);

//*******************layer popup*****************************

document.addEventListener("DOMContentLoaded", function () {
  // 상담 종료하기 버튼 클릭 시 layer popup 띄우기
  document.querySelector("#endCst").addEventListener("click", function () {
    document.querySelector(".layer-popup1").style.display =
      "block";
  });
  
  document.querySelector("#lyrPop").addEventListener("click", function () {
    document.querySelector(".layer-popup2").style.display =
      "block";
  });

  // 상담종료 버튼 클릭 시 layer popup 닫기
  document
    .querySelector(".btn-type-close")
    .addEventListener("click", function () {
      document.querySelector(".layer-popup1").style.display =
        "none";
    });
  
    document
      .querySelector(".btn-type-close2")
      .addEventListener("click", function () {
        document.querySelector(".layer-popup2").style.display = "none";
      });

  // 취소 버튼 클릭 시 layer popup 닫기
  document
    .querySelector(".btn-type-cancel")
    .addEventListener("click", function () {
      document.querySelector(".layer-popup1").style.display =
        "none";
    });

  // 챗봇 사용법 버튼 클릭 시 layer popup 띄우기
  document
    .querySelector(".chatbot-guide")
    .addEventListener("click", function () {
      document.querySelector(".layer-guide").style.display = "block";
    });

  // 챗봇 사용법 팝업 취소 버튼 클릭 시 layer popup 닫기
  document
    .querySelector(".btn-guide-close")
    .addEventListener("click", function () {
      document.querySelector(".layer-guide").style.display = "none";
    });
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

//******************* 펼쳐보기 /접기 버튼 *********************
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

//*******************퀵메뉴버튼 눌렀을 때 액션**********************
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

//글자 확대/축소
document.addEventListener("DOMContentLoaded", function () {
  const textSizeButton = document.querySelector(".text-size");
  let isTextEnlarged = false;

  textSizeButton.addEventListener("click", function (event) {
    event.preventDefault();
    isTextEnlarged = !isTextEnlarged;

    if (isTextEnlarged) {
      document.body.classList.add("enlarged-text");
      textSizeButton.textContent = "글자작게";
    } else {
      document.body.classList.remove("enlarged-text");
      textSizeButton.textContent = "글자크게";
    }
  });
});
