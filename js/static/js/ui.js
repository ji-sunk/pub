var _tablet = (/tablet|ipad|sm-t/i.test(navigator.userAgent.toLowerCase()));
var _mobile = (/android|iphone|ipod/i.test(navigator.userAgent.toLowerCase()));

$(document).ready(function() {

  chkDevice();
    
  //tab
  $(document).on('click', '.tablist a', function(){
    var tab_wrap = $(this).closest('.tab-wrap');
    var tab_target = $(this).attr('href');
    $(tab_wrap).find('.tablist a').not($(this)).removeClass('active');
    $(this).addClass('active');
    $(tab_wrap).find('.tabCont').not($(tab_target)).removeClass('active');
    $(tab_target).addClass('active');
  });

  //토스트팝업
  if( $('.toast-pop').length > 0 ){
    setTimeout( "$('.toast-pop').addClass('active')" , 10 );
    setTimeout( "$('.toast-pop').addClass('disappear')" , 2000 );
  }

  //미니팝업
  $(document).on('click', '.btn-tooltip', function(){
    var _target = $(this).next('.tooltipBox');
    _target.addClass('active');
  });

  $(document).on('click', '.btn-closeTooltip', function(){
    $(this).closest('.tooltipBox').removeClass('active');
  });

  //라디오 버튼 처리
  $(document).on('click', '.btn-radio', function(){
    var _parent = $(this).closest('.radio-wrap');
    _parent.find('.btn-radio').not($(this)).removeClass('on')
    $(this).addClass('on');
  });

  //셀렉트 처리
  $(document).on('click', '.selected_txt', function(){
    var _this = $(this);
    if(_this.hasClass('select-disabled')){
      return ;
    }
    var _parent = _this.closest('.new-select');
    $('.new-select').not(_parent).removeClass('opened');
    if(_parent.hasClass('opened')){
      _parent.removeClass('opened')
    }else{
      _parent.addClass('opened')
    }
    _parent.find('.select_option li button').on('click', function(){
      _parent.removeClass('opened')
      _parent.find('.select_option li button').not($(this)).removeClass('selected')
      $(this).addClass('selected');
      _this.removeClass('first')
      _this.text($(this).text());
    });
  });

  // 셀렉트가 아닌 곳을 클릭하면 무조건 닫히도록 설정
  $(document).on('click', function(e){
    if($(e.target).closest('.new-select').length > 0){
      return;
    }else{
      if( $('.new-select').length > 0 ) {
        $('.new-select').removeClass('opened');
      }else{
        return;
      }
    }
  });

  // 좌우 스크롤 영역이 pc에서는 좌우버튼으로 이동되도록 처리
  var _mmlCnt = 0;
  $(document).on('click', '.scrollX-wrap .btn-scrollX', function(){
    var _bool = $('.wrap-inner').hasClass('v-pc');
    var _parent = $(this).closest('.scrollX-wrap');
    var _mml = _parent.attr('data-wmw') * 1;
    var _contWidth = _parent.find('.scrollX-cont').width();
    var _maxMmlCnt = parseInt(_contWidth / _mml);

    if(_bool){
      if($(this).hasClass('next')){
        _mmlCnt++;
        if( _mmlCnt >= _maxMmlCnt){
          _parent.removeClass('first').addClass('last');
        }else{
          _parent.removeClass('first').removeClass('last');
        }
      }else{
        _mmlCnt--;
        if( _mmlCnt <= 0){
          _parent.removeClass('last').addClass('first');
        }else{
          _parent.removeClass('last').removeClass('first');
        }
      }
      _parent.find('.scrollX-cont').css('margin-left', (-1 * _mml*_mmlCnt)+'px');
    }
  });

  //고객지원의 리스트 열고닫기
  $(document).on('click', '.ml-title', function(){ 
    if($(this).hasClass('opened')){
      $(this).removeClass('opened');
      $(this).next('.ml-view').removeClass('active')
    }else{
      $(this).addClass('opened');
      $(this).next('.ml-view').addClass('active')
    }

  });
    
    //키패드 분수입력 레이어
    $('.fraction').on('click', function(){
        $('.fraction_box').hide();
        $(this).next('.fraction_box').show();
    });
    $('.mixed_num').on('click', function(){
        $('.fraction_box').hide();
        $(this).next('.fraction_box').show();
    });    
    $('.fraction_box .x').on('click', function(){
        $('.fraction_box').hide();
    });
    
    //키패드 특수 수식 입력 레이어(교문)
    $('.js_input_pop').on('click', function(){
        $('.input_pop').addClass('on');
    });
    $('.input_pop .x').on('click', function(){
        $(this).closest('.input_pop').removeClass('on');
    });
    
    //모바일 키패드에서 내부의 추가키 팝업 열고 닫기
    $('.js_more').click(function(){
        if(!$(this).closest('.more').hasClass('open')){
            $('.more').removeClass('open');
            $(this).closest('.more').addClass('open');
        } else {
            $(this).closest('.more').removeClass('open');
        };
    });
    $('.more').click(function(event){
       event.stopPropagation();
    });
    $(document).click(function(){
       $('.more').removeClass('open');
    });    
    
    //코스학습) 헤더의 메시지 길이에 따라서 헤더 높이와 동글이 로티 변환 
    if($('.js_change_header .messege_wrap div').hasClass('messege')){ //메시지가 한줄이라도 있다면
        $('.js_change_header .head_img_wrap .no_messege').hide();
        
        if($('.messege br').length){ //메시지가 두줄이라면
            $('.js_change_header').siblings('.header_gray_bg').addClass('mess2');
            $('.js_change_header').addClass('head_mess2');
        }else{ //메시지가 한줄이라면
            $('.js_change_header').siblings('.header_gray_bg').addClass('mess1');
            $('.js_change_header').addClass('head_mess1');
        }
    }else{//메시지가 없다면
        $('.js_change_header .head_img_wrap .with_messege').hide();
    };
    
    //코스학습) 스크롤시 헤더 높이 변화
  var lastScrollTop = 0;
  $('.js_change_header .container').scroll(function(){
    var st = $(this).scrollTop();
    var spaceHeight = $('.wrap-inner').hasClass('v-mob') ? 56 : 104 ;
    if(st > lastScrollTop){
      if( ($('.course_tab_wrap').height() ) > ($('.js_change_header .container').height() + spaceHeight) ){
                $('.js_change_header').addClass('head_short');
                $('.js_change_header').siblings('.header_gray_bg').addClass('head_bg_short');
      }
    }else{
      if( st == 0 ){
                $('.js_change_header').removeClass('head_short');
                $('.js_change_header').siblings('.header_gray_bg').removeClass('head_bg_short');
      }
    }
    lastScrollTop = st;
  });
    
    //코스학습 레벨업 페이지) 스크롤시 헤더 높이 변화
  var lastScrollTop2 = 0;
  $('.js_change_header2 .container').scroll(function(){
    var st = $(this).scrollTop();
    var spaceHeight = $('.wrap-inner').hasClass('v-mob') ? 56 : 80 ;
        
        
    if(st > lastScrollTop2){
      if( ($('.js_change_header2 .container .inner').height() ) > ($('.js_change_header2 .container').height() + spaceHeight) ){
                $('.js_change_header2').addClass('head_short');
                $('.js_change_header2').siblings('.header_gray_bg').addClass('head_bg_short');
      }
    }else{
      if( st == 0 ){
                $('.js_change_header2').removeClass('head_short');
                $('.js_change_header2').siblings('.header_gray_bg').removeClass('head_bg_short');
      }
    }
    lastScrollTop2 = st;
  });
    
    //마이페이지 학습자정보 아코디언
    $('.v-mob .js_member_accordion .mem_line .part1').on('click', function(){
        if(!$(this).parent().hasClass('on')) {
            $('.js_member_accordion .mem_line').removeClass('on');
            $(this).parent().addClass('on');
            $('.mem_line .part2').hide();
            $(this).siblings('.part2').show();
        } else {
            $(this).parent().removeClass('on');
            $(this).siblings('.part2').hide();
        };        
    });    
    
    //학습결과) 페이지 로딩된 후 2초후에 스크롤 최하단으로 내리기
    setTimeout(function() { 
        $('.ani_scroll').animate({scrollTop:'+=1000'});
    }, 2000);
    
});


