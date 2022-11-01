/**
 * chage button - 0630
 * email change - 0630
 * auth code - 0630
 * cancle btn - 0630
 * check box input - 0630
 * password eye,input - 0630
*/

// chage button
(function(){
  const acc = document.querySelector(".acc");
  if(!acc) return;

  const acc_change_btn = document.querySelectorAll(".acc_change_btn");
  const acc_form = document.querySelector(".acc_form");
  const bottom_zero_btn_wrap = document.querySelector(".bottom_zero_btn_wrap");
//변경 버튼 
  acc_change_btn.forEach(item =>{
    // let text_flag = true;
    item.addEventListener("click", e =>{
      e.preventDefault();
      const change_target = item.dataset.change;
      const input = item.previousElementSibling.querySelector("input");
      const text = e.currentTarget.querySelector("span");

      acc_form.classList.toggle("change_input");
      acc_form.classList.toggle(change_target);    
      input.value = "";
      input.readOnly = false;
      if(change_target == "change_email"){
        text.innerText = "Verify"; 
      }    
      bottom_zero_btn_wrap.classList.add("active");      
    })
  })
 
  //email change 이메일 변경
  const mail_input = document.querySelector(".input_wrap .email");
  if(!mail_input) return;
  const email_ms = document.querySelector('.email_message');

  // 메일 input수정
  mail_input.addEventListener("change", function(e){    
    const value = e.currentTarget.value; 
 
    if (value.length >= 0) {  
      if(email_ms) email_ms.classList.add("active");
    }else{
      if(email_ms) email_ms.classList.remove("active");
    }
  })


  //auth code 인증코드 입력시
  const auth_code = document.querySelector(".auth_code");
  if(!auth_code) return;
  const auth_code_ms =  document.querySelector(".auth_code_message");

  auth_code.addEventListener("change", function(e){
    const value = e.currentTarget.value; 
    const change_btn = this.parentNode.parentNode.parentNode.querySelector(".acc_change_btn"); 
    // check icon 
    const change_btn_text = change_btn.querySelector("span");  
    const icon = this.nextElementSibling.querySelector("object");
    const line_obj = icon.getSVGDocument();//object doc접근    
    if(!line_obj) return;
    const line_svg = line_obj.querySelector("svg");   

    if (value.length >= 0) {   
      line_svg.classList.add("active");  
      auth_code_ms.classList.add("active"); 
      change_btn.classList.add("active");
      change_btn_text.innerText = "Re-verify";
    }else{     
      line_svg.classList.remove("active");
      auth_code_ms.classList.remove("active"); 
    }
  })
  

  //cancle btn 취소버튼
  const mail_input_value = mail_input.value;
  const old_pass_input= document.querySelector(".input_wrap #old_pass");
  const old_pass_input_value = old_pass_input.value;
  const acc_input_cancel = document.querySelector(".bottom_btn_cancel");
  const pass_message = document.querySelectorAll(".pass_message")
  const acc_input_all = document.querySelectorAll(".acc_input_wrap input");
  const pass_input = document.querySelectorAll('.pass_icon');

  acc_input_cancel.addEventListener("click", function(){   
 
    //인증 아이콘 
    if(acc_form.classList.contains("change_email")){
      const icon = auth_code.nextElementSibling.querySelector("object");
      const line_obj = icon.getSVGDocument();//object doc접근   
      if(!line_obj) return;
      const line_svg = line_obj.querySelector("svg"); 
      line_svg.classList.remove("active");
    }    
  
    acc_form.className = "acc_form form_wrap"; // 모드    
    email_ms.classList.remove("active");// email 오류메시지   
    auth_code_ms.classList.remove("active"); //인증코드    

    //input 초기화
    acc_input_all.forEach(item =>{
      item.value = "";
      // item.readOnly = true;
    })
    //값 초기화 --test 삭제
     mail_input.value = mail_input_value;
     old_pass_input.value = old_pass_input_value;

    /*메일 버튼 */ 
    acc_change_btn.forEach(item=>{
      const change_target = item.dataset.change;
      const text = item.querySelector("span");        
      item.classList.remove("active");      
      if(change_target == "change_email"){
        text.innerText = "Change"; 
      }   
    });

    //icon
    pass_input.forEach(item=>{
      item.classList.remove("active");      
    })

    //password 오류메시지
    pass_message.forEach(item=>{
      item.classList.remove("active");
    });   

    bottom_zero_btn_wrap.classList.remove("active");//하단 버튼
  });
})();



  //check box input 체크박스 클릭시 아래 conform 버튼 활성화
(function(){  
  const tnp_agree_check = document.querySelector(".check_box_wrap #tnp_agree"); 
  if(!tnp_agree_check)return;
  const bottom_zero_btn_wrap = document.querySelector(".bottom_zero_btn_wrap");
  const bottom_btn_conform = bottom_zero_btn_wrap.querySelector(".bottom_btn_conform");
  const body = document.body;

  tnp_agree_check.addEventListener("change", function(e){
    if (e.currentTarget.checked) {
      if(body.classList.contains("mb_paused")){
        bottom_zero_btn_wrap.classList.add("active");
        return;
      }
      bottom_btn_conform.classList.add("active");
    }else{
      if(body.classList.contains("mb_paused")){
        bottom_zero_btn_wrap.classList.remove("active");
        return;
      }
      bottom_btn_conform.classList.remove("active");
    }
  });
})();


//password 패스워드
(function(){
  const pass_input = document.querySelectorAll('.input_pass');
  const bottom_zero_btn_wrap = document.querySelector(".bottom_zero_btn_wrap");
  const bottom_btn_conform = bottom_zero_btn_wrap.querySelector(".bottom_btn_conform");
  const body = document.body;

  if(!pass_input) return;

  pass_input.forEach(item=>{
    const pass_change_btn = item.nextElementSibling;

    pass_change_btn.addEventListener("click", function(e){ 
      const type = item.getAttribute('type');
   
      if (type.toLowerCase() === 'password') {
        item.setAttribute('type', 'text');
      }else{
        item.setAttribute('type', 'password');
      }
      e.currentTarget.classList.toggle('bi_eye');
    });

    //pass 경고문   
    item.addEventListener("change", function(e){
      const value = e.currentTarget.value; 
      const pass_ms = this.parentNode.nextElementSibling;
   
      if (value.length >= 0) {
        if(pass_ms) pass_ms.classList.add("active");
        pass_change_btn.classList.add("active");

        if(body.classList.contains("mb_paused")){
          bottom_btn_conform.classList.add("active");
          return;
        }
       
      }else{
        if(pass_ms) pass_ms.classList.remove("active");
        pass_change_btn.classList.remove("active");

        if(body.classList.contains("mb_paused")){
          bottom_btn_conform.classList.remove("active");
          return;
        }       
      }
    })
  })
  
})();