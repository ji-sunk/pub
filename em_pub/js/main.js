/**
 * change color - 0624 
 * click audio - 0617 href check a tag, button tag 구분
 * page load img active check 
 * main slider
 *  scroll sticky
 * topic grade country select
 *  topic grade learn selecte
 * daily topic tab
 * scorll_popup 
 * topic course scroll, line ani - 0624 
 * indicatior - 0624
 * scroll dot - 0624
 */

/*change color */
/*모드 생상 변경 ex  상단 주니어, 시니어, 테마1 버튼*/
(function () {     
  const mode_list = document.querySelectorAll(".mode li");
  const body = document.body;

  mode_list.forEach(item =>{
    item.addEventListener('click', (e)=>{
      e.preventDefault();       
        
      /*jouinor, senior 이외 theme에서 css의 색상값을 테마에 맞게 변경*/
      const setVariables = (vars, target) => {
        Object.entries(vars).forEach(v => {
          target.style.setProperty(v[0], v[1])
        });
      }   
      
      // 2022.09.08
      /** 2022.09.14
       * 캐릭터별 컬러 셋 아래와 같이 적용 됩니다.
       * 캐릭터 이미지는 앞에 [캐릭터명_abce_defg.webp] 으로 변경 
       * 단순 캐릭터, 프로파일 이미지는 character폴더에 움직임이 있는 캐릭터는 interaction폴더에 위치
       */    
      const rachael_color = {
        '--bulletColor':'#ef5e4e',
        '--gradationStart':'#ea7263',
        '--gradationEnd':'#ef5e4e',
        '--moreBadgeBg': '#ef5e4e',
        '--scrollBar':'#eb1d02',
        '--point_yellow' : "#ffd752",  
        '--point_yellow_g_start':'#ffd800',
        '--point_yellow_g_end':'#ffd752',
        '--disabled_bg':'#F1C0BA',
        '--disabled_text':'#FFFFFF',  
      };
      // 2022.09.14
      const peter_color = {
        '--bulletColor':'#1998a3',
        '--gradationStart':'#1998a3',
        '--gradationEnd':'#1998a3',
        '--moreBadgeBg': '#1ea5a5',
        '--scrollBar':'#1998a3',
        '--point_yellow' : "#ffd752",  
        '--point_yellow_g_start':'#ffd800',
        '--point_yellow_g_end':'#ffd752',
        '--disabled_bg':'#a5dbdb',
        '--disabled_text':'#FFFFFF',  
      };
      
      const text = e.target.innerText;
      const icon = document.querySelectorAll(".add_new_color");     
/*각 테마별 색상값을 넣기위해 body에 jouinor, senior등 테마 클래스 추가
object는 페이지별 css가 영향을 줄수 없음, 
svg내부에 css따로 추가(css/svg.css), 
js로 접근 가능 object 내부 svg 테마별 클래스 추가 */

//svg 아이콘 색상 변경
      icon.forEach(icon_item => {   
        const doc = icon_item.getSVGDocument(); //object내 document 접근   
        if(doc === null) return;
        const svg = doc.querySelector("svg");//document - svg
        
        if(text === "junior"){     
          svg.removeAttribute('style');   
          svg.classList.remove("senior");
        }
        if(text === "senior"){  
          svg.removeAttribute('style');      
          svg.classList.remove("junior");
        }         

        if(text === "rachael"){   
          svg.removeAttribute('style');         
          setVariables(rachael_color, svg);  
        }else{    
          svg.classList.remove("rachael");
        }  
        
        if(text === "peter"){  
          svg.removeAttribute('style');            
          setVariables(peter_color, svg);  
        }else{    
          svg.classList.remove("perter");
        }   
        svg.classList.add(text);       
      }); 

/**
 * 2022.09.14
 * 테마(캐릭터 별) 색상변경 페이지에서 주니어, 시니어. 캐릭터1. 캐릭터2 선택,
 * 주니어, 시니어 css로 고정, 이후 캐릭터 1, 2 는 바디에 컬러 값 적용
 * 
 * */
      if(text === "junior"){
        body.removeAttribute('style'); 
        body.classList.remove("senior");      
      }
      if(text === "senior"){
        body.removeAttribute('style');
        body.classList.remove("junior");    
      }        

      if(text === "rachael"){
        body.removeAttribute('style');
        setVariables(rachael_color, body);          
      }else{              
        body.classList.remove("rachael");      
      } 

      if(text === "peter"){
        body.removeAttribute('style');     
        setVariables(peter_color, body);          
      }else{        
        body.classList.remove("peter");      
      } 
      body.classList.add(text);  

 
      /*change img src 테마별 이미지가 바뀔때 test*/
      // (function(){
      //   const ch_img = document.querySelectorAll(".ch_img");  
      //   if(!ch_img)return;

      //   ch_img.forEach(item =>{
            //src 추출
      //     const arr =  item.getAttribute('src').split("/");
      //     let [name, ex] = arr[arr.length - 1].split("."); 

      //     arr[arr.length - 1] = [name+=`_${text}` , ex].join('.'); //기존파일명 뒤에 _senior, theme_01등 
      //     item.src = arr.join('/');
      //   })
      // })();
    })
  })  

//  20220902 fullscreen test 삭제
})();