$(window).on('resize', function(){
  chkDevice();
});

function chkDevice(){
  $('.wrap-inner').removeClass('v-mob').removeClass('v-tab').removeClass('v-pc')
  if(_mobile){
    $(".wrap-inner").addClass("v-mob");
  }else if(_tablet){
    $(".wrap-inner").addClass("v-tab");
  }else{
    $(".wrap-inner").addClass("v-pc");
  }
}

// 로티 애니메이션 : 반복
function func_animation(elmID, jsonName, loop){
  var loop = (loop == undefined ) ? true : loop;
  var _animWrap = document.getElementById(elmID);
  if( !(_animWrap == null) ) {
    _animWrap.innerHTML = '';
    var animation = bodymovin.loadAnimation({
        container: _animWrap,
        renderer: 'svg',
        loop: loop,
        autoplay: true,
        path: 'static/json/'+jsonName+'.json'
    });
    animation.setSpeed(0.65);
  }
}

// 로티 애니메이션 : 반복 사이에 delay를 둠
function func_animation_delay(elmID, jsonName, loop){
  var delay = 2000; //delay 시간
  var loop = (loop == undefined ) ? true : loop;
  var _animWrap = document.getElementById(elmID);
  if( !(_animWrap == null) ) {
    _animWrap.innerHTML = '';
    var animation_delay = bodymovin.loadAnimation({
        container: _animWrap,
        renderer: 'svg',
        autoplay: true,
        path: 'static/json/'+jsonName+'.json'
    });
      
    animation_delay.addEventListener('complete', function() {
      setTimeout(function(){
        animation_delay.goToAndPlay(0);
      }, delay);
    });
  }
}

