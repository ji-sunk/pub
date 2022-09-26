/**
 * email warning - 0630
 * password warning - 0630
 * password view, hide icon - 0630
 * login_btn submit warning - 0630
 * bubble focus - 0630
 * agree - 0630
 */

// input 경고 text
(function(){
 const login = document.querySelector(".login");
 if(!login) return;

 const email_input = document.querySelector('input[name=uname]');
 const email_ms = document.querySelector('.email_message');
 const login_btn = document.querySelector('.login_btn');
 const login_ms = document.querySelector('.btn_message');
 const pass_change_btn = document.querySelector('.pass_icon');
 const pass_input = document.querySelector('.input_pass');
 const pass_ms = document.querySelector('.pass_message');

 const bottom_zero_btn = document.querySelector('.bottom_zero_btn');

 //email warning 
 if(!email_input) return;
 email_input.addEventListener("change", function(e){
  const value = e.currentTarget.value;
  if (value.length >= 0) {
    if(login_btn) login_btn.classList.add("active");
    if(bottom_zero_btn) bottom_zero_btn.classList.add("active");    
    email_ms.classList.add("active");
  }else{
    if(login_btn) login_btn.classList.remove("active");
    if(bottom_zero_btn) bottom_zero_btn.classList.remove("active");   
    email_ms.classList.remove("active");
  }
 });

// password input massage
 if(!pass_input) return;
 pass_input.addEventListener("change", function(e){  
  const value = e.currentTarget.value;
  
  if (value.length >= 0) {   
    if(pass_ms) pass_ms.classList.add("active");
    pass_change_btn.classList.add("active");
  }else{     
    if(pass_ms) pass_ms.classList.remove("active");
    pass_change_btn.classList.remove("active");
  }
 });

//  password view, hide icon
 if(!pass_change_btn) return;
 pass_change_btn.addEventListener("click", function(e){

  const type = pass_input.getAttribute('type');
  if (type.toLowerCase() === 'password') {
    pass_input.setAttribute('type', 'text');
  }else{
    pass_input.setAttribute('type', 'password');
  }
  e.currentTarget.classList.toggle('bi_eye');
 })

 if(!login_btn) return;
 login_btn.addEventListener("click", function(e){
    e.preventDefault();
    login_ms.classList.add("active");
 });
})();


// bubble focus - 이메일,닉네임 입력시 알림
(function(){
  const create_acc_input = document.querySelectorAll(".email_wrap input, .learner_name_wrap input");  

  create_acc_input.forEach(item =>{
    item.addEventListener("focus", function(e){
      const focus_bubble = item.parentElement.previousElementSibling;
      if(!focus_bubble) return;
      focus_bubble.classList.add("active");
      setTimeout(function() {
        focus_bubble.classList.remove("active");
      }, 2000); 
    })
  }) 
})();


//agree 동의 하기
(function(){
  const login = document.querySelector(".login");
  if(!login) return;
  const select_all = document.querySelector(".check_box_wrap #all_agree")
  const checkbox = document.querySelectorAll(".check_box_wrap input[type='checkbox']"); 

  if(!select_all) return;

  // check all
  select_all.addEventListener("change", function(e){
    if (e.currentTarget.checked) {
      checkbox.forEach(item => {
        item.checked = true;
      })
    } else {
      checkbox.forEach(item => {
        item.checked = false;
      })
    }
  })

  //check box input
  const bottom_zero_btn = document.querySelector(".bottom_zero_btn");
  if(!bottom_zero_btn) return;

  checkbox.forEach(item=>{
    item.addEventListener("change", function(e){
      if (e.currentTarget.checked) {
        bottom_zero_btn.classList.add("active");
      }else{
        bottom_zero_btn.classList.remove("active");
      }
    });
  })
})();

// input focus - scorll
(function(){
  const acc_input_all = document.querySelectorAll(".input_wrap input");
  acc_input_all.forEach(item =>{
    item.addEventListener("focus", e =>{
      const item_top = window.pageYOffset + item.getBoundingClientRect().top;
     
      window.scrollTo({top: item_top - 80, behavior: "smooth"});
      // gsap.to(window, {scrollTo:item_top + 80, duration:1});
    })
  });

})();
