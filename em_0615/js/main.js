/*
* change color
* click audio
* page load img active check 
* main slider
* scroll sticky
* topic grade country select
* topic grade learn selecte
* daily topic tab
* scorll_popup 
* topic course scroll, line ani
* course scroll
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
      const myVariables = {
        '--mainColor':'#eb1d02',
        '--gradationStart':'#fcaf92',
        '--gradationEnd':'#ef3232',
        '--moreBadgeBg': '#eb1d02',
        '--targetRing':'#d8471a',
        '--icon_main':'#f55757',
        '--icon_yellow':'#ffb420',
        '--icon_sub_01':'#bf0101',        
        '--countrySelectBg':'#fcaf92',
        '--arithmetic_icon':'#eb1d02',
        '--subText':'#eb1d02',
        '--subActive':'#eb1d02',
        '--checkColor':'#eb1d02',
        '--scrollBar':'#eb1d02',
        '--topicGradationStart':'#fcaf92',
        '--topicGradationEnd':'#ef3232',
        '--currentSubjectBgStart':'#fcaf92',
        '--currentSubjectBgEnd':'#ef3232',
        '--courseLine':'#fcaf92',
      };
      const text = e.target.innerText;
      const icon = document.querySelectorAll(".add_new_color");     
/*각 테마별 색상값을 넣기위해 body에 jouinor, senior등 테마 클래스 추가
object는 페이지별 css가 영향을 줄수 없음, 
svg내부에 css따로 추가(css/svg.css), 
js로 접근 가능 object 내부 svg 테마별 클래스 추가 */
      icon.forEach(icon_item => {   
          const doc = icon_item.getSVGDocument(); //object내 document 접근   
          if(doc === null) return;
          const svg = doc.querySelector("svg");//document - svg

       
          
          if(text === "junior"){
            body.classList.remove("senior");
            svg.classList.remove("senior");
          }

          if(text === "senior"){
             body.classList.remove("junior");
             svg.classList.remove("junior");
          }
         
          if(text === "theme_01"){
            setVariables(myVariables, body);     
            setVariables(myVariables, svg);  
          }else{
            body.removeAttribute('style');
            svg.removeAttribute('style');
            body.classList.remove("theme_01");
            svg.classList.remove("theme_01");
          } 
          
          svg.classList.add(text);
          body.classList.add(text);        
      }); 

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

  /*모바일 전체화면 테스트 screenfull.js 테스트용 삭제바람*/
  const sf_btn = document.querySelector(".sf_btn");
  sf_btn.addEventListener('click', e =>{
    if (screenfull) {
      screenfull.toggle();       
      e.currentTarget.classList.toggle("on");        
    }
  })
  /*---------- */
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
  
  audio_btn.forEach(item =>{
    item.addEventListener("click", e =>{
      e.preventDefault();
      const audio_source = e.currentTarget.dataset.audio;//click get data-audio value
      const target = e.currentTarget.href;

      if(audio_source == "cl_click") click_time = 2000;

      source.src = `${dot}/audio/${audio_source}.mp3`;
      audio.load();
      audio.play();
      setTimeout(function() {
        location.href = target;
      }, click_time);
    })
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
  /*게임 슬라이더 */
  const game = document.querySelectorAll(".game_slider .game_item");
  let main_game_slider;
  game.length > 3 ? main_game_slider = new Swiper('.game_slider', slider_option()) : null;//슬라이드 item이 3개이상만 슬라이드 적용 
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
        country_year.classList.remove('active');
        if(topic_section) show_country_year(false);
      }      
    });
  })
})();

/*scorll_popup*/
(function(){
  const scroll_popup = document.querySelector('.scroll_popup');
  if(!scroll_popup) return;
  const scroll_popup_symbol = document.querySelector('.scroll_popup_symbol');
  const scroll_popup_clsose_btn = document.querySelector('.scroll_popup_close');

  function scrollHandle(){
    scroll_popup.classList.toggle("active"); 
  } 
  scroll_popup_symbol.addEventListener("click", scrollHandle);
  scroll_popup_clsose_btn.addEventListener("click",scrollHandle);
})();


