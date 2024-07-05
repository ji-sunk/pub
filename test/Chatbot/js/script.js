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
  // 팝업 토글 함수
  function togglePopup(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.display =
        element.style.display === "block" ? "none" : "block";
    }
  }

  // .chatbot-guide 클릭 시 챗봇가이드 노출
  document
    .querySelector(".chatbot-guide")
    .addEventListener("click", function () {
      document.querySelector(".layer-guide").style.display = "block";
    });

  // .top5 클릭 시 인기 검색어 보이기
  document
    .querySelector(".top5")
    .addEventListener("click", function () {
    document.querySelector(".psw5").style.display = "block";
  });

  // .btn-guide-close 버튼 클릭 시 챗봇가이드 닫기
  document
    .querySelector(".btn-guide-close")
    .addEventListener("click", function () {
      document.querySelector(".layer-guide").style.display = "none";
    });

  // #endCst 클릭 시 layer-popup1 보이기
  document.querySelector("#endCst").addEventListener("click", function () {
    document.querySelector(".layer-popup1").style.display = "block";
  });

  // #lyrPop 클릭 시 layer-popup2 토글
  document.querySelector("#lyrPop").addEventListener("click", function () {
    togglePopup(".layer-popup2");
  });

  // .btn-type-close, .btn-type-cancel 버튼 클릭 시 layer-popup1 닫기
  document
    .querySelectorAll(".btn-type-close, .btn-type-cancel")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelector(".layer-popup1").style.display = "none";
      });
    });

  document.querySelectorAll(".btn-type-close").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelector(".EndCST.hide").classList.remove("hide");
    });
  });

  // document.querySelectorAll(".btn-type-close").forEach(function (button) {
  //   button.addEventListener("click", function () {
  //     document.querySelector(".wrapper").classList.add("touchNone");
  //   });
  // });
  // // .btn-type-close2 버튼 클릭 시 layer-popup2 닫기
  // document
  //   .querySelector(".btn-type-close2")
  //   .addEventListener("click", function () {
  //     document.querySelector(".layer-popup2").style.display = "none";
  //   });

  // #lyrPopOpc 버튼 클릭 시 채팅 인풋 숨기기 및 layer-popup3 보이기
  // document.querySelector("#lyrPopOpc").addEventListener("click", function () {
  //   document.querySelector(".chat-input-wrap").style.display = "none";
  //   document.querySelector(".layer-popup3").style.display = "block";
  // });
});


//********************* 슬라이드 *****************************

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

  if (moreButtons.length && moreTexts.length && moreBoxes.length) {
    moreButtons.forEach((moreButton, index) => {
      const moreText = moreTexts[index];
      const moreBox = moreBoxes[index];

      if (moreBox) {
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
      }
    });
  }
});


//*******************퀵메뉴버튼 눌렀을 때 액션**********************
document.addEventListener("DOMContentLoaded", function () {
  const quickMenuButton = document.querySelector(".quickMenu_btn");
  const quickMenu = document.querySelector(".quickMenu");
  //const chatInputWrap = document.querySelector(".chat-input-wrap");
  const layerDim = document.querySelector(".layer-dim");

  quickMenuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    quickMenu.classList.toggle("show");
    quickMenuButton.classList.toggle("rotated");
    // .layer-dim.hide 요소에서 hide 클래스 제거
    if (layerDim) {
      layerDim.classList.toggle("hide");
    }
  });

  // .layer-dim 클릭 시 quickMenu show 클래스 제거 및 hide 클래스 추가
  if (layerDim) {
    layerDim.addEventListener("click", function () {
      quickMenu.classList.remove("show");
      quickMenuButton.classList.remove("rotated");
      layerDim.classList.add("hide");
    });
  }

  // quick-btn-box의 li 안의 a 요소 클릭 시 quickMenu show 클래스 제거 및 hide 클래스 추가
  const quickBtnBoxLinks = document.querySelectorAll(".quick-btn-box li a");
  quickBtnBoxLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      quickMenu.classList.remove("show");
      if (layerDim) {
        layerDim.classList.add("hide");
      }
    });
  });
});

//웹폰트 최적화 CDN(Content Delivery Network) / 서비스워커
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("font-cache").then(function (cache) {
      return cache.addAll([
        "/fonts/NotoSansKR-Medium.woff2",
        "/fonts/NotoSansKR-Medium.woff",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("fonts/NotoSansKR-Medium")) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});

//더보기 메뉴에서 글자 확대/축소
document.addEventListener("DOMContentLoaded", function () {
  // 텍스트 크기 버튼을 선택
  const textSizeButton = document.querySelector(".text-size");

  // 텍스트 크기 버튼 내부의 텍스트 요소선택
  const textSizeTxt = textSizeButton ? textSizeButton.querySelector("p") : null;
  let isTextEnlarged = false;

  // 버튼이 존재할 경우에만 이벤트 리스너를 추가
  if (textSizeButton && textSizeTxt) {
    textSizeButton.addEventListener("click", function (event) {
      event.preventDefault();
      isTextEnlarged = !isTextEnlarged;

      if (isTextEnlarged) {
        document.body.classList.add("enlarged-text");
        textSizeTxt.textContent = "글자작게";
      } else {
        document.body.classList.remove("enlarged-text");
        textSizeTxt.textContent = "글자크게";
      }
    });
  }
});

