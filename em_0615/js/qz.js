// scroll on  헤더
(function(){
  const header = document.querySelector("header"); 
  const target = document.querySelector(".qz .main_contents .wrap");
  // if(!body.classList.contains("qz")) return;
  if(!header.classList.contains("fixed_header")) return;

  let timer;
  function header_toggle() {	    		
    if (!timer) {
      timer = setTimeout(() => {
        let top = target.scrollTop;
        timer = null;   

        if (top >= 1) {
          header.classList.add("on");
        } else {
          header.classList.remove("on");
        }       
      }, 100);
    }
  }
  header_toggle();			
  target.addEventListener('scroll', header_toggle);
})();

// 좌우 변경
(function(){
  const body = document.body;
  const change_hands_btn = document.querySelector(".change_hands");
  if(!change_hands_btn) return;
  const change_hands_text = change_hands_btn.querySelector(".change_hands_text");

  change_hands_btn.addEventListener("click", function(){
    body.classList.toggle("change_hands_on");
    this.classList.toggle("left_on");
    if(this.classList.contains("left_on")){
      change_hands_text.innerText = "Left-handed";
    }else{
      change_hands_text.innerText = "Right-handed";
    }
  })
})();



//example btn - 
(function(){
  const ex_btn = document.querySelector(".exam_btn");
  const ex_cont = document.querySelector(".exam_content");  
  // const ex_cont_inner = document.querySelector(".exam_content_inner");

  if(!ex_btn) return;

  // console.log(ex_btn.offsetLeft);
  
  ex_btn.addEventListener("click", function(){
    const exam_btn_h = window.pageYOffset + this.getBoundingClientRect().top;
    const win_h = window.innerHeight;
    console.log(win_h);
    const pos_y = exam_btn_h + this.offsetHeight;
    const pos_x = this.offsetLeft;   
    const con_height =  win_h - (pos_y + 60);  
    const obj = this.querySelector("object")
    const doc = obj.getSVGDocument(); //object내 document 접근
    const svg = doc.querySelector("svg");   
    this.classList.toggle("active");
    ex_cont.classList.toggle("active");
    ex_cont.style.left = `${pos_x}px`;
    ex_cont.style.top = `${pos_y}px`;
    ex_cont.style.maxHeight = `${con_height}px`;
    svg.classList.toggle('active'); 
  });
})();

//show notepade area - 노트페드 보기
(function(){ 
  const notepad_btn = document.querySelector(".notepad_btn");
  // const quiz_content = document.querySelector(".quiz_content");
  const quiz_area = document.querySelector(".quiz_area");
  const main_contents = document.querySelector(".qz .main_contents");
  const tool_wrap = document.querySelector(".input_tool .tool_wrap");
  const notepad_overlay = document.querySelector(".notepad_overlay");
  const tip_line = document.querySelector(".notepad_tip_line");
  const tip_desc = document.querySelector(".notepad_tip_desc");
  const notepad_tool = document.querySelector(".notepade_tool");
  const body = document.body;
  let btn_flag = true;//중복클릭 방지

  if(!notepad_btn) return;
  
  notepad_btn.addEventListener("click", function(){
    if(!btn_flag) return;
    btn_flag = false;
    const text = this.querySelector(".notepad_btn_text"); 
    const quiz_area_h = window.pageYOffset + quiz_area.getBoundingClientRect().top;
    let notepad_top =  quiz_area_h ;
    const win_w =  window.innerWidth;
       
    this.classList.toggle("on");
    main_contents.classList.toggle("notepad_on");
    tool_wrap.classList.toggle("notepad_on");
    notepad_overlay.classList.toggle("on");

    /*notepad 팁 */
    if(this.classList.contains("on")){
      text.innerText = "Notepad off";
      if(win_w <= 720){
        gsap.to(window, { scrollTo: notepad_top  , duration:.5}); //스크롤 
      }
      body.classList.add("none_scroll"); //뒤 스크롤 방지
      //2초 테두리, 메시지
      setTimeout(function() { 
        tip_line.style.display = "none";
        tip_desc.style.display = "none";  
        btn_flag = true;
      }, 2000); 
    }else{
      text.innerText = "Notepad on";  
      body.classList.remove("none_scroll");
      tip_line.style.display = "";
      tip_desc.style.display = ""; 
      notepad_tool.classList.remove("active");  
      btn_flag = true;
    } 
  })
})();

//notepad touch 그리기 도구 오픈 - 터치를 클릭으로 대체
(function(){
  const quiz_area = document.querySelector(".quiz_area");
  const notepad_tool = document.querySelector(".notepade_tool");  
  const main_contents = document.querySelector(".qz .main_contents");

  if(!quiz_area) return;

  quiz_area.addEventListener("click", function(){
    if(!main_contents.classList.contains("notepad_on"))return;
    notepad_tool.classList.add("active");
  })
})();

