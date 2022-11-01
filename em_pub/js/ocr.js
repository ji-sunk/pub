/**
 * 촬영 slider, button - 0624 
 * 촬영 버튼 - 0624 
 * 재촬영 버튼 - 0624
 * 그리기 기능 버튼 - 0624
 * 인식결과 이미지 크기 - 0624
 * ocr history more  - 0624
 * edit mode - 0624
 * check all - 0624
 * check box input - 0624
 */

/*--------------------------*/
// 촬영
/*--------------------------*/
const winWidth = window.innerWidth;
const body = document.body;
const filminBody = document.querySelector(".cmr_filmingBody");
const fullscreenBody = document.querySelector(".cmr_fscreenBody");
const drawBody = document.querySelector(".cmr_drawBody");
(function(){
  

// 하단 전체, 카메라, 그리기  버튼 슬라이더
    let camera = new Swiper(".cmr_camera_slider", {
        slidesPerView: "auto",
        initialSlide: 1,
        centeredSlides: true,
        on : {
            transitionEnd : function(){
                let pageNum = this.activeIndex;
                
                if(pageNum == 0){
                    body.classList.add("cmr_fscreen");
                    body.classList.remove("cmr_filming");
                    body.classList.remove("cmr_draw");
                    fullscreenBody.style.display = "block";
                    filminBody.style.display = "none";
                    drawBody.style.display = "none";

                }else if(pageNum == 1){
                    body.classList.add("cmr_filming");
                    body.classList.remove("cmr_draw");
                    body.classList.remove("cmr_fscreen");
                    filminBody.style.display = "flex";
                    drawBody.style.display = "none";
                    fullscreenBody.style.display = "none";
                } else if (pageNum == 2){
                    body.classList.add("cmr_draw");
                    body.classList.remove("cmr_filming");                    
                    body.classList.remove("cmr_fscreen");
                    filminBody.style.display = "none";
                    fullscreenBody.style.display = "none";
                    drawBody.style.display = "block";
                }
            }
        },
    });

// slider button click
    const camara_slider_btn = document.querySelectorAll(".cmr_camera_slider .swiper-slide > a");
    if(!camara_slider_btn) return;
    camara_slider_btn.forEach((item, index)=>{
        item.addEventListener("click", function(e){
            e.preventDefault();
            camera.slideTo(index);            
        })
    })
})();
    
const filmingBox = document.querySelector(".cmr_filmingBox");
const filmingBefore = document.querySelector(".filming_before");
const filmingAfter = document.querySelector(".filming_after");
const cameraBtn = document.querySelector(".cmr_cameraBtn");

//촬영 버튼
(function(){
    const filmingBtn = document.querySelector(".filming_btn");
    if(!filmingBtn) return;
    filmingBtn.addEventListener("click", function(){    
        filmingBefore.style.display = "none";
        filmingAfter.style.display = "flex";
        cameraBtn.style.display = "none";
        filmingBox.classList.add("active");
    });  
})();

//재촬영 버튼
(function(){
    const filmingRetake = document.querySelector(".filming_retake");
    if(!filmingRetake) return;
    filmingRetake.addEventListener("click", function(){
        filmingAfter.style.display = "none";
        filmingBefore.style.display = "flex";
        cameraBtn.style.display = "flex";

        filmingBox.classList.remove("active");
    });
})();

/* 그리기 기능 버튼 */
(function(){
    const drawBox = document.querySelector(".cmr_drawBox");
    if(!drawBox) return;
    const drawFunction = document.querySelector(".cmr_drawFunction");
    drawBox.addEventListener("click", function(){
        drawFunction.style.display = "block";
    });
})();


// 인식결과 이미지 크기
(function(){
  const contents = document.querySelector(".trans_photo");
  if(!contents) return;
  const result_photo = document.querySelector(".ocr_recog_result_photo");
  const scroll_popup_symbol = document.querySelector('.scroll_popup_symbol');
  const scroll_popup = document.querySelector('.scroll_popup');
  let contents_h = contents.offsetHeight;
  let result_photo_h = contents_h + 20;

  result_photo.style.height = `${result_photo_h}px`;
  
  scroll_popup_symbol.addEventListener("click", function(){   
    if(scroll_popup.classList.contains("active")){
      contents_h = contents.offsetHeight;
      result_photo_h = contents_h + 20;     
      gsap.to(result_photo, {height:result_photo_h, duration:0.8})
    }else{
      gsap.to(result_photo, {height:"100vh", duration:0.3})
    }   
  });
})();

// ocr history more 
(function(){
   const history_block = document.querySelectorAll(".history_block"); 

   history_block.forEach(item=>{   
    const history_item = item.querySelectorAll(".history_item");    
    const more_btn = item.querySelector(".btn_wrap button");
    const history_tl = gsap.timeline();

    more_btn.addEventListener("click", function(){     
      history_item.forEach((h_item)=>{
        if(h_item.classList.contains("item_hidden")){
          h_item.parentElement.style.display = "block";
          h_item.classList.add("item_show");
          h_item.classList.remove("item_hidden");
          history_tl.to(h_item, {autoAlpha:1, duration:.8, stagger: 0.2}, "-=0.5" ); 
        } 
      }); 
     this.style.display = "none";  
    })    
   });
})();


//edit mode  카메라 히스토리 에디트 모드 
(function(){
  const history_mode_btn = document.querySelector(".history_mode_btn button"); 
  if(!history_mode_btn) return;
  const history_block = document.querySelectorAll(".history_block");
  if(!history_block) return;
  const history_mode_btn_icon = history_mode_btn.querySelector("i");
  const history_mode_btn_text = history_mode_btn.querySelector("span");
  const ocr_history_main = document.querySelector(".ocr_history_main");   
  const select_all = document.querySelector(".select_all input[type='checkbox']");  
  const history_checkbox = document.querySelectorAll(".history_item_dot input[type='checkbox']"); 
  let mode_flag = true;

  // edit mode
  history_mode_btn.addEventListener("click", function(){
    ocr_history_main.classList.toggle("mode_edit");
    if(mode_flag){
      history_mode_btn_icon.style.display = "none";
      history_mode_btn_text.innerText = "Cancel";
      mode_flag = false;
    }else{
      history_mode_btn_icon.style.display = "block";
      history_mode_btn_text.innerText = "Edit";     
      mode_flag = true;

      if(select_all.checked){
        history_checkbox.forEach(item => {
          item.checked = false;
        })
      };     
    }
  });

  // check all
  select_all.addEventListener("change", function(e){
    if (e.currentTarget.checked) {
      history_checkbox.forEach(item => {
        item.checked = true;
      })
    } else {
      history_checkbox.forEach(item => {
        item.checked = false;
      })
    }
  })

  //check box input
  const history_confirm = document.querySelector(".history_confirm");
  history_checkbox.forEach(item=>{
    item.addEventListener("change", function(e){
      if (e.currentTarget.checked) {
        history_confirm.classList.add("active");
      }else{
        history_confirm.classList.remove("active");
      }
    });
  })
})();


