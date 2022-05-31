/*test */
/*모드 생상 변경 ex */
(function () {     
  const mode_list = document.querySelectorAll(".mode li");
  const body = document.body;
  // const root = document.querySelector(':root');
  mode_list.forEach(item =>{
    item.addEventListener('click', (e)=>{
      // if(document.querySelector('.sub_page'))  e.preventDefault();
      // if(e.currentTarget.classList.contains('theme')) e.preventDefault();
      
      e.preventDefault();
   
      const text = e.target.innerText;
      const setVariables = vars => Object.entries(vars).forEach(v => body.style.setProperty(v[0], v[1]));
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
    
      text === "senior" ? body.classList.remove("junior"):'';
      text === "junior" ? body.classList.remove("senior"):'';       
      if(text === "theme_01"){
        body.classList.contains('theme_01') ? body.removeAttribute('style'):setVariables(myVariables);        
      }  
    
      body.classList.toggle(text);
    })
  })    

  /*모바일 전체화면 */
  const sf_btn = document.querySelector(".sf_btn");

  sf_btn.addEventListener('click', e =>{
    if (screenfull) {
      screenfull.toggle();       
      e.currentTarget.classList.toggle("on");        
    }
  })
})();
/*test */

/*main slider*/ 
(function(){
  function slider_option(pagnation, target){ 
    let target_dot_wrap;
    if(target !== ""){
      target_dot_wrap = target.nextElementSibling;  
    } 
    const page = pagnation ? {el: target_dot_wrap, clickable: true, type: 'bullets',} : false;
    return {
      effect: 'slider',   
      loop: true,    
      speed: 600,  
      slidesPerView: 'auto',
      pagination: page,
    }
  }
  const ai_slider = document.querySelectorAll(".ai_slider");
  const main_ai_slider = [];
  ai_slider.forEach((item, index) =>{  
    main_ai_slider[index] = new Swiper(item, slider_option(true, item));
  })
  // const main_ai_slider = new Swiper('.ai_slider', slider_option(true));
  const game = document.querySelectorAll(".game_slider .game_item");
  let main_game_slider;
  game.length > 3 ? main_game_slider = new Swiper('.game_slider', slider_option(false, "")) : null;//3개이상만 슬라이드 적용 
})();

/*topic grade country selecte */
(function(){
  var country_year_btn = document.querySelector(".country_year_btn");
  if(!country_year_btn) return;
  country_year_btn.addEventListener('click', function(e){
    e.preventDefault();
    const btn_wrap = this.parentNode;
    var country_year_list = this.nextElementSibling;

    if (this.classList.contains("on")) {
      gsap.to(country_year_list, { display: 'none', height: 0, duration: .3 });		
      this.classList.toggle('on');
      btn_wrap.classList.toggle('on_wrap');    
    } else {	
      this.classList.toggle('on');
      btn_wrap.classList.toggle('on_wrap');
      gsap.set(country_year_list, { display: 'block' });
      gsap.to(country_year_list, { height: 'auto', duration: .3 });
    }
  })
})();

