// onboard_slider
(function(){
  const ai_diag_slider = new Swiper(".ai_diag_slider", {
    effect: 'slider',   
    speed: 600,  
    loop: false, 
    slidesPerView: 'auto',
    autoHeight : true,
    pagination: {
      el: '.ai_diag_dot',
      clickable: true, 
      type: 'bullets'
    },   
    navigation: {
      nextEl: ".ad_diag_next",
      prevEl: ".ad_diag_prev",
    }, 
  });
  const next_btn = document.querySelector(".ad_diag_next ");
  const prve_btn = document.querySelector(".ad_diag_prev");
  const start_btn = document.querySelector(".ad_diag_start");
  const main_title =  document.querySelector("header .sub_title .text_wrap h2");

  ai_diag_slider.on("slideChangeTransitionStart", function(){
    const slider_length = this.slides.length;   
    const current_slider = ai_diag_slider.slides[2]; //선택 슬라이드
    const last_slider = ai_diag_slider.slides[slider_length-1]; //마지막 슬라이드
    const that = this; //ai_diag_slider
    let flag = false; // 리스트 선택 여부

    // 선택 슬라이드
    if(current_slider.classList.contains("swiper-slide-active")){
      const select_level_btn = document.querySelectorAll(".select_level_btn");   
           

      select_level_btn.forEach(item =>{
        if(item.classList.contains("active")){ flag = true;}
      })

      if(flag){
        next_btn.classList.add("active");   
        that.allowTouchMove = true;   
      }else{
        next_btn.classList.remove("active");    
        that.allowTouchMove = false;             
      }   
      main_title.innerText = "Please select a level";

    }else{
      that.allowTouchMove = true;
      next_btn.classList.add("active");  
      main_title.innerText = "AI Diagnostic Test";
    }

    // 마지막 슬라이드
    if(last_slider.classList.contains("swiper-slide-active")){
      prve_btn.classList.add("swiper-button-disabled");     
      start_btn.classList.add("active"); //start 버튼 활성화
    }else{
      start_btn.classList.remove("active"); //start 버튼 활성화
    } 
  })


// dt select level click
  const select_level_btn = document.querySelectorAll(".select_level_btn"); 
  if(!select_level_btn) return;

  // remove class
  function remove(){  
    select_level_btn.forEach(item =>{
      const obj = item.querySelector("object");
      const dom = obj.getSVGDocument();//object doc접근
      const svg = dom.querySelector(".dt_level");  
      
      item.classList.remove("active");     
      svg.classList.remove("active");    
    })
  }
//  add class
  select_level_btn.forEach(item =>{
    item.addEventListener("click", e=>{
      e.preventDefault();
      const target = e.currentTarget;      
      const obj = target.querySelector("object");      
      const dom = obj.getSVGDocument();//object doc접근     
      const svg = dom.querySelector(".dt_level");  
   
      remove();
      target.classList.add("active");
      svg.classList.add("active");     
      next_btn.classList.add("active");     
      ai_diag_slider.allowTouchMove = true;
    })
  });
})();