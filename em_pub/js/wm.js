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