/*topic course scroll, line ani*/
(function(){
  const cl = document.querySelector(".cl");
  if(!cl) return;

  /* page load .course_learning check  */
  // const arrow_target = document.querySelectorAll(".course_learning  .arrow_12_wrap object.add_new_color"); 
  // arrow_target.forEach(item =>{ 
  //   item.addEventListener("load", function() {
  //     const doc = this.getSVGDocument(); //object내 document 접근
  //     const svg = doc.querySelector("svg");   
  //     svg.classList.add('active'); 
  //   }) 
  // });

  /*select random learn box & scroll ani*/
  const course_wrap = document.querySelectorAll(".course_wrap");//대주제
  const course_item = document.querySelectorAll(".course_part");//각 학습박스(소주제)
  let w_flag = false;
  let item_index = null;

  /*랜덤 대주제*/
  while(true){
    const random = Math.floor(Math.random() * course_wrap.length);   
    const random_course_item = course_wrap[random].querySelectorAll(".course_list .course_part");
    const item_length = random_course_item.length;

    //완료된 대주제가 있다면 다음 대주제 첫번째 선택
    if(random_course_item[item_length-1].classList.contains("course_complete")){
      const random_item = course_wrap[random].nextElementSibling.querySelector(".course_list .course_part");
      get_index(random_item);      
      break;
    }

    //소주 완료된 다음 첫번째 선택
    for(let i=0; i<item_length; i++){
      if(!random_course_item[i].classList.contains("course_complete")){
        const random_item = random_course_item[i];       
        get_index(random_item);  
        w_flag = true;
        break;
      }
    }
    if(w_flag) break;    
  }   

  /* 소주제 인덱스
    @param {ran_target} 선택된 소주제
  */
  function get_index(ran_target){    
    course_item.forEach((item, index ) => {
      if(item == ran_target) item_index = index;
    });  
  } 
  const target = course_item[item_index];//random target

  /*선택된 소수제 */
  target.classList.add("course_learning"); 

  /*course_learning 상태 화살표 아이콘 > 색변경 */
  const learing_obj = target.querySelector(".arrow_12_wrap object.add_new_color");
  learing_obj.addEventListener("load", function() {
    const learing_doc = this.getSVGDocument(); //object내 document 접근
    const learing_svg = learing_doc.querySelector("svg");   
    learing_svg.classList.add('active'); 
  }) 

  /*auto scroll*/
  let w_width = window.innerWidth;
  let first_start = true; 
  let container; //gsap target
  let target_dist = null; //gsap scroll option
  let time = null; //gsap time
  const learing_icon = document.querySelector(".course_part.course_learning .course_state_icon" );

  /*디바이스별 라인 display*/   
  function course_line(){
    const line_wrap = document.querySelectorAll(".course_part .line");
    w_width = window.innerWidth;
    line_wrap.forEach(item => {  
      if(item === null) return;
      const mo = item.querySelector(".mo_line");
      const port = item.querySelector(".po_line"); 
      const land = item.querySelector(".lan_line");     

      if(w_width < 600){
        mo.classList.add("line_on");
        port.classList.remove("line_on");
        land.classList.remove("line_on");
      }else if(window.matchMedia('(orientation: portrait)').matches){
        mo.classList.remove("line_on");
        port.classList.add("line_on");
        land.classList.remove("line_on");
      }else{        
        if(w_width < 720){ //갤럭시 폴드
          mo.classList.add("line_on");
          port.classList.remove("line_on");
          land.classList.remove("line_on");
        }else{
          mo.classList.remove("line_on");
          port.classList.remove("line_on");
          land.classList.add("line_on");
        }
      }
    })
  }course_line();
  
  /*auto scroll */
  function device_size(){
    let media = null;//resize 가로세로 한번만 
  
    if(w_width < 600){
      time =  item_index * 0.5;
      target_dist = {x:0, y: target.offsetTop - 80};    
      container = document.querySelector('.container');
    }else if (window.matchMedia('(orientation: portrait)').matches) {
      target_dist ={x:0, y: target.offsetTop - 200};
      time =  item_index * 0.5;       
      container = document.querySelector('.container');
    }else{
      if(w_width < 720){
        time =  item_index * 0.5;
        target_dist = {x:0, y: target.offsetTop - 80};    
        container = document.querySelector('.container');
      }else{
        time =  item_index * 0.55;
        container = document.querySelector('.container .wrap');
        target_dist = {x:target.offsetLeft - 200, y:0}; 
      }     
    }    

    /*only once scorll*/
    if(first_start){
      // object load delay로 1.8
      gsap.to(learing_icon, {scale:1, opacity:1, delay:time+1.5, });//icon size
      gsap.to(container, { scrollTo: target_dist , duration:time, ease:Power0.easeNone, delay:1.8});
      first_start = false;
      media=1;
    }else{      
      gsap.to(container, { scrollTo: target_dist, duration:0.01}); // 
      media=0;
    }    
    line_any(media);//라인 애니메이션 
  }
  device_size();

  window.addEventListener("resize", function(){
    course_line();
    device_size();
  });
  
  /*라인 애니메이션
  * @param {media} resize 가로세로 여부*/
  function line_any(media){
    setTimeout(() => {
      const course_item = document.querySelectorAll(".course_part");      
      let duration = null; //gsap option 
      let past = null; //gsap option
      const tl = gsap.timeline({}); //gsap timeline    

      if(w_width < 600){
        duration=0.55;
        past="-=0.06";
      }else if (window.matchMedia('(orientation: portrait)').matches) {
        duration=0.35;
        past= "+=0.08";
      }else{
        if(w_width < 720){ //갤럭시 폴드
          duration=0.6;
          past="-=0.06";
        }else{
          duration=0.6;
          past= "-=0.05";
        }       
      }     
      for(let i=0; i<item_index; i++){     
        var line_obj = course_item[i].querySelector(".line object.line_on").getSVGDocument();//object doc접근
        const line_svg = line_obj.querySelector(".move_line");   
        
        /*only once ani */      
        if(media){
          tl.to(line_svg, {strokeDashoffset:0, duration:duration}, past);
        }else{
         gsap.set(line_svg, {strokeDashoffset:0});        
        }        
      }
    }, 1500);    
  }
})();


