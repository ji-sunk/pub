// onboard_slider
// 2022.09.19 on_boarding -> global_slider
(function(){
  /*2022.09.19 클래스명 변경 .global_slider -> .global_slider_con */
  const onboard_slider = new Swiper(".ob .global_slider_con", {
    effect: 'slider',   
    speed: 600,  
    loop: false, 
    slidesPerView: 'auto',
    autoHeight : true,
    pagination: {
      el: '.global_slider_dot',
      clickable: true, 
      type: 'bullets'
    },    
  });

  // 2022.09.08
  const btn =  document.querySelector(".ob .global_slider_wrap .bottom_btn_wrap");
  onboard_slider.on("slideChangeTransitionStart", function(){
    const sliders = this.activeIndex; //현재페이지
    if(sliders != 0){
        btn.classList.add("active")
    }else{
      btn.classList.remove("active");
    }
  })
})();

