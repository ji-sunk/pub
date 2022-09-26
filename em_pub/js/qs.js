(function(){
 

  /**
   * 가로 flex box 안에 flex 아래위 레이아웃 넓이 잡아주기
   * 13579 1357 135
   * 2468  2468 24
   * @param {margin} 리스트 사이값
   */
  function flex_list_width(margin){
    const ho_scroll_item = document.querySelectorAll(".ho_scroll_item");
    const w_width = window.innerWidth;
    if(!ho_scroll_item) return;
    
    ho_scroll_item.forEach(item => {  
      const list_wrap = item.querySelector(".ho_scroll_item_list");

      if(w_width < 1024){
        list_wrap.style.width = "auto";
        return;
      } 
    
      const list = list_wrap.querySelectorAll("li");
      const card_length = list.length;
      const card_width = list[0].getBoundingClientRect().width;    
      const counter = Math.ceil(card_length / 2); //세로로 2개씩 묶음
      const blank =(counter-1) * margin; // 20 - 사이값
  
      const list_width =  (card_width * counter) + blank; //총넓이 = 리스트 넓이 + 사이값
  
      list_wrap.style.width = `${list_width}px`;
    });
  }
  flex_list_width(20);

  window.addEventListener("resize", function(){
    flex_list_width(20);
  }); 
})();


// 리스트 팝업
(function(){
  // 2022.09.20 클래스명 .badge_step_list -> .badge_cate_list
 const badge_list = document.querySelectorAll(".badge_cate_list li a"); //리스트 아이탬
 const top_icon_popup = document.querySelector(".top_icon_popup"); 
 const popup_box = top_icon_popup.querySelectorAll(".popup_box");
 const get_badge_popup = top_icon_popup.querySelector(".get_badge_popup");
 const lock_badge_popup = top_icon_popup.querySelector(".lock_badge_popup");

  badge_list.forEach(item =>{ 
  item.addEventListener("click", e=>{
    const badge_list_wrap = e.currentTarget.parentNode;
    top_icon_popup.classList.add("active");
  
    if(badge_list_wrap.classList.contains("get_badge")){
      get_badge_popup.classList.add("active")
    }else if(badge_list_wrap.classList.contains("lock_badge")){
      lock_badge_popup.classList.add("active");
    }
  })
 })

 const popup_close_btn = document.querySelectorAll(".popup_close_btn");  
  popup_close_btn.forEach(item=>{
    item.addEventListener("click", function(){
      top_icon_popup.classList.remove("active");
      popup_box.forEach(box=>{
        box.classList.remove("active");
      });
    });    
  }); 
})();