//첫 로드에서 2초 말풍선
(function(){
  const bubble_desc = document.querySelector(".bubble_desc");  
if(!bubble_desc) return;
  setTimeout(function() {
    bubble_desc.classList.add("hidden");
  }, 2000);   
})();

/*그리기 도구 펜, 지우개 */
(function(){
  const ins_btn = document.querySelectorAll(".instrument button");  

  function clear(){
    ins_btn.forEach(item => {
      item.classList.remove('active');
      const obj = item.querySelector("object")
      const doc = obj.getSVGDocument(); //object내 document 접근
      const svg = doc.querySelector("svg");   
      svg.classList.remove('active'); 
    })
  }  
// object color, bg
  ins_btn.forEach(item =>{
    item.addEventListener("click", function(e){
      clear();
      e.currentTarget.classList.add("active");
      const obj = item.querySelector("object")
      const doc = obj.getSVGDocument(); //object내 document 접근
      const svg = doc.querySelector("svg");   
      svg.classList.add('active'); 
    })
  }) 
})();

// keyboard select -   /*키보드 / 그리기 패드 */
(function(){
  const selct_tool = document.querySelector(".tool_select_btn");
  if(!selct_tool) return;
  const selct_tool_i = selct_tool.querySelectorAll("i");//change icon
  const input_area = document.querySelectorAll(".input_tool_wrap");  
  const select_type = document.querySelectorAll(".key_type");
  const string_btn = document.querySelector(".keyborad_string");    
  const test_type = document.querySelector(".keyboard_type_test"); //test 키보드타입 기본/복합 확인 후 삭제바람

  // 키보드, 패드 선택
  function selec_area(area){
    const target = document.querySelector(`.${area}`);   

    input_area.forEach(item =>{
      item.classList.remove("active");
    });    
    target.classList.add("active");    
  }
  /*하단 그리기, 키포보드 버튼 */
  selct_tool.addEventListener("click", function(){
    if(this.classList.contains("mode_key")){
      this.classList.remove("mode_key");
      this.classList.add("mode_pen");
      this.nextElementSibling.classList.add("active");
      selec_area("keyboard");  
      test_type.classList.add("active"); //test 키보드 타입 삭제바람
    }else{
      this.classList.remove("mode_pen");
      this.classList.add("mode_key");
      this.nextElementSibling.classList.remove("active");
      selec_area("drawpad");
      test_type.classList.remove("active"); //test 키보드 타입 삭제바람
    }

    selct_tool_i.forEach(item=>{
      item.classList.remove("active");
     
    })
  })

  // 글자 키보드 타입
  function select_key_type(type_class){
    select_type.forEach(type =>{
      if(type.classList.contains(type_class)){
        type.classList.add("active");
      }else{
        type.classList.remove("active");
      }  
    }) 
  }
  // 글자 키보드 클릭
  string_btn.addEventListener("click", function(){
    const type_class = `key_type_${this.dataset.keyType}`;
    select_key_type(type_class);      
  });

  // test 키보드타입 기본/복합 확인 후 삭제바람
  const select_key = document.querySelectorAll(".keyboard_type_test ul li button");
  select_key.forEach(item =>{
    item.addEventListener("click", function(){
      const type_class = `key_type_${this.dataset.keyType}`;
      select_key_type(type_class);       
    })
  });  
})();


//key 클릭
(function(){
  const keys = document.querySelectorAll(".key_type .key"); 
  if(!keys) return; 
  const input_add = document.querySelector(".input_add_wrap"); 
  if(!input_add) return; 
  const input_add_close = input_add.querySelector(".input_add_close");
  const more_key_wrap = document.querySelectorAll(".more_key");
  const more_key = document.querySelectorAll(".more_key_wrap .key");
  const brading_btn  = document.querySelector(".brading_btn");
  const key_input_add = document.querySelectorAll(".key_input_add");

  function clear_active(target){
    target.forEach(item=>{
      item.classList.remove("active");
    })
  }
  //키 더보기 
  keys.forEach(item=>{
    item.addEventListener("click", function(){
      brading_btn.classList.add("active");

      if(item.classList.contains("more_key")){
        if(item.classList.contains("active")){
          item.classList.toggle("active");  
        }else{
          clear_active(more_key_wrap);
          item.classList.add("active"); 
        } 
      }      
    })
  });

  /*키 더보기 안에 키 클릭시 닫기 */
  more_key.forEach(item=>{
    item.addEventListener("click", function(){
      clear_active(more_key_wrap);
    });
  })


  function clear(target){
    target.forEach(item => {
      item.classList.remove('key_on');

      const obj = item.querySelector("object");
      if(!obj.getSVGDocument()) return;         
      const doc = obj.getSVGDocument(); //object내 document 접근
      const svg = doc.querySelector("svg"); 
      svg.classList.remove('active');    
    })
  }  

  // 분수, 제곱 루트 버튼,
  key_input_add.forEach(item =>{   
    item.addEventListener("click", function(){
      clear(key_input_add);
      input_add.classList.add("active");
      item.classList.add("key_on");       
      const obj = item.querySelector("object")
      const doc = obj.getSVGDocument(); //object내 document 접근
      const svg = doc.querySelector("svg");
      svg.classList.add("active");
    })
  })
  //분수 제곱 루트 닫기 버튼
  input_add_close.addEventListener("click", function(){
    input_add.classList.remove("active");
    clear(key_input_add);
  })
})();


