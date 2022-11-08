// 퀴즈 활성화
(function(){
  const qz_acitve_btn = document.querySelector(".qz_acitve_btn");
  if(!qz_acitve_btn) return;
  const wm_contents = document.querySelector(".wm_contents");
  qz_acitve_btn.addEventListener("click", function(e){
    e.preventDefault();
    wm_contents.classList.toggle("qz_active");
  });
})()

// 커런시 히스토리 도움말 툴팁 토글 활성화
function showHide() {
  var element = document.getElementById("bub_tgl");
  element.classList.toggle("hidden");
}

