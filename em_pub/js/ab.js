// ab_slider
(function(){
  const ab_slider = new Swiper(".global_slider_con", {
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
})();