// 시작 메시지 팝업
(function(){
  const mpop_btn = document.querySelectorAll(".mpop_wrap button");
  const message_item_wrap = document.querySelector(".message_popup");
  const message_item = document.querySelectorAll(".message_item");
  const body = document.body;

  if(!message_item_wrap)return;
  
  function popup_con(target){
    message_item.forEach(item=>{
      if(item.classList.contains(target)){
        item.classList.add("active");         
        message_item_wrap.classList.add("active");  
      }else{
        item.classList.remove("active");      
      }
    })
  }

  /*test 메시지 팝업 리스트 */
  mpop_btn.forEach(item=>{
    item.addEventListener("click", function(){
      const target = item.dataset.mpop;
      body.classList.add("none_scroll");   //스크롤 정지
      popup_con(target)
    })
  })
})();


// 종료 팝업
(function(){
  const lepop_btn = document.querySelectorAll(".lepop_wrap button");
  const popup_box = document.querySelectorAll(".popup_box");

  if(!popup_box)return;

  function popup_con(target){
    popup_box.forEach(item=>{
      if(item.classList.contains(target)){
        item.classList.add("active"); 
      }else{
        item.classList.remove("active");      
      }
    })
  }  
  //팝업리스트
  lepop_btn.forEach(item=>{
    item.addEventListener("click", function(){
      const target = item.dataset.lepop;   
      popup_con(target)
    })
  })
})();


/*test 객관식 문제 보기 */
(function(){
  const mcp_btn = document.querySelector(".mcp");
  // const quiz_content = document.querySelector(".quiz_content");
  const main_contents = document.querySelector(".qz .main_contents");
  const input_tool = document.querySelector(".input_tool");
  const input_tool_wrap = document.querySelectorAll(".input_tool_wrap ");
  
  if(!mcp_btn) return;

  mcp_btn.addEventListener("click", function(){
    main_contents.classList.toggle("multi_choice");
    input_tool.classList.toggle("multi_choice");

    input_tool_wrap.forEach(item=>{       
      if(item.classList.contains("multi_choice_board")){
        if(item.classList.contains("active")){
          item.classList.remove("active");
        }else{
          item.classList.add("active"); 
        }                 
      }else{
        item.classList.remove("active");
      }   
    })
  })

  
})();

(function(){
  /*객관식 여러라인 문제 보기 */
  const mline = document.querySelector(".mline");
  if(!mline) return;
  const answer_list =  document.querySelectorAll(".multi_answer_list");
  mline.addEventListener("click", function(){
    answer_list.forEach(item=>{
      item.classList.toggle("active");      
    });
  })

})();

// incorrect_check active icon
(function(){
  const inc_check_btn =  document.querySelectorAll(".incorrect_check button");
  const multi_choice_board = document.querySelector(".multi_choice_board");

  if(!inc_check_btn) return;
  inc_check_btn.forEach(item =>{
    item.addEventListener("click", function(){   
      this.classList.toggle("inc_check_on"); 
      const obj = this.querySelector("object")
      const doc = obj.getSVGDocument(); //object내 document 접근
      const svg = doc.querySelector("svg");   
      svg.classList.toggle('inc_check_on'); 

      if(item.classList.contains("answer")){
        multi_choice_board.classList.toggle("answer_check");
      }
    });
  });
})();

// 태그 아래로
(function(){
  const incorrect_tag_list = document.querySelector(".incorrect_tag_list");
  if(!incorrect_tag_list)return;
  const tag_list_down_btn = document.querySelector(".tag_list_down_btn");

  tag_list_down_btn.addEventListener("click", function(){
    incorrect_tag_list.classList.toggle("active");
    this.classList.toggle("acitve")
  });

})();

