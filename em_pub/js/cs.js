 /*셀렉트박스*/
 (function(){
  var cs_select_btn = document.querySelector(".cs_select_btn");
  if(!cs_select_btn) return;
  /*셀렉트 박스 클릭 */
  cs_select_btn.addEventListener('click', function(e){
      e.preventDefault();
      const btn_wrap = this.parentNode;
      var cs_select_list = this.nextElementSibling;//select list

      if (this.classList.contains("on")) {//셀렉트 박스 접기
          gsap.to(cs_select_list, { display: 'none', height: 0, duration: .3 });//gsap animation library
          this.classList.toggle('on');
          btn_wrap.classList.toggle('on_wrap');
      } else {	//셀렉트 박스 펼치기
          this.classList.toggle('on');
          btn_wrap.classList.toggle('on_wrap');
          gsap.set(cs_select_list, { display: 'block' });
          gsap.to(cs_select_list, { height: 'auto', duration: .3 });
      }
  })
})();

// textarea 1000자 
(function(){
  const textarea = document.querySelector(".cs_content_area");
  const current_text_num = document.querySelector(".current_text_num")
  if(!current_text_num) return;
  const bottom_zero_btn = document.querySelector('.bottom_zero_btn');

  // 1000자 카운터
  textarea.addEventListener("keyup", e=>{
    const text_counter = textarea.value.length;
    current_text_num.innerText = text_counter;

    if(text_counter >= 1000){
      alert("최대 1000자까지 입력 가능합니다.");
    }
  });

  //입력 후 아래 버튼 활성화
  textarea.addEventListener("change", e=>{
    const value = e.currentTarget.value;
    if (value.length >= 0) {
      if(bottom_zero_btn) bottom_zero_btn.classList.add("active");  
    }else{    
      if(bottom_zero_btn) bottom_zero_btn.classList.remove("active");  
    }
  })
})();

// 댓글 입력 박스
(function(){
  const comment_write_area = document.querySelector(".comment_write_area");
  if(!comment_write_area) return;
  //focus
  comment_write_area.addEventListener("focus", e=>{
    const wrap = e.currentTarget.parentNode;

    wrap.classList.add("active");    
  })
  //blur
  comment_write_area.addEventListener("blur", e=>{
    const wrap = e.currentTarget.parentNode;

    wrap.classList.remove("active");    
    e.currentTarget.value = "";
  })
})();

// 스크롤 시 헤더 그림자
(function(){
  const con_scroll = document.querySelector(".cs_view header"); 
  const target = document.querySelector(".cs_view .cs_main");
  if(!con_scroll) return;
  let timer;
  function scroll_on() {	   		
    if (!timer) {
      timer = setTimeout(() => {
        let top = this.scrollTop;
        timer = null;   

        if (top >= 1) {
          con_scroll.classList.add("on_scroll");
        } else {
          con_scroll.classList.remove("on_scroll");
        }       
      }, 100);
    }
  }
  scroll_on();			
  target.addEventListener('scroll', scroll_on);
})();