/*click audio*/
(function(){

  const audio = document.querySelector(".audio_wrap");
  if(!audio) return;
  const source = audio.querySelector(".audio_source");
  const page = document.querySelector(".main_page");
  const audio_btn = document.querySelectorAll(".audio_btn");
  let dot;
  let click_time = 1000;
  
  page ? dot="." : dot="..";

  function audio_handle(e_target){ 
    const audio_source = e_target.dataset.audio;//click get data-audio value
    if(!audio_source) return;
    
    if(audio_source == "cl_click"){
       click_time = 2000;
    }else if(audio_source == "splash_load"){
      click_time = 4000;
    }
    
    source.src = `${dot}/audio/${audio_source}.mp3`; 
   
    audio.load();  
    audio.play();
       
    if(!e_target.hasAttribute("href")) return; 
    const target = e_target.href;
    setTimeout(function() {
      location.href = target;
    }, click_time);
  }
  
  audio_btn.forEach(item =>{
    item.addEventListener("click", e =>{  
      e.preventDefault();
      audio_handle(e.currentTarget);  
    })
  });

  //chrome 정책 autoplay 안됨
  window.addEventListener("load", e =>{
   const body = document.body;
   audio_handle(body);
  })

})();


/*page load img active check & child object add active*/
(function(){
  const separ = document.querySelectorAll(".separ_active .active object.add_new_color"); 
  if(!separ) return;

  separ.forEach(item =>{ 
    item.addEventListener("load", function() {
      const doc = this.getSVGDocument(); //object내 document 접근
      const svg = doc.querySelector("svg");   
      svg.classList.add('active'); 
    }) 
  });
})();

//2022.08.11 [test] 로드시 시니어 아이콘 색상 변경 
(function(){
  const body = document.body;
  const obj = document.querySelectorAll("object"); 
  let classname;

  if(body.classList.contains("senior")){
    classname = "senior";
  }

  obj.forEach(item =>{ 
    if(!item) return;
    item.addEventListener("load", function() {
      const doc = this.getSVGDocument();
      const svg = doc.querySelector("svg");   
      svg.classList.add(classname); 
    }) 
  });
})();


/*main slider*/ 
(function(){
  /*swiper slider option */
  function slider_option(target){    
    let page = false;
    if(target){
      const target_dot_wrap = target.nextElementSibling;   
      page = {el: target_dot_wrap, clickable: true, type: 'bullets',}
    }
    return {
      effect: 'slider',   
      loop: true,    
      speed: 600,  
      slidesPerView: 'auto',
      pagination: page,
    }
  }
  /*ai slider 메인에 2개 */
  const ai_slider = document.querySelectorAll(".ai_slider");
  const main_ai_slider = [];
  ai_slider.forEach((item, index) =>{  
    main_ai_slider[index] = new Swiper(item, slider_option(item));
  }) 
})();

/*게임 슬라이더 */
(function(){
  const swiper = new Swiper('.game_list_wrap', {
    effect: 'slider',  
    speed: 600,  
    slidesPerView: 'auto',
    pagination:{
       el: ".game_dots", 
       clickable: true, 
       type: 'bullets',
    },
    watchOverflow : true
  });
})();


/*scroll sticky - 서브페이지에서 스크롤 시 상단에 붙이기 */
(function(){
  const target = document.querySelector('.sub_scrolltop_obj');
  if (!target) return;   
  const target_wrap = target.parentNode;
  const container = document.querySelector('.container');  

  container.addEventListener('scroll', function(e){
    if (!window.matchMedia('(orientation: portrait)').matches) return;
    let currentScrollValue = this.scrollTop;   

    if (currentScrollValue > target_wrap.offsetTop) {
      target.classList.add("sticky");
      target.style.top = `${container.offsetTop}px`;  
    } else {
      target.classList.remove("sticky");
      target.style.top = 0;
    }
  })  
  // 2022.09.20 add resize 
  window.addEventListener('resize', function(){      
    const w_width = window.innerWidth;  

    if(w_width < 1024) return;
    if(window.matchMedia('(orientation: portrait)').matches) return;
    
    target.classList.remove("sticky");
    target.style.top = '';
  })


})();

