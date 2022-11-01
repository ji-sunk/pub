/**
 * scroll in main contents - 0617
 * change hands 
 * example btn - 0617
 * show notepade area - 0808
 * notepad touch
 * yellow_bullbe 
 * pad tool
 * keyboard select 
 * key click
 * popup 
 * show multi - 0617
 * incorrect_check - 0617
 * incorrect_tag_list - 0617
 */


//scroll in main contents  문제영역 스크롤시 그림자 add
(function(){
  const con_scroll = document.querySelector(".con_scroll"); 
  const target = document.querySelector(".qz .main_contents .wrap");
  if(!con_scroll) return;
  let timer;
  function scroll_on() {	   		
    if (!timer) {
      timer = setTimeout(() => {
        let top = this.scrollTop;
        timer = null;   

        if (top >= 1) {
          con_scroll.classList.add("on");
        } else {
          con_scroll.classList.remove("on");
        }       
      }, 100);
    }
  }
  scroll_on();			
  target.addEventListener('scroll', scroll_on);
})();

//change hands 좌우 변경
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

//example btn - steps btn
(function(){
  const ex_btn = document.querySelector(".exam_btn");
  const ex_cont = document.querySelector(".exam_content");  
  const main_contents_wrap = document.querySelector(".main_contents>.wrap");
  
  if(!ex_btn) return;
  
  ex_btn.addEventListener("click", function(){
    const exam_btn_h = window.pageYOffset + this.getBoundingClientRect().top;
    const win_h = window.innerHeight;
    const win_w = window.innerWidth;
    const pos_y = exam_btn_h + this.offsetHeight;
    const pos_x = this.getBoundingClientRect().left;
    const con_height =  win_h - (pos_y + 60);  
    const obj = this.querySelector("object");
    const doc = obj.getSVGDocument(); //object내 document 접근
    const svg = doc.querySelector("svg");   
    this.classList.toggle("active");
    ex_cont.classList.toggle("active");  
    main_contents_wrap.classList.toggle("ex_none_scroll");//문제 영역에 스크롤 방지      

    if(win_w >= 712){ ex_cont.style.left = `${pos_x}px`;}  
    ex_cont.style.top = `${pos_y}px`;
    ex_cont.style.maxHeight = `${con_height}px`;
    svg.classList.toggle('active'); 
  });
})();

//show notepade area - 노트패드 보기
// 2022.08.08 노트패드 영역 확장
(function(){ 
  const notepad_btn = document.querySelector(".notepad_btn");//노트패드 버튼
  if(!notepad_btn) return;
  const container = document.querySelector(".qz .container"); //메인 컨테이너
  const notepad = document.querySelector(".notepad_area");// 노트패드 영역
  const notepad_tool = document.querySelector(".notepade_tool"); //노트패드 상단 툴박스
  const tip_line = document.querySelector(".notepad_tip_line"); // 툴 팁 점선
  const tip_desc = document.querySelector(".notepad_tip_desc"); // 툴 팁 말풍선
  const tool_wrap = document.querySelector(".input_tool .tool_wrap");//하단 입력 박스(키패드, 그리기패드)   
  const notepad_overlay = document.querySelector(".notepad_overlay"); // 딤 배경
  const quiz_content  = document.querySelector(".quiz_content"); // 퀴즈 영역
  const header_h = document.querySelector('.con_scroll').getBoundingClientRect().height; // 2022.10.20
  let notePadTop; // 2022.10.20
  let notePadPos; // 2022.10.20
/**
 *@param {btn_margin} 노프패드 영역, 하단 버튼 사이간격
 */
  function notepad_height(btn_margin){   
    const tool = document.querySelector(".qz .input_tool .note_wrap");//하단버튼 wrap
    const tool_btn = document.querySelector(".qz .notepad_btn_wrap");//하단 버튼 
    const win_h = window.innerHeight; 
    const tool_h = win_h - (tool.getBoundingClientRect().top - tool_btn.offsetHeight - btn_margin);
    const container_t = container.getBoundingClientRect().top; //패드 top
    const container_height = win_h - (container_t + tool_h); // 디바이스 높이 - (패드 top값 + 하단 버튼 영역) 

    // s: 2022.10.20
    const exBtn = document.querySelector('.exam_wrap'); 
    let exBtn_h;
    if( exBtn ) {
      exBtn_h = exBtn.getBoundingClientRect().height; 
    }
    // e: 2022.10.20

    if(container.classList.contains("under_notepad")){
      container.style.height = ""; 
      quiz_content.style.height = "";
      //2022.08.30 조건 수정 
    }else if(container.classList.contains("notepad_on")){
      //노트패드 클릭 후 상태
      container.style.height = `${container_height}px`; 

      // s: 2022.10.20
      if( exBtn ) {
        quiz_content.style.height = `${container_height - quiz_content.offsetTop - exBtn_h}px`; 
      } else {
        quiz_content.style.height = `${container_height - quiz_content.offsetTop}px`; 
      }
      // e: 2022.10.20

      notepad.style.top = '';  // 2022.10.20
      notePadTop = notepad.getBoundingClientRect().top; // 2022.10.20
    }     
  } 

  notepad_btn.addEventListener("click", function(){
    const btn_text = this.querySelector(".notepad_btn_text"); //버튼 text

    this.classList.toggle("on");
    container.classList.toggle("notepad_on");
    tool_wrap.classList.toggle("notepad_on");
    notepad_overlay.classList.toggle("on");     
    container.classList.remove("under_notepad"); //노트패드 클릭 후 상태
    
    if(window.matchMedia("(orientation: portrait)").matches){
      notepad_height(10);//노트패드 영역, 하단 버튼 사이간격
    }else{
      notepad_height(42);//하단버튼 + 노트패드 상단마진 사이 간격 
    }
    
    if(this.classList.contains("on")){
      btn_text.innerText = "Notepad off";
      //그리기 툴팁
      setTimeout(function() { 
        tip_line.style.display = "none";
        tip_desc.style.display = "none";  
        btn_flag = true;
      }, 2000);
    }else{
      notePadPos = notePadTop - header_h; // 2022.10.20
      
      btn_text.innerText = "Notepad on";
      tip_line.style.display = "";
      tip_desc.style.display = ""; 
      container.style.height = ""; 
      quiz_content.style.height = "";
      notepad.style.top = `${notePadPos}px`; // 2022.10.20
      notepad_tool.classList.remove("active");

      if(notepad.classList.contains("active")){
        notepad.classList.remove("active");
        //2022.08.07 quiz_area에 unactive 클래스 추가 노트패드가 배경으로
        container.classList.add("under_notepad"); //노트패드 클릭 후 상태
      }
    }

    window.addEventListener('resize', function(e){
      let margin_t = 10;
     
      if(!window.matchMedia("(orientation: portrait)").matches){
        margin_t = 42;
      };
      notepad_height(margin_t);
    });
  });
})();