/*topic grade learn selecte */
(function(){
  var grade_list_btn = document.querySelectorAll(".grade_list_btn");
  if(!grade_list_btn) return;

  grade_list_btn.forEach((item,index,arr) =>{
    item.addEventListener('click', function(e){
      e.preventDefault();
      const btn_wrap = this.parentNode;
      var country_year_list = this.nextElementSibling;  
    
      if (this.classList.contains("on")) {
        gsap.to(country_year_list, { display: 'none', height: 0, duration: .3 });		
        this.classList.toggle('on');
        btn_wrap.classList.toggle('on_wrap');    
      } else {	    
        //clear();
        this.classList.toggle('on');
        btn_wrap.classList.toggle('on_wrap');
        gsap.set(country_year_list, { display: 'block' });
        gsap.to(country_year_list, { height: 'auto', duration: .3 });
      }
    })

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

/*scroll sticky */
(function(){
  const target = document.querySelector('.sub_scrolltop_obj');
  if (!target) return;   
  const target_wrap = target.parentNode;
  const container = document.querySelector('.container');

  container.addEventListener('scroll', function(e){
    if (!window.matchMedia('(orientation: portrait)').matches) return;
    let currentScrollValue = this.scrollTop;   
    console.log("target : " +  target_wrap.offsetTop);
    console.log(currentScrollValue);

    if (currentScrollValue > target_wrap.offsetTop) {
      target.classList.add("sticky");
      target.style.top = `${container.offsetTop}px`;  
    } else {
      target.classList.remove("sticky");
      target.style.top = 0;
    }
  })  
})();

/*topic tab */
(function () {     
  const tab_nav = document.querySelector(".tab_nav");
   if (!tab_nav) return; 
     
  const tab_target_btn = tab_nav.querySelectorAll("li a");
  const tab_target_con = document.querySelectorAll(".tab_content_wrap .tab_content");
  const country_year = document.querySelector('.country_year');
  const container = document.querySelector('.container');
  const topic_section = document.querySelector('.tl');
  const main = document.querySelector('main');
  
  function clear(target){
    target.forEach(item => {
      item.classList.remove('active');
    })
  }

  tab_target_btn.forEach(item =>{
    item.addEventListener('click', e =>{
      e.preventDefault();
      const target_btn = e.target;
      const target_class =  `.${target_btn.getAttribute('href').substr(1)}`;
      const target_con =  document.querySelector(target_class);
     
      // container.scrollTo({top: 0, behavior: "smooth"});
      gsap.to(container, { scrollTo: 0 , duration:.5});  

      clear(tab_target_btn);
      target_btn.classList.add("active");

      clear(tab_target_con);
      target_con.classList.add("active");  

      function topic_main(bool){
        if(bool){
          main.classList.add('grade_main');
          main.classList.remove('topic_main');
        }else{
          main.classList.add('topic_main');
          main.classList.remove('grade_main');
        } 
      }      

      if(target_con.classList.contains('grade_list_con')){
        country_year.classList.add('active');
        if(topic_section) topic_main(true);
      }else{
        country_year.classList.remove('active');
        if(topic_section) topic_main(false);
      }      
    });
  })
})();

/*scorll_popup */
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


/*course scroll*/
(function(){  
  const cl = document.querySelector(".cl");
  if(!cl) return;
  const indica = document.querySelectorAll(".course_indicator li a");
  const container = document.querySelector('.container');
  const wrap = document.querySelector('.container .wrap');
  /*indcator click */
  indica.forEach(item =>{ 
    item.addEventListener('click', e =>{
      e.preventDefault();
      const target_btn = e.target;
      const target_class =  `.${target_btn.getAttribute('href').substr(1)}`;
      const target_con =  document.querySelector(target_class);
              
      if (window.matchMedia('(orientation: portrait)').matches) {
        const target_dist = target_con.offsetTop;
        gsap.to(container, { scrollTo: target_dist+2 , duration:.5});  
      }else{
        const target_dist = target_con.offsetLeft;
        gsap.to(wrap, { scrollTo: {x:target_dist+2} , duration:.5});  
      }     
      target_con.focus();
    })
  })     
  
  const course_wrap = document.querySelectorAll(".course_wrap");
  const track = document.querySelector(".indicatior_bar");
  const bar = track.querySelector("span");

   /*find prev indicate a*/
  const previousSiblings = (elem) => {        
    let siblings = [];      
    while (elem = elem.previousElementSibling) {
      siblings.push(elem.childNodes[0]);
    }        
    return siblings;
  };
  /*clear on prev indicate */
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

  /*bar size*/
  function bar_size(index, mdeia_state){
    const bar_h =  parseInt(track.offsetHeight) / parseInt(indica.length - 1);
    const bar_w =  parseInt(track.offsetWidth) / parseInt(indica.length - 1);
    if(mdeia_state){    
      bar.style.width = `4px`;     
      bar.style.height = `${bar_h * index}px`;  
    }else{       
      bar.style.height = `4px`;  
      bar.style.width = `${bar_w * index}px`;  
    }
  }
  /*add indecat active class  */  
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
  /*add class active section */
  function port_scroll(e, item){
    let item_dist = null;  
    let item_size = null;
    let scrol_vel = null;  
    let mdeia_state = true;

    if (window.matchMedia('(orientation: portrait)').matches) {
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

    if(item_dist < scrol_vel && (item_dist + item_size) > scrol_vel ){
      item.classList.add("active");     
      indicator_active(item.classList.item(1), mdeia_state)
    }else{
      item.classList.remove("active");
    }      
  }

  /*resize reset*/
  function matchReset(){
    clear(indica);   
    clearActive(indica);
    indica[0].classList.add("active");      
  }

  /*scroll handle */
  function machscoll(item, re){
    if (window.matchMedia('(orientation: portrait)').matches) {  
      if(re) matchReset(); gsap.set(container, { scrollTo:0}); bar_size(0, true);
      container.addEventListener("scroll", function(e){port_scroll(e, item)}); 
    }else{   
      if(re) matchReset(); gsap.set(wrap, { scrollTo:{x:0}}); bar_size(0, false);  
      wrap.addEventListener("scroll", function(e){port_scroll(e, item)});  
    }
  }
  /*scroll*/ 
  course_wrap.forEach(item =>{      
    machscoll(item);
    window.addEventListener('resize', function(){machscoll(item, true);})
  })



})();