/*topic grade country select  나라별 셀렉트박스*/
(function(){
  var country_year_btn = document.querySelector(".country_year_btn");
  if(!country_year_btn) return;
  /*셀렉트 박스 클릭 */
  country_year_btn.addEventListener('click', function(e){
    e.preventDefault();  
    const btn_wrap = this.parentNode;
    var country_year_list = this.nextElementSibling;//select list

    if (this.classList.contains("on")) {//셀렉트 박스 접기
      gsap.to(country_year_list, { display: 'none', height: 0, duration: .3 });//gsap animation library 
      this.classList.toggle('on');
      btn_wrap.classList.toggle('on_wrap');    
    } else {	//셀렉트 박스 펼치기
      this.classList.toggle('on');
      btn_wrap.classList.toggle('on_wrap');
      gsap.set(country_year_list, { display: 'block' });
      gsap.to(country_year_list, { height: 'auto', duration: .3 });
    }
 })
})();

/*topic grade learn selecte 학년별 학습 셀렉트박스 */
(function(){
  const grade_list_btn = document.querySelectorAll(".grade_list_btn");  
  if(!grade_list_btn) return;  
   
  grade_list_btn.forEach((item,index,arr) =>{   
    /*로딩시 첫번째 셀렉트박스 오픈 - 하위 오브젝트svg에 on클래스 추가  */
    const first_obj = arr[0].querySelector('.add_new_color');
    first_obj.addEventListener("load", function() {
      const first_doc = this.getSVGDocument();
      const first_svg = first_doc.querySelector("svg");
      first_svg.classList.add('on');  
    });

    /*셀렉트 박스 클릭 */
    item.addEventListener('click', function(e){
      e.preventDefault();
      const btn_wrap = this.parentNode;
      const taget_obj = this.querySelector('.add_new_color');
      const taget_doc = taget_obj.contentDocument; // contentDocument 속성으로 접근
      const target_svg = taget_doc.querySelector('svg'); //색상 변화할 svg     
      const country_year_list = this.nextElementSibling;  
    
      if (this.classList.contains("on")) {
        gsap.to(country_year_list, { display: 'none', height: 0, duration: .3 });		
        this.classList.toggle('on');
        btn_wrap.classList.toggle('on_wrap');   
        target_svg.classList.toggle('on');
      } else {	    
        //clear();
        this.classList.toggle('on');
        btn_wrap.classList.toggle('on_wrap');
        target_svg.classList.toggle('on');
        gsap.set(country_year_list, { display: 'block' });
        gsap.to(country_year_list, { height: 'auto', duration: .3 });
      }
    })
    /* port - 셀렉트 박스 첫번째 오픈 / land - 전부 오픈 font-color, on제거*/
    window.addEventListener('resize', function(){             
      if (window.matchMedia('(orientation: portrait)').matches) {
        arr[0].classList.add('on');
        arr[0].parentNode.classList.add('on_wrap');       
      }else{
        item.classList.remove('on');
        item.parentNode.classList.remove('on_wrap');       
        item.nextElementSibling.style="";
      }    
    })
  });
})();


/*daily topic tab 탭*/
(function () {     
  const tab_nav = document.querySelector(".tab_nav");
   if (!tab_nav) return; 
     
  const tab_target_btn = tab_nav.querySelectorAll("li a");
  const tab_target_con = document.querySelectorAll(".tab_content_wrap .tab_content");
  const country_year = document.querySelector('.country_year');
  const container = document.querySelector('.container');
  const topic_section = document.querySelector('.tl');
  const main = document.querySelector('main');
  
  /*모든 active 제거 */
  function clear(target){
    target.forEach(item => {
      item.classList.remove('active');
    })
  }

  tab_target_btn.forEach(item =>{
    item.addEventListener('click', e =>{
      e.preventDefault();
      const target_btn = e.target;
      const target_class =  `.${target_btn.getAttribute('href').substr(1)}`;//#test -> .test
      const target_con =  document.querySelector(target_class);
     
      // container.scrollTo({top: 0, behavior: "smooth"});
      gsap.to(container, { scrollTo: 0 , duration:.5}); // gsap animation library 

      clear(tab_target_btn);//active 제거
      target_btn.classList.add("active");

      clear(tab_target_con);
      target_con.classList.add("active");

      /*tab handle*/
      function show_country_year(bool){
        if(bool){
          main.classList.add('grade_main');
          main.classList.remove('topic_main');         
        }else{
          main.classList.add('topic_main');
          main.classList.remove('grade_main');
        } 
      }      
      /*tab이 grade일때만 학년 선택 보이기 */
      if(target_con.classList.contains('grade_list_con')){
        country_year.classList.add('active');
        if(topic_section) show_country_year(true);
      }else{
        if(country_year){
          country_year.classList.remove('active');
        }      
        if(topic_section) show_country_year(false);
      }      
    });
  })
})();