//notepad touch 그리기 도구 오픈 - 터치를 클릭으로 대체
(function(){
  // const quiz_area = document.querySelector(".quiz_area");
  const container = document.querySelector(".qz .container");
  if(!container) return;
  const notepad_tool = document.querySelector(".notepade_tool");   
  const notepad = document.querySelector(".notepad_area");
  if(!notepad) return;
  notepad.addEventListener("click", function(){
    if(!container.classList.contains("notepad_on"))return;
    notepad_tool.classList.add("active");  
    notepad.classList.add("active");// 2022.08.02 노트패드 액티브
  })
})();

//yellow_bullbe 첫 로드에서 2초 말풍선
(function(){
  const body = document.body;
  if(body.classList.contains("login")) return;
  
  const bubble_desc = document.querySelector(".bubble_desc");  
  if(!bubble_desc) return;
  if(bubble_desc.classList.contains("focuse_bubble")) return;
  setTimeout(function() {
    bubble_desc.classList.add("hidden");
  }, 2000);   
})();

/*pad tool 그리기 도구 펜, 지우개 */
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
  /*하단 그리기, 키보드 버튼 */
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


//key click
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
      
      // 2022.08.01
      const obj = item.querySelector("i object");
      const doc = obj.getSVGDocument(); //object내 document 접근
      if(!doc) return;
      const svg = doc.querySelector("svg");
      svg.classList.remove("active");
    })
  }
  //키 더보기 
  // 2022.08.01 키 이미지 변경 - active시 색상 번경
  keys.forEach(item=>{
    item.addEventListener("click", function(){
      brading_btn.classList.add("active");
      const obj = this.querySelector("i object");  
      if(!obj) return;
      const doc = obj.getSVGDocument(); //object내 document 접근
      const svg = doc.querySelector("svg");
     
      if(item.classList.contains("more_key")){   
        if(item.classList.contains("active")){
          item.classList.toggle("active");  
          svg.classList.toggle("active");   
        }else{
          clear_active(more_key_wrap);       
          item.classList.add("active"); 
          svg.classList.add("active")
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


//popup 시작 메시지 팝업
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


// popup 종료 팝업
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


/*test show multi 객관식 문제 보기 */
(function(){
  const mcp_btn = document.querySelector(".mcp");
  const container = document.querySelector(".container");
  const input_tool_wrap = document.querySelectorAll(".input_tool_wrap");
  if(!mcp_btn) return;

  mcp_btn.addEventListener("click", function(){
    container.classList.toggle("multi_choice");
    
    input_tool_wrap.forEach(item=>{       
      if(item.classList.contains("multi_choice_board")){        
        item.classList.toggle("active");  
      }else{        
        item.classList.remove("active");
      }   
    })
  });
  
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

// incorrect_check active icon answer버튼
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

//incorrect_tag_list 태그 아래로
(function(){
  const incorrect_tag_list = document.querySelector(".incorrect_tag_list");
  if(!incorrect_tag_list)return;
  const tag_list_down_btn = document.querySelector(".tag_list_down_btn");
  const input_tool = document.querySelector(".input_tool");
  const steps_btn  = document.querySelector(".steps"); 

  tag_list_down_btn.addEventListener("click", function(){
    if(steps_btn.classList.contains("active")) return; //example, steps버튼 활상화시 이벤트 중지

    incorrect_tag_list.classList.toggle("active");
    this.classList.toggle("active")
    input_tool.classList.toggle("tag_list_column");
  });
})();