// 로티 애니메이션 : 특정 구간만 반복 (frameNum부터 끝가지)
function func_anim_sp(elmID, jsonName, frameNum){
  var chk = false;
  document.getElementById(elmID).innerHTML = '';
  var animOptions = {
    container: document.getElementById(elmID),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'static/json/'+jsonName+'.json'
  };

  var animation = bodymovin.loadAnimation(animOptions);
  animation.setSpeed(0.6);
  animation.addEventListener('enterFrame',function(e){
    if(e.currentTime > frameNum-3){
      animation.setSpeed(1);
    }
  });

  animation.onComplete = function() {
    animation.goToAndPlay(frameNum, true);
    animation.addEventListener('enterFrame',function(e){
      if(e.currentTime== e.totalTime-1){
        animation.goToAndPlay(frameNum, true);
      }
    });
  }
}

//js_play_audio1 클릭시 오디오 한번 재생
$(document).on("click", ".js_play_audio1", function(){
    audio1.currentTime = 0;
    audio1.play();
});

//js_play_audio2 클릭시 오디오 한번 재생
$(document).on("click", ".js_play_audio2", function(){
    audio2.currentTime = 0;
    audio2.play();
});

//js_play_audio1_loop 클릭시 오디오(변수 audio1) 반복재생
$(document).on('click', '.js_play_audio1_loop', function(){
    audio1.currentTime = 0;
    audio1.play();
    
    audio1.addEventListener('ended', function() { 
        this.currentTime = 0;
        this.play();
    }, false);
});


//속도계
function speedometer(id, value, bgColor, barColor){
  var c = document.getElementById(id);
  var ctx = c.getContext("2d");
  var _this = $('#'+id);
  var _parent = _this.closest('.gaugeBox');
  c.width  = _parent.width();
  c.height  = _parent.height();

  var strokeWidth = 0;
  if(_mobile){
    strokeWidth = _parent.attr('data-sw-m');
  }else if(_tablet){
    strokeWidth = _parent.attr('data-sw-t');
  }else{
    strokeWidth = _parent.attr('data-sw-pc');
  }

  var x = c.width / 2;
  var y = c.width / 2;
  var radius = (c.width / 2 ) - strokeWidth;
  var minRad = 0.75*Math.PI;
  var maxRad = 2.25*Math.PI;
  var valueRad = (maxRad - minRad) * value + minRad;

  if( radius<0 ) return;

  //background
  ctx.beginPath();
  ctx.arc(x,y,radius,minRad,maxRad);
  ctx.lineWidth=strokeWidth;
  ctx.lineCap="round";
  ctx.strokeStyle=bgColor;
  ctx.stroke();


  // noAni 있으면 애니메이션 효과 없도록
  if (_parent.hasClass('noAni')){
    funcSMlineanim(ctx, x,y,radius,minRad, valueRad, strokeWidth, barColor)
  }else{
    //선이 스르륵 그려지도록 설정
    for(i=minRad; i< valueRad ; i=i+0.2){
      if( i+0.2 > valueRad){
        setTimeout(funcSMlineanim, 100*i, ctx, x,y,radius,minRad, valueRad, strokeWidth, barColor);
      }else{
        setTimeout(funcSMlineanim, 100*i, ctx, x,y,radius,minRad, i, strokeWidth, barColor);
      }
    }
  }


  // 바늘 회전하도록
  var _thisArr = _parent.find('.gaugeArr');
  var _thisArrDeg = ( 260 * value ) - 130;
  if(_thisArrDeg < -65 ){
    _thisArrDeg = _thisArrDeg + 20;
  }else if(_thisArrDeg < 0 ){
    _thisArrDeg = _thisArrDeg + 10;
  }
  _thisArr.css({'transform': 'rotate('+_thisArrDeg+'deg)'});

}

function funcSMlineanim(ctx, x,y,radius,minRad, i, strokeWidth, barColor) {
  //foreground
  ctx.beginPath();
  ctx.arc(x,y,radius,minRad, i);
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = barColor;
  ctx.stroke();
}


/**  */