/*2022.09.07 topic scorll_popup*/
(function(){
  const scroll_popup = document.querySelector('.scroll_popup');
  if(!scroll_popup) return;
  if(document.querySelector(".ocr_recog_result")) return;
  const title_btn = document.querySelector('.tl .sub_title .text_wrap');
  const scroll_popup_clsose_btn = document.querySelector('.scroll_popup_close');
  const scroll_popup_symbol = document.querySelector('.scroll_popup_symbol');
  
  title_btn.addEventListener("click", function(){
    scroll_popup.classList.add("active"); 
    title_btn.classList.add("popup_cat_active");
  });
  // 닫기 버튼 타블렛에서만
  scroll_popup_clsose_btn.addEventListener("click", function(){
    scroll_popup.classList.remove("active"); 
    title_btn.classList.remove("popup_cat_active");
  });

  //2022.09.07 스크롤 다운 모바일에서만   
  let scroll_popup_top = null;
  let flag = false;//터지 여부
  let w_height = window.innerHeight;
  let max_top = Math.floor((80 * w_height) / 100);
  let val = null;//터치 드래그 y 값

  scroll_popup_symbol.addEventListener("touchstart", e =>{
    scroll_popup_top = scroll_popup.getBoundingClientRect().top;
    flag = true;
  }, false); 

  scroll_popup_symbol.addEventListener("touchmove",  e =>{   
    val = Math.floor(e.touches[0].pageY);  
    if(flag){
      if(val >= scroll_popup_top){        
        scroll_popup.style.top = `${val}px`;  
      }      
    }      
  }, false);
  
  scroll_popup_symbol.addEventListener("touchend",  e =>{      
    if(val >= max_top){
      scroll_popup.classList.remove("active"); 
      title_btn.classList.remove("popup_cat_active");
      scroll_popup.style.top = "";  
    }else{
      scroll_popup.style.top = `${scroll_popup_top}px`;  
    }  
    flag = false;    
  }, false);

})();

/**
 * 2022.08.31
 * 코스학습 완료 화살표 아이콘 색상 
 */
(function(){
  const cl = document.querySelector(".cl");
  if(!cl) return;

  const complete_item = document.querySelectorAll(".course_complete");

  complete_item.forEach(item => {
    const state = item.querySelector(".complete_state");
    const state_arrow = state.querySelector("object");        
    let state_arrow_class = "";

    if(state.classList.contains("state_basic")){
      state_arrow_class = "basic_arrow";
    }else if(state.classList.contains("state_below_basic")){
      state_arrow_class = "below_basic_arrow";
    }else if(state.classList.contains("state_proficient")){
      state_arrow_class = "proficient_arrow";
    }else if(state.classList.contains("state_advanced")){
      state_arrow_class = "advanced_arrow";
    }else if(state.classList.contains("state_review")){
      state_arrow_class = "review";
    }

    state_arrow.addEventListener("load", function() {
      const doc = this.getSVGDocument(); //object내 document 접근
      const svg = doc.querySelector("svg");   
      svg.classList.add(state_arrow_class); //svg.css 추가
    });    
  })
})();