/*course scroll*/
(function(){  
  const cl = document.querySelector(".cl"); //페이지
  if(!cl) return;

  const container = document.querySelector('.container'); //port 스크롤 영역
  const wrap = document.querySelector('.container .wrap'); //ladn 스크롤 영역
  const indica = document.querySelectorAll(".course_indicator li a"); //인디케이터 버튼
  const track = document.querySelector(".indicatior_bar"); //인디케이터 프로그래스 트랙
  const bar = track.querySelector("span");//인디케이터 프로그래스 바

  /*indcator click */
  indica.forEach(item =>{ 
    item.addEventListener('click', e =>{
      e.preventDefault();
      const w_width = window.innerWidth;
      const target_btn = e.target;
      const target_class =  `.${target_btn.getAttribute('href').substr(1)}`; //주소에서 클래스로 변환
      const target_con =  document.querySelector(target_class);
              
      if (window.matchMedia('(orientation: portrait)').matches) {
        const target_dist = target_con.offsetTop;
        gsap.to(container, { scrollTo: target_dist+2 , duration:.5});  //스크롤 애니메이션 +2 겹침 방지.
      }else{
        if(w_width < 720){ 
          const target_dist = target_con.offsetTop;
          gsap.to(container, { scrollTo: target_dist+2 , duration:.5});
        }else{
          const target_dist = target_con.offsetLeft;
          gsap.to(wrap, { scrollTo: {x:target_dist+2} , duration:.5});  
        }
       
      }     
      target_con.focus();
    })
  });      

   /*find prev indicate a 인디케이터에 지나온 버튼 찾기*/
  const previousSiblings = (elem) => {        
    let siblings = [];      
    while (elem = elem.previousElementSibling) {
      siblings.push(elem.childNodes[0]);
    }        
    return siblings;
    
  };
  /*clear on prev indicate  인디케이터 on 클래스 삭제*/
  function clear(target){
    target.forEach(item => {
      item.classList.remove('on');
    })
  }
  /*clear active */
  function clearActive(target){
    target.forEach(item => {
      item.classList.remove('active');
    })
  }

  /*인디케이터 프로그래스 bar size
  * @param {index} 도착 위치
  * @param {mdeia_state} 리사이즈 여부
  */
  function bar_size(index, mdeia_state){
    const w_width = window.innerWidth;
    const bar_h =  parseInt(track.offsetHeight) / parseInt(indica.length - 1);
    const bar_w =  parseInt(track.offsetWidth) / parseInt(indica.length - 1);
    if(mdeia_state){    
      bar.style.width = `4px`;     
      bar.style.height = `${bar_h * index}px`;  
    }else{       
      if(w_width < 720){ 
        bar.style.width = `4px`;     
        bar.style.height = `${bar_h * index}px`;  
      }else{
        bar.style.height = `4px`;  
        bar.style.width = `${bar_w * index}px`;  
      }
     
    }
  }
  /*add indecat active class 
  * @param {val} 각 주제 구역 클래스
  * @param {mdeia_state} 리사이즈 여부
  */
  function indicator_active(val, mdeia_state){
    indica.forEach((item, index )=>{          
      const target_class = `${item.getAttribute('href').substr(1)}`;
      val === target_class ? item.classList.add("active") : item.classList.remove("active");
   
      if(item.classList.contains("active")){    
        bar_size(index, mdeia_state);          
        clear(indica);          
        const prev_target= previousSiblings(item.parentNode);   
        prev_target.forEach(prev => prev.classList.add("on"));            
        return false;
      }         
    });
  }
  /*각 학습의 위치및 높이 */
  function port_scroll(e, item){
    let item_dist = null;  
    let item_size = null;
    let scrol_vel = null;  
    let mdeia_state = true;
    const w_width = window.innerWidth;

    if (window.matchMedia('(orientation: portrait)').matches) {
      item_dist = item.offsetTop;  
      item_size = item.offsetHeight;
      scrol_vel = e.target.scrollTop;  
      mdeia_state = true;
    }else{
      if(w_width < 720){ 
        item_dist = item.offsetTop;  
        item_size = item.offsetHeight;
        scrol_vel = e.target.scrollTop;  
        mdeia_state = true;
      }else{
        item_dist = item.offsetLeft;  
        item_size = item.offsetWidth;
        scrol_vel = e.target.scrollLeft; 
        mdeia_state = false; 
      }
    }


    /*주제별 구역 더하기, 빼기... 내에서 인디케이터 위치 1칸이 주제별 top기준 */
    if(item_dist < scrol_vel && (item_dist + item_size) > scrol_vel ){
      item.classList.add("active");     
      indicator_active(item.classList.item(1), mdeia_state);
    }else{
      item.classList.remove("active");
    }      
  }

  /*resize reset 리사이즈 되면 초기화 화면 맨위로*/
  function matchReset(){
    clear(indica);   
    clearActive(indica);
    indica[0].classList.add("active");  
  }

  /*scroll handle 
  * @param {item} 각 학습 
  * @param {re} 리사이즈 여부
  */
  function machscoll(item, re){
    const w_width = window.innerWidth;
    if (window.matchMedia('(orientation: portrait)').matches) {  
      if(re) matchReset(); //리사이즈 초기화
      gsap.set(container, { scrollTo:0});//위치 초기화
      bar_size(0, true); //인디케이터 바사이즈 초기화
      container.addEventListener("scroll", function(e){port_scroll(e, item)}); 
    }else{        
      if(w_width < 720){ 
        if(re) matchReset(); //리사이즈 초기화
        gsap.set(container, { scrollTo:0});//위치 초기화
        bar_size(0, true); //인디케이터 바사이즈 초기화
        container.addEventListener("scroll", function(e){port_scroll(e, item)}); 
      }else{
        if(re) matchReset(); 
        gsap.set(wrap, { scrollTo:{x:0}}); 
        bar_size(0, false);  
        wrap.addEventListener("scroll", function(e){port_scroll(e, item)});     
      }
    }
  }
  /*scroll*/ 
  const course_item = document.querySelectorAll(".course_wrap");
  course_item.forEach(item =>{      
    machscoll(item);
    window.addEventListener('resize', function(e){
      machscoll(item, e.isTrusted); 
      wrap.focus();
    })
  })
})();


