
//프로필 캐릭터 수정 버튼
(function(){
  const edit_btn = document.querySelector('.edit_btn button');
  if(!edit_btn) return;
  const body = document.body;
  const pr_top_text = document.querySelector('.pr_top_text p');
  const ch_edit_icon = document.querySelectorAll('.ch_edit_icon');  
  const pr_mb_desc = document.querySelector('.pr_mb_desc');  

  let mode_flag = true;

  edit_btn.addEventListener("click", function(e){  
    // 2022.09.22 버튼 text 추가
    const btn_text_wrap = this.querySelector('span');
    body.classList.toggle("mode_edit");
   
    if(mode_flag){
      btn_text_wrap.innerText = "Done";
      pr_top_text.innerHTML = "Manage profiles";
      if(pr_mb_desc) pr_mb_desc.style.display = "none";
      mode_flag = false;
    }else{
      btn_text_wrap.innerText = "Eite";
      pr_top_text.innerHTML = "Please select <br>a profile to learn.";
      if(pr_mb_desc) pr_mb_desc.style.display = "block";
      mode_flag = true;
    }

    ch_edit_icon.forEach(item =>{
      item.classList.toggle("active");
    })
  });
})();

//프로파일 생성 이름 입력 후 
(function(){
  const ch_name_input = document.querySelector('.pr .ch_name');
  const input_pass= document.querySelector('.pr .input_pass');
  const save_btn = document.querySelector('.bottom_zero_btn_wrap');

  function add_btn(val){
    if (val.length > 0) {  
      save_btn.classList.add("active");
    }else{   
      save_btn.classList.remove("active");
    }
  }

  // 캐릭터 이름
  (function(){
    if(!ch_name_input) return;
    ch_name_input.addEventListener("change", function(e){  
      const value = e.currentTarget.value;
      add_btn(value); 
    });
  })();

  // Confirm password
  (function(){
    if(!input_pass) return;
    input_pass.addEventListener("change", function(e){  
      const value = e.currentTarget.value;
      add_btn(value); 
    });
  })();
})();


// 캐릭터 선택
(function(){
  const ch_list = document.querySelectorAll(".character_list")

  ch_list.forEach(list =>{
    const ch_btn = list.querySelectorAll('.change_ch .character_list button');  

    function active_remove(){
      ch_btn.forEach(btn =>{
        btn.classList.remove("active");
      });
    }

    ch_btn.forEach(btn =>{
      btn.addEventListener("click", function(e){ 
        active_remove();
        btn.classList.add("active");
      });
    });
  });
})();