/*topic course scroll, line ani*/
(function(){
  const cl = document.querySelector(".cl");
  if(!cl) return;
 

  const course_item = document.querySelectorAll(".course_part");//각 학습박스(소주제), 소주제 타이틀 title  
  let item_index = null; //course_item index

  // 랜덤 소수제
  while(true){    
    const random = Math.floor(Math.random() * course_item.length);

    if(course_item[random].classList.contains("course_complete")) continue;
    if(!course_item[random].classList.contains("course_header")){ //소주제 타이틀 title 제외
      item_index = random;
      break;
    }
  }

   /*선택된 소주제 */   
  let target = course_item[item_index];//random target 
  target.classList.add("course_learning");

   /*  
   * first loading
   * @param {con} 스크롤 continer
   * @param {scorll_vel} target top or left 스크롤 값
   * @param {re} resize 여부 
   *  */ 
  function course_scroll(con, scorll_vel, re){   
    if(re){
      gsap.to(con, { scrollTo: scorll_vel, duration:0.01}); 
    }else{
      gsap.to(con, { scrollTo: scorll_vel , duration:0.2, ease:Power0.easeNone, delay:1.5});       
    }      
    
  }    
   /*
   * @param {line} 디바이스별 라인
   * @param {re} resize 여부 
   *  */ 
  function line_ani(line, re){
    const tl = gsap.timeline({}); //gsap timeline    
    let time = re ? 1000 : 1500; //resize object delay
    
    setTimeout(() => {  
      for(let i=0; i<item_index; i++){   
        const target_obj = course_item[i].querySelector(`.line > object${line}`);        
        const line_obj = target_obj.getSVGDocument();//object doc접근    
        if(!line_obj) return;
        const line_svg = line_obj.querySelector(".move_line"); 

        if(re){
          line_svg.style.strokeDashoffset = 0;  
        }else{
          tl.to(line_svg, {strokeDashoffset:0, duration:0.1}, "-=0.02");    
        }  
      }  
    }, time, line);  
  }
   
   /* 
   * @param {re} resize 여부 
   *  */ 
  function couse_start(re){  
    let container = document.querySelector(".container");
    let target_dist = {x:0, y: target.offsetTop};
    let w_width = window.innerWidth;  

    if(w_width < 600){
      line_ani(".mo_line", re);
      course_scroll(container, target_dist, re);     
    }else if(window.matchMedia("(orientation: portrait)").matches){
      line_ani(".po_line", re);
      course_scroll(container, target_dist, re);
    }else{        
      if(w_width < 720){ //갤럭시 폴드
        line_ani(".mo_line");
        course_scroll(container, target_dist, re);      
      }else{
        target_dist = {x:target.offsetLeft, y:0}    
        container = document.querySelector(".cl .main_contents .wrap");
        line_ani(".lan_line ", re);
        course_scroll(container, target_dist, re);   
      }    
    }
  }couse_start(false);
  
  window.addEventListener('resize', function(e){
    couse_start(true); 
  });


  /*test 다음 학습 */
  const next_course = document.querySelector(".next_course");
  // 다음학습 추가
  next_course.addEventListener("click", function(){    
    const now = document.querySelector(".course_learning");    
    const now_next = now.nextElementSibling; //다음 학습
    const now_next_level = now.parentNode.parentNode.parentNode.nextElementSibling; //다음 레벨
    const now_next_level_header = now_next_level.querySelector(".course_header"); 
    const now_next_level_part = now_next_level.querySelector(".course_list .course_part");  
    let now_obj ;
    let next_header_obj;
    let w_width = window.innerWidth;  

    if(now_next_level.classList.contains("course_coming") && !now_next)  return;   //마지막 학습
    
    let container = document.querySelector(".container");
    let target_dist;

    /* 
   * @param {con} 스크롤 continer
   * @param {scorll_vel} target top or left 스크롤 값
   *  */ 
    function course_scroll_next(con, scorll_vel){     
      gsap.to(con, { scrollTo: scorll_vel , duration:1, ease:Power0.easeNone,});  
    }

    if(w_width < 600){      
      now_obj = now.querySelector("object.mo_line");
      if(now_next_level_header){
        next_header_obj = now_next_level_header.querySelector("object.mo_line");
        next_part_obj = now_next_level_part.querySelector("object.mo_line");       
      }          
    }else if(window.matchMedia("(orientation: portrait)").matches){      
      now_obj = now.querySelector("object.po_line");
      if(now_next_level_header){
        next_header_obj = now_next_level_header.querySelector("object.po_line");
        next_part_obj = now_next_level_part.querySelector("object.po_line");  
      }
    }else{        
      if(w_width < 720){ //갤럭시 폴드      
        now_obj = now.querySelector("object.mo_line");
        if(now_next_level_header){
          next_header_obj = now_next_level_header.querySelector("object.mo_line");
          next_part_obj = now_next_level_part.querySelector("object.mo_line");   
        }    
      }else{
        now_obj = now.querySelector("object.lan_line");
        if(now_next_level_header){
          next_header_obj = now_next_level_header.querySelector("object.lan_line");
          next_part_obj = now_next_level_part.querySelector("object.lan_line");
        }
      }    
    }

     /* 
   * @param {target} target -> object tag 
   *  */ 
    function obj_line(target){
      //target.classList.add("course_learning"); 
      const line_obj = target.getSVGDocument();//object doc접근
      const line_svg = line_obj.querySelector(".move_line");  
      return line_svg;
    }
  
    //다음 레벨, 다음 코스가 있을때, 없을때 라인
    if(now_next != null && now_next.classList.contains("course_part")){
      item_index += 1;//resize update
      target = course_item[item_index];//resize update
      const line = obj_line(now_obj);

      now_next.classList.add("course_learning");

      if(window.matchMedia("(orientation: portrait)").matches){
        target_dist = {x:0, y: now_next.offsetTop}
      }else{
        container = document.querySelector(".cl .main_contents .wrap");
        target_dist = {x:now_next.offsetLeft, y:0}
      }     
      course_scroll_next(container, target_dist);        
      gsap.to(line, {strokeDashoffset:0, duration:1},);   

    }else{    
      item_index += 2;//resize update
      target = course_item[item_index];//resize update

      const line = obj_line(now_obj);
      const next_header = obj_line(next_header_obj);
      const next_line_tl = gsap.timeline({}); //gsap timeline   

      now_next_level_part.classList.add("course_learning");

      if(window.matchMedia("(orientation: portrait)").matches){
        target_dist = {x:0, y: now_next_level_part.offsetTop};
      }else{
        container = document.querySelector(".cl .main_contents .wrap");
        target_dist = {x:now_next_level_part.offsetLeft, y: 0};
      }

      course_scroll_next(container, target_dist);      

      next_line_tl.to(line, {strokeDashoffset:0, duration:.5}); 
      next_line_tl.to(next_header, {strokeDashoffset:0, duration:.5}, "-=0.06" );     
    }
    now.classList.remove("course_learning");
  })
})();


/**
 * indicatior
 */
(function(){
  const cl = document.querySelector(".cl");
  if(!cl) return;
    
  const scroll_indicator = document.querySelector(".scroll_indicator")
  const track = document.querySelector(".indicator_bar"); //인디케이터 프로그래스 트랙
  const bar = track.querySelector("span");//인디케이터 프로그래스 바  

  let percentageScrolled = 100;

  //위치 %
  function resize_vel(){   
    const learn = document.querySelector(".course_learning"); 
    let container = document.querySelector(".container");   
    let learn_dist =  learn.offsetTop; //course_learning 높이
    let container_dist =  container.scrollHeight - container.offsetHeight;; //컨테이너 높이    
    
    if(window.matchMedia("(orientation: portrait)").matches){     
      container = document.querySelector(".container");  
      learn_dist =  learn.offsetTop; 
      container_dist = container.scrollHeight - container.offsetHeight; 
    }else{   
      container = document.querySelector(".cl .main_contents .wrap");   
      learn_dist =  learn.offsetLeft; 
      container_dist = container.scrollWidth - container.offsetWidth; 
    } 
   
    return Math.floor((learn_dist * 100) / container_dist); 
  }

 /* 
   * @param {delay_time} gsap delay titme
   * @param {duration_time} gsap duration titme
   *  */ 
  function indi_bar(delay_time, duration_time){        
    percentageScrolled = resize_vel(); 

    //indicator가 100가 되엇을때 
    function percent_100(){
      if(percentageScrolled >= 100){
        scroll_indicator.classList.add("bar_100");
      }else{
        scroll_indicator.classList.remove("bar_100");
      }     
    }
   
    if(window.matchMedia("(orientation: portrait)").matches){
      bar.style.width = "4px";
      gsap.to(bar, {height:`${percentageScrolled}%`, duration:duration_time, ease:Power0.easeNone, delay:delay_time, onComplete: percent_100()});     
    }else{
      bar.style.height = "4px";
      gsap.to(bar, {width:`${percentageScrolled}%`,  duration:duration_time, ease:Power0.easeNone, delay:delay_time, onComplete: percent_100() });
    }
  }
  indi_bar(1.5, .25);//delay itme, duration_time

  const next_course = document.querySelector(".next_course");

  // 다음 코스버튼 눌렀을때
  next_course.addEventListener("click", function(){
    indi_bar(0, 1);    
  })
// resize indicator widht, height
  window.addEventListener('resize', function(e){
    if(window.matchMedia("(orientation: portrait)").matches){
      bar.style.height = resize_vel()+"%"; 
      bar.style.width = "4px";     
    }else{
      bar.style.height = "4px"; 
      bar.style.width = resize_vel()+"%";
    }
  });
})();


//scroll dot 
(function(){
  let scoll_contain ; 
  const level = document.querySelectorAll(".course_wrap"); 
  const scroll_dot = document.querySelector(".scroll_dot");
  if(!scroll_dot) return;
  const curr_level = scroll_dot.querySelector(".curr_level");
  const total_level = scroll_dot.querySelector(".total_level");
  let con_dist; 
  let scrolladble;

  total_level.innerText = level.length; // 총 레벨

  function scroll_dot_move(){
    if(window.matchMedia('(orientation: portrait)').matches){ 
      scoll_contain = document.querySelector(".container"); 
      con_dist = scoll_contain.scrollHeight - scoll_contain.offsetHeight; 
    }else{     
      scoll_contain = document.querySelector(".cl .main_contents .wrap");         
      con_dist = scoll_contain.scrollWidth - scoll_contain.offsetWidth; 
    }   
      
    scoll_contain.addEventListener("scroll", function(e){ 
      if(window.matchMedia("(orientation: portrait)").matches){
        scrolladble = Math.floor((scoll_contain.scrollTop * 100) / con_dist); 
        scroll_dot.style.top = `${scrolladble}%`;     
      }else{
        scrolladble = Math.floor((scoll_contain.scrollLeft * 100) / con_dist);    
        scroll_dot.style.left = `${scrolladble}%`; 
      } 
      // 스크롤 라벨
      level.forEach(item=>{    
        let level_dist = item.offsetTop;
        let level_hw = item.offsetTop + item.offsetHeight;
        let scroll_dist = scoll_contain.scrollTop;
          
        if(window.matchMedia("(orientation: portrait)").matches){
          scroll_dist = scoll_contain.scrollTop;
          level_dist = item.offsetTop;
          level_hw = item.offsetTop + item.offsetHeight;          
        }else{
          scroll_dist = scoll_contain.scrollLeft;
          level_dist = item.offsetLeft;
          level_hw = item.offsetLeft + item.offsetWidth;         
        }
  
        if(level_dist < scroll_dist &&  level_hw > scroll_dist){       
          curr_level.innerText = item.dataset.clevel;         
        }       
      })

      // 학습 파트로 돌아가기 버튼 보기
      const lear_part = document.querySelector(".course_learning ");
      const back_currnt_learn_btn = document.querySelector(".back_currnt_learn");      
      if(window.matchMedia("(orientation: portrait)").matches){
        if(lear_part.offsetTop + lear_part.offsetHeight < scoll_contain.scrollTop){
          back_currnt_learn_btn.classList.add("active");
        }else{
          back_currnt_learn_btn.classList.remove("active");
        }
      }else{
        if(lear_part.offsetLeft+ lear_part.offsetWidth < scoll_contain.scrollLeft){
          back_currnt_learn_btn.classList.add("active");
        }else{
          back_currnt_learn_btn.classList.remove("active");
        }
      }
      // 학습 파트로 돌아가기 버튼 클릭
      back_currnt_learn_btn.addEventListener("click", function(){
        if(window.matchMedia("(orientation: portrait)").matches){       
          gsap.to(scoll_contain, {scrollTo:{x:0, y:lear_part.offsetTop}, duration:.5});
        }else{
          gsap.to(scoll_contain, {scrollTo:{x:lear_part.offsetLeft, y:0}, duration:.5});
        }
      });

     
    }); 
  }scroll_dot_move();

  window.addEventListener('resize', function(e){
    scroll_dot_move();
    
  });

})();


//2022.07.13 daily_topic/number1.html 주제학습 소주제 리스트 다시 학습 아이콘 색상 변경 
(function(){
  const tl_learn_list = document.querySelector(".tl_learn_list");
  if(!tl_learn_list) return;
  const question_thumb = document.querySelectorAll(".question_thumb");

  question_thumb.forEach(item =>{
    if(item.classList.contains("q_learn_retry")){          
      const obj = item.querySelector(".thumb_start_btn object");  

      obj.addEventListener("load", function() {
        const doc = this.getSVGDocument(); //object내 document 접근
        const svg = doc.querySelector("svg");   
        svg.classList.add('black_arrow'); //svg.css 추가
      })       
    }
  })
})();


// 2022.07.14 메인 스크롤 헤더
(function(){
  const con_scroll = document.querySelector(".main_page header"); 
  if(!con_scroll) return;
  let timer;
  function scroll_on() {	  	
      if (!timer) {     
      timer = setTimeout(() => {
        let top = this.scrollY;    

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
  window.addEventListener('scroll', scroll_on);
})();


// 2022.07.14 메인 상단 구독여부 태그 
(function(){
  const subscribe_tag = document.querySelector(".subscribe_tag");
  if(!subscribe_tag) return;

  subscribe_tag.addEventListener("click", e=>{
    const target = e.currentTarget;
    target.classList.toggle("subscribe_on");
  })

})();


// 2022.07.14 메인 코스학습 활성 테스트
(function(){
  const course_active = document.querySelector(".course_active");
  if(!course_active) return;
  const junior_course_before =  document.querySelectorAll(".junior_course_before");
  const senior_course_before =  document.querySelectorAll(".senior_course_before");
  let junior_flag = true;
  let senior_flag = true;
   
  course_active.addEventListener("click", e=>{  
    //주니어 코스학습 변경
    if(junior_course_before){
      junior_course_before.forEach(item =>{
        const title = item.querySelector(".card_title h3");
        const desc = item.querySelector(".card_title p");    
        const btn = item.querySelector(".card_btn_wrap span");   
        item.classList.toggle("junior_course_before");
  
        if(junior_flag){
          // 2022.08.24 title 변경
          title.innerHTML = "My Course";
          desc.innerHTML = "Addition without regrouping (5)";
          btn.innerHTML = "Start";
          junior_flag = false;
        }else{
          title.innerHTML = "Let me know Your Level";
          desc.innerHTML = "Start AI Diagnostic Test <br>for your optimized daily course!";
          btn.innerHTML = "Test Start";
          junior_flag = true;
        }
      })
    }
    // 시니어 코스학습 변경
    if(senior_course_before){
      senior_course_before.forEach(item =>{
        const title = item.querySelector(".card_title h3");
        const desc = item.querySelector(".card_title p");    
        const icon = item.querySelector(".icon_wrap");   
        const card_btn_wrap = item.querySelector(".card_btn_wrap");   
        item.classList.toggle("senior_course_before");

        if(senior_flag){
          //2022.08.24 title 변경 
          title.innerHTML = "My <br>Course";
          desc.innerHTML = "Addition without regrouping (5)";
          icon.style.display = "flex";
          card_btn_wrap.style.display = "none";
          senior_flag = false;
        }else{
          title.innerHTML = "Let me know Your Level";
          desc.innerHTML = "Start AI Diagnostic Test for your optimized daily course!";
          icon.style.display = "none";
          card_btn_wrap.style.display = "flex";
          senior_flag = true;
        }
      })
    }
  })
})();

// 2022.08.15 구독 취소
(function(){
  const cancel_subscribe = document.querySelector(".cancel_subscribe");
  if(!cancel_subscribe) return;
  const daily_course = document.querySelectorAll(".daily_course");
  const body = document.body;
  let cancel_flag = true;
   

  cancel_subscribe.addEventListener("click", function(e){
    
    daily_course.forEach(item =>{
      const btn = item.querySelector(".card_btn_wrap span");   
      
      if(item.classList.contains("junior_course_before") || item.classList.contains("senior_course_before") ){
        alert("코스학습 활성 후 취소 가능");
      }else{
        item.classList.toggle("cancel_subscribe_course");
        if(cancel_flag){
          btn.innerHTML = "Subscribe";
          cancel_flag = false;
        }else{
          if(body.classList.contains("junior")){
            btn.innerHTML = "Start";
          }else{
            btn.innerHTML = "Test Start";
          }          
          cancel_flag = true;
        }
      }
    })    
  })  
})();


// 2022.07.14 gnb
(function(){
  const hamburger = document.querySelector(".hamburger .hamburger_btn");
  if(!hamburger) return;
  const gnb = document.querySelector(".gnb");
  const close_btn = gnb.querySelector(".close_gnb");
  const main_page = document.querySelector(".main_page");

  hamburger.addEventListener("click", e=>{
    gnb.classList.add("active");
    main_page.classList.add("none_scroll");//스크롤 방지
  })

  close_btn.addEventListener("click", e=>{
    gnb.classList.remove("active");
    main_page.classList.remove("none_scroll");
  })
})();

// 2022.07.20 스크롤 탑 버튼
(function(){
  const scroll_top_wrap = document.querySelector(".scroll_top_wrap");
  if(!scroll_top_wrap) return;
  const top_btn = document.querySelector(".top_btn");

  let timer;

  scroll_top_wrap.addEventListener("scroll", e=>{      
    const w_height = window.innerHeight - e.currentTarget.offsetTop;     
    if (!timer) {
      timer = setTimeout(() => {
        let top = scroll_top_wrap.scrollTop;
        timer = null;  
    
        if (top >= w_height) {         
          top_btn.classList.add("on");
        } else {
          top_btn.classList.remove("on");
        }       
      }, 100);
    }   
  });

  top_btn.addEventListener("click", e=>{
    gsap.to(scroll_top_wrap, { scrollTo: 0 , duration:.5}); 
  });

})();

// tuto slider 2022.07.21
(function(){
  const body = document.body;
  const tutorial_wrap = document.querySelector(".tutorial_wrap");
  if(!tutorial_wrap) {
     return;  
  }else{ 
    body.classList.add("none_scroll");//스크를 방지
  }; 
  const confirm_btn = tutorial_wrap.querySelector(".tuto_btn");//confirm button
  const tuto_close = tutorial_wrap.querySelector(".tuto_close");//close button
  
    //tuto slider
  const tuto_slider = new Swiper(".tuto_slider", {
    effect: 'slider',   
    speed: 600,  
    loop: false, 
    slidesPerView: 'auto',
    pagination: {
      el: '.tuto_dot',
      clickable: true, 
      type: 'bullets'
    },   
    on:{       
      // 넘어가기 시작했을때
      slideChangeTransitionStart: function () {
        if(!confirm_btn) return;
        const slider_length = this.slides.length; 
        const last_slider = this.slides[slider_length-1]; //마지막 슬라이드   
        
        if(last_slider.classList.contains("swiper-slide-active")){     
          confirm_btn.classList.add("active"); 
        }else{
          confirm_btn.classList.remove("active"); //start 버튼 활성화          
        } 
      },
    }
  });

  // 닫기 handler
  function close_tuto(){
    body.classList.remove("none_scroll");    
    tutorial_wrap.style.display = "none";
  }
  if(confirm_btn){
    confirm_btn.addEventListener("click", e=>{
      confirm_btn.classList.remove("active"); //start 버튼 활성화    
      close_tuto()
    }); //튜토리얼 마지막 컨펌 버튼
  }  
  tuto_close.addEventListener("click", close_tuto); //
})();


/** 
 * 메인 노티스 위치 변경 
 */ 
(function(){
  const notice = document.querySelector(".main_notice");
  if(!notice) return;
  const weekly_mission_wrap = document.querySelector(".weekly_mission_wrap .wrap");
  const main_contents = document.querySelector(".main_contents .wrap");
  let w_width = window.innerWidth;  
  
  function move_notice(){
    w_width = window.innerWidth;  
    if(w_width == 717 || w_width < 712) return; // 갤럭시 폴더에서는 고정

    if (window.matchMedia('(orientation: portrait)').matches) {
      weekly_mission_wrap.prepend(notice);
    }else{
      main_contents.prepend(notice);
    }
  }
  move_notice();
  
  window.addEventListener('resize', function(){  
    move_notice();
  })
})();

