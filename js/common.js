$.validator.setDefaults({
	debug:false,//디버깅 용도에만 활성
	errorClass:'err',
	errorElement:'p',
	// onkeyup:false,
	// onfocusout:false,
	// onclick:false,
	errorPlacement:function(error,element){
		error.removeClass('err').addClass('error tc_poi');
		element.removeClass('err');
		var $wraper = element.closest('[class^=input_]');
		if(element.is('#certcheck')){
			$wraper = element.closest('.cert');
		}
		$wraper.find('p.error').remove();
		$wraper.addClass('error').append(error);
		if(element.is('[name^=phone]')){
			element.closest('div.phone').addClass('error');
		}
		if(element.is('[name^=useremail]')){
			element.closest('div.email').addClass('error');
		}
		if(element.is('[name^=bir]')){
			element.closest('div.birthday').addClass('error');
		}
		if(element.is('[name=usersex]')){
			element.closest('div.sex').addClass('error');
		}
	},
	success: function(label,element) {
		var $wraper = $(element).closest('[class^=input_]');
		if($(element).is('#certcheck')){
			$wraper = $(element).closest('.cert');
		}
		label.remove();
		$(element).removeClass('valid');
		$wraper.removeClass('error');
		if($(element).closest('div.phone').hasClass('error') && $(element).closest('div.phone').find('p.error').length == 0){
			$(element).closest('div.phone').removeClass('error');
		}
		if($(element).closest('div.email').hasClass('error') && $(element).closest('div.email').find('p.error').length == 0){
			$(element).closest('div.email').removeClass('error');
		}
		if($(element).closest('div.birthday').hasClass('error') && $(element).closest('div.birthday').find('p.error').length == 0){
			$(element).closest('div.birthday').removeClass('error');
		}
		if($(element).closest('div.sex').hasClass('error') && $(element).closest('div.sex').find('p.error').length == 0){
			$(element).closest('div.sex').removeClass('error');
		}
	}
});
var mSize = 426, // 813
	mCheck = function(e){
		var check = false;
		if($(window).width() < mSize){
			check = true;
			if($.browser.desktop){
				check = false;
			}
		}
		return check;
	},
	likeBtnFn = function(obj){//좋아요버튼
		var $this = obj,
			count = $this.attr('data-count')*1,
			w = $this.width();
		if($this.hasClass('selected')){
			$this.removeClass('selected');
			count--;
		}else{
			$this.addClass('selected');
			count++;
		}
		$this.attr('data-count',count).find('.count').text(numberWithCommas(count));
		if( w!=$this.width() ){
			brandWidthSet($this.closest('li').find('.func'));
		}
		if($this.is('[data-callback]')){
			var cb = $this.attr('data-callback');
			window[cb].call($this[0]);
		}
	},
	numberWithCommas = function(x){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	resizeFn = function(e){
		$('.list_product:not(.small) .func').each(function(i,el) {
			brandWidthSet(el);
		});
		$('.street_list .func').each(function(i,el) {
			brandWidthSet2(el);
		});
		if($('.main_video')[0]){
			if( $('.main_video .tit').height() < 70 ){
				$('.main_video .desc').show();
			}else{
				$('.main_video .desc').hide();
			}
		}
		if( !$('.search_layer').hasClass('hide') ){
			$('.searchtotal_top').css({
				'margin-top':-$('.searchtotal_bottom').height()/2
			});
			$('.search_layer .wrap_layer').css({
				'min-height':$('.searchtotal_top').height() + $('.searchtotal_bottom').height()
			})
		}
	},
	brandWidthSet = function(el){
		if(!mCheck()){
			var w = $(el).closest('li').width()-10;
			$(el).closest('li').find('.brand').css('max-width',w-$(el).width());
		}
	},
	brandWidthSet2 = function(el){
		if(!mCheck()){
			var w = $(el).closest('li').width()-25;
			$(el).closest('li').find('.category').css('max-width',w-$(el).width());
		}
	},
	qnaViewFn = function(obj){
		var $this = $(obj);
		$this.closest('.group').find('.item').removeClass('view');
		$this.closest('.item').addClass('view');
	},
	setNumber = function(type,obj){
		var t = obj.closest('.input_number').find('.text_number'),
			n = t.val()*1;
		if(type == 'plus'){
			t.val(n+1);
		}
		if(type == 'minus' && n>1){
			t.val(n-1);
		}
	},
	numberMaxlength = function(obj){
		if (obj.value.length > obj.maxLength){
			obj.value = obj.value.slice(0, obj.maxLength);
		}
	},
	openLayer = function(event,obj,focus){
		var checkObject = typeof obj == 'object',
			$tar = checkObject?$($(obj).attr('href')):$(obj),
			$tar = $tar.closest('.dim_layer').is('div:not(.alert)')?$tar.closest('.dim_layer'):$tar;
			$focus = checkObject?$(obj):$(focus),
			closeID = $tar.hasClass('dim_layer')?$tar.find('.wrap_layer').attr('id'):$tar.attr('id'),
			evt = event;
		if(checkObject && $(obj).is('a')){
			evt.preventDefault();
			$(obj).on({
				'click.openlayer':function(e){
					$(obj).off('click.openlayer');
					$tar.data('off',$(this));
					closeLayer('#'+closeID);
				}
			})
		}
		$tar.data('focus',$focus);
		if( $tar.closest('.dim_layer')[0] ){
			$('body').css('overflow','hidden');
		};
		if($tar.hasClass('alert_layer')){
			if(event){
				$tar.find('.btn_cancel, .btn_close').on('click',function(e){
					$tar.data('off',$(this));
					closeLayer('#'+closeID);
				});
			}
			$tar.removeClass('hide').find('.btn_confirm').focus();
			if(mCheck() && !$('#dimM')[0]){
				$('body').append('<div id="dimM" />');
			}
		}else{
			$tar.removeClass('hide').find('.btn_close').on('click',function(e){
				$tar.data('off',$(this));
				closeLayer('#'+closeID);
			}).focus();
			function layerResize(){
				var a = $tar.find('.wrap_layer').outerHeight()+100,
					b = $(window).height();
				if( a>b ){
					$tar.addClass('scroll');
				}else{
					$tar.removeClass('scroll');
				}
			}
			if($tar.is('.dim_layer:not(.search_layer)') ){
				layerResize();
				$(window).on('resize.dimLayer',layerResize);
			}
		};
	},
	closeLayer = function(tar){
		var $tar = $(tar).closest('.dim_layer').is('div')?$(tar).closest('.dim_layer'):$(tar);
		$tar.addClass('hide');
		if($tar.data('off')){
			$tar.data('off').off('click');
		};
		if($tar.data('focus')){
			$tar.data('focus').focus();
		};
		if($tar.hasClass('dim_layer')){
			$tar.removeClass('scroll');
			$(window).off('resize.dimLayer');
		}
		if($tar.hasClass('alert')){
			$tar.remove();
		}
		$('body').removeAttr('style');
		if(mCheck()){
			$('#dimM').remove();
		}
	},
	showAlert = function(name,message,type,callback){
		var btns = type==0?'<button type="button" class="btn_cancel lc_e5 tc_8">취소</button><button type="button" class="btn_confirm lc_e5">확인</button>':'<button type="button" class="btn_confirm lc_e5">확인</button>',
			code = '<div class="dim_layer alert"><div class="alert_layer lc_b pos_center hide" id="'+name+'"><p class="message tc_3">'+message+'</p><div class="btns lc_e5 clear">'+btns+'</div></div></div>';
		$('body').append(code);
		var $alert = $('#'+name),
			btnCancel = $alert.find('.btn_cancel'),
			btnConfirm = $alert.find('.btn_confirm');
		openLayer(window.event,'#'+name);
		if(callback){
			window[callback].call(null,btnCancel,btnConfirm,'#'+name);
		}else{
			btnCancel.on('click',function(e){
				closeLayer('#'+name);
			});
			btnConfirm.on('click',function(e){
				closeLayer('#'+name);
			});
		}
	},
	validateFn = function(event,obj){
		var $this = $(obj),
			$req = $this.find('[required]'),
			length = $req.length,
			count = 0;
		$this.find('.error:not(p)').removeClass('error');
		$req.each(function(index, el) {
			if(el.checkValidity()){
				if($(el).is('select') || $(el).is('[type=hidden]')){
					if(!$(el).val()){
						showValidate(el);
					}else{
						count++
					}
				}else{
					if($(el).is('[minlength]')){
						if($(el).attr('minlength')*1 > $(el).val().length){
							showValidate(el);
						}
					}else{
						count++;
					}
				}
			}else{
				showValidate(el);
			}
		});
		if(count != length){
			event.preventDefault();
			event.stopPropagation();
		}
	},
	addErr = function(tar){
		var $tar = tar.closest('table').is('.table_st')?tar.closest('td').find('>*').eq(0).is('[class^=input_]')?tar.closest('[class^=input_]'):tar.closest('div'):tar.closest('[class^=input_]');
		$tar.addClass('error');
	},
	showValidate = function(obj){
		if($(obj).is('select')){
			if($(obj).find('option:selected').is('[disabled]')){
				addErr($(obj));
			}
		}
		if($(obj).is('[minlength]')){
			if($(obj).attr('minlength')*1 > $(obj).val().length){
				addErr($(obj));
			}
		}
		$(obj).one('invalid',function(e){
			e.preventDefault();
			addErr($(this));
		});
		obj.reportValidity();
	},
	expandSummary = function(obj){
		if($(obj).closest('.mypage_summary').hasClass('mini')){
			$(obj).closest('.mypage_summary').removeClass('mini')
		}else{
			$(obj).closest('.mypage_summary').addClass('mini')
		}
	},
	autolineFn = function(obj){
		obj.height(22).height(obj[0].scrollHeight);
		if(obj.closest('.feedview_replywrite')[0]){
			obj.next().removeClass('hide');
		}
	},
	noticeLayer = function(id,index){
		var $tar = $('#'+id);
		$tar.css({
			'top':$('#gnb').offset().top+119,
			'z-index':200+index
		}).removeClass('hide').find('.btn_close').on('click',function(e){
			$(this).off('click');
			$tar.addClass('hide');
		});
		
	},
	transitionendEvent = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
	autoWidthSelect = function(obj){
		var t = $(obj),
			pd = t.css('padding-right').replace(/[^0-9]/g,'')*1,
			si = t[0].selectedIndex,
			text = t[0].selectedOptions[0].innerText,
			style = !pd?'position:fixed;z-index:-1;left:0;top:0;font-size:14px;border:0;opacity:0':'position:fixed;z-index:-1;left:0;top:0;font-size:18px;border:0;opacity:0;font-weight:700;padding-right:25px',
			tempCode = $('<select id="tempSelect" style="'+style+'"><option id="tempOption"></option></select>');
		$('body').append(tempCode);
		$('#tempOption').html(text);
		t.width($('#tempSelect').width());
		$('#tempSelect').remove();
	},
	shareM = function(){
		function copySelectionText(){
			var copysuccess;
			try{
				copysuccess = document.execCommand("copy");
			} catch(e){
				copysuccess = false;
			}
			return copysuccess;
		}
		var layerCode = `<div class="alert_layer lc_b pos_center hide" id="copyAlert">
			<button type="button" class="btn_close bg_3_a bg_3_b pos_center_before pos_center_after on_m"><span class="s_out">본문으로 돌아가기</span></button>
			<p class="message tc_3"></p>
			<div class="btns lc_e5 clear">
				<button type="button" class="btn_confirm lc_e5" onclick="closeLayer('#copyAlert');">확인</button>
			</div>
		</div>`;
		$('body').append('<input value="'+window.location.href+'" id="copyurl" style="position:fixed;z-index:-1;left:0;top:-50px" />')
		$('#copyurl').focus();
		$('#copyurl')[0].setSelectionRange(0, $('#copyurl').val().length);
		var copysuccess = copySelectionText();
		if (copysuccess){
			var mess = '공유를 위한 URL이 복사 되었습니다.';
		}else{
			var mess = 'URL 복사가 되지 않았습니다.';
		};
		$('#copyurl').remove();
		if(!$('#copyAlert')[0]){
			$('body').append(layerCode);
		}
		$('#copyAlert .message').html(mess);
		openLayer(window.event,'#copyAlert');
	},
	openReply = function(obj){//댓글열기닫기
		var $this = $(obj);
		if( $this.hasClass('close') ){
			$this.removeClass('close').closest('.func').next('.on_reply').addClass('hide');
		}else{
			$this.addClass('close').closest('.func').next('.on_reply').removeClass('hide');
		}
	};

$(window).on({
	click:function(e){
		var $this = $(e.target);
		if( $this.closest('button').is('[data-type=like]') ){//좋아요버튼
			likeBtnFn($this.closest('button'));
		}
		if( $this.closest('a').hasClass('disabled') ){//a링크 비활성화
			e.preventDefault();
		}
		if( $this.closest('button').is('[data-type=qnaview]') ){//qna 버튼 열기 닫기
			qnaViewFn($this[0]);
		}
		if( $this.closest('button').is('[data-type=inputreset]') ){//input 리셋하기
			$this.closest('button').prev('input').val('').focus();
		}
		if( $this.is('[data-type=plus]') ){//input 숫자 더하기
			setNumber('plus',$this);
		}
		if( $this.is('[data-type=minus]') ){//input 숫자 빼기
			setNumber('minus',$this);
		}
		if( $this.is('button[data-type=copyurl]') ){
			shareM();
		}
		if( $this.is('a[data-type=tooltip]') ){//툴팁
			e.preventDefault();
			if( $this.is('[href=#shareLayer]') && mCheck() ){
				shareM();
			}else{
				var $tar = $($this.attr('href'));
				if($tar.hasClass('hide')){//툴팁 보이기
					$tar.removeClass('hide').on('mouseleave',function(e){//툴팁 가리기
						$tar.addClass('hide').off('mouseleave');
					});
				}else{//툴팁 가리기
					$tar.addClass('hide');
				}
			}
		}else{
			$('.tootip_layer').addClass('hide');
		}
		if( $this.is('button[data-type=copyButton]') ){//카피버튼
			var tar = $('input[data-type=copyTarget]');
			tar.select();
			var successful = document.execCommand('copy');
			if(successful){
				showAlert('copyResult','주소가 복사 되었습니다.',1);
			}else{
				showAlert('copyResult','주소 복사에 실패했습니다.',1);
			}
		}
		if(!mCheck()){
			if( !$this.closest('div').hasClass('alram_layer') && !$this.closest('a').hasClass('alram') ){
				$('#alramLayer').addClass('hide');
			}
			if( !$this.closest('div').hasClass('cart_layer') && !$this.closest('a').hasClass('cart') ){
				$('#cartLayer').addClass('hide');
			}
		}
		if( $this.closest('#timeattack').hasClass('timeattack') && $this.closest('div').hasClass('before') ){
			$('#timeattack').addClass('hide');
		}
		if( $this.is('button[data-type=openfilter]') ){
			if(!mCheck()){
				var $fl = $('#filterLayer');
				if($fl.hasClass('hide')){
					$fl.removeClass('hide');
					$this.addClass('close');
				}else{
					$fl.addClass('hide');
					$this.removeClass('close');
				}
			}else{
				var $fl = $('#mFilterLayer');
				openLayer(window.event,'#mFilterLayer');
				$fl.find('.folded').each(function(index, el) {
					$(el).removeAttr('style').removeClass('close').height($(el).height()).addClass('close').closest('.item').removeClass('open');
				});
			}
		}else{
			if(!mCheck()){
				if( $this.closest('#filterLayer').length ==0 ){
					var $fl = $('#filterLayer');
					$fl.addClass('hide');
					$('.func .filter.close').removeClass('close');
				}
			}
		}
		if( $this.is('button[data-type=mfilterfold]') ){
			var $item = $this.closest('.item');
			$item.find('.folded').height($item.find('.folded .inner').outerHeight());
			if($item.hasClass('open')){
				$item.removeClass('open').find('.folded').addClass('close');
			}else{
				$item.closest('.accordion').find('.item.open').removeClass('open').find('.folded').addClass('close');
				$item.addClass('open').find('.folded').removeClass('close');
			}
		}
		if( $this.closest('button').is('[data-type=opensort]') ){
			var $sl = $('#sortLayer');
			if($sl.hasClass('hide')){
				$sl.removeClass('hide');
			}else{
				$sl.addClass('hide');
			}
		}else{
			$('#sortLayer').addClass('hide');
		}
		if( $this.closest('a').hasClass('alram') ){
			if( $this.closest('a').is('[href=#alramLayer]') ){
				e.preventDefault();
			}
		}
		if( $this.closest('a').hasClass('cart') ){
			if( $this.closest('a').is('[href=#cartLayer]') ){
				e.preventDefault();
			}
		}
		if(mCheck()){
			if( $this.closest('.wrap_cart')[0]){
				e.preventDefault();
				$('#cartLayer').removeClass('hide');
			}else{
				$('#cartLayer').addClass('hide');
			}
			if( $this.closest('.wrap_alram')[0]){
				e.preventDefault();
				$('#alramLayer').removeClass('hide');
			}else{
				$('#alramLayer').addClass('hide');
			}
			if( $this.is('.tab_cate a')){
				e.preventDefault();
				if(!$this.closest('li').hasClass('on')){
					$('#gnb').removeClass('hide');
                    $('#gnb').css('height','100%');                    
					$this.closest('li').addClass('on')
				}else{
					$('#gnb').addClass('hide');
					$('#gnb').css('height','0');
					$this.closest('li').removeClass('on')
				}
			}
			if( $this.is('#gnb, #gnb ul') && !$this.is('#gnb a')){
				$('#gnb').css('height','0');
				$('.tab_cate').removeClass('on')
			}
			if( $this.is('.clothing') && $this.closest('nav').hasClass('gnb') ){
				e.preventDefault();
				if( $this.closest('.wrap_layer').length == 0 ){
					$('#allmenu').removeClass('hide');
					$('.alram_layer,.cart_layer').addClass('hide');
					$('.site_main').addClass('hide');
				}
			}
			if( $this.is('.brands') && $this.closest('nav').hasClass('gnb') ){
				e.preventDefault();
				if( $this.closest('.wrap_layer').length == 0 ){
					$('#brandmenu').removeClass('hide');
					$('#brandmenu').removeClass('hide');
					$('.alram_layer,.cart_layer').addClass('hide');
					$('.site_main').addClass('hide');
				}
			}
			if( $this.closest('div').hasClass('item') || $this.is('.btn_prev') ){
				if( !$this.is('label') && !$this.is('input') ){
					e.preventDefault();
					$('#gnb').addClass('hide');
					$('#gnb').css('height','0');
					$('#allmenu').addClass('hide');
					$('#brandmenu').addClass('hide');
					$('.tab_cate').removeClass('on')
					$('.site_main').removeClass('hide');
				}
			}
			if( $this.closest('main').hasClass('site_main') || $this.closest('h1').hasClass('logo') || $this.closest('.header_links').length>0 ){
				$('#allmenu').addClass('hide');
				$('#brandmenu').addClass('hide');
			}
			if( $this.is('.sub_menu a') || $this.children('ul').hasClass('list_3depth')){
				e.preventDefault();
				if( $this.closest('li').hasClass('on')){
					$this.parents('li').find(".list_3depth").hide();
					$this.parents('li').removeClass('on');
				}else{
					$this.parents('li').find(".list_3depth").show();
					$this.parents('li').addClass('on');
				}
			}
		}
	},
	change:function(e){
		var $this = $(e.target);
		if( $this.is('select.tc_3_h') ){//셀렉트 박스 컬러 변경
			$this.addClass('tc_3');
		}
		if( $this.is('input[data-type=checkAll]') ){//테이블 체크박스 전체 선택
			var checkboxs = $this.closest('table').find('tbody input[type=checkbox]:not([disabled])');
			checkboxs.each(function(e){
				$(this).prop('checked',$this.prop('checked'))
			})
		}
		if( $this.is('select[data-type=changeEmail]') ){//이메일 바꾸기
			var input = $('input[data-type=inputEmail]');
			input.prop('value',$this.val());
			input.focus();
			if($this[0].selectedIndex != 1){
				$this.focus();
			}
		}
		if( $this.is('input[type=checkbox][data-type=joinCheckAll]') ){//회원가입 약관 전체체크
			var check = $('input[type=checkbox][data-type=joinCheck]');
			check.prop('checked',$this.prop('checked'))
		}
		if( $this.is('input[type=checkbox][data-type=joinCheck]') ){//회원가입 약관 체크시 전체약관 체크
			var a = $('input[type=checkbox][data-type=joinCheck]').length,
				b = $('input[type=checkbox][data-type=joinCheck]:checked').length,
				all = $('input[type=checkbox][data-type=joinCheckAll]');
			if(a == b){
				all.prop('checked',true)
			}else{
				all.prop('checked',false)
			}
		}
		if( $this.is('[type=file]') && $this.closest('span').is('.input_file') ){//file
			$this.closest('.error').removeClass('error');
			if($this.is('[data-max-size]')){
				var max = $this.attr('data-max-size') * 1;
				if( Math.floor($this[0].files[0].size/1000000) > max ){
					addErr($this);
					$this.val('');
					return false;
				}
			}
			var input = $this.prev('.name');
			input.val($this[0].files[0].name);
		}
		if( $this.is('[type=checkbox][required]') ){
			$this.blur().focus();
		}
		if( $this.is('[data-type=autowidth]') && $this.is('select') ){
			autoWidthSelect($this[0]);
		}
	},
	mouseenter:function(e){
		var $this = $(e.target);
		if( $this.closest('button').is('[data-type*=qnaview]') ){//qna 버튼 오버 줄표시
			$this.closest('button').prev().addClass('over')
		}
		if(!mCheck()) {
			if( $this.is('li') || $this.is('a') && $this.closest('nav').hasClass('gnb') ){
				if( $this.closest('.wrap_layer').length == 0 ){
					$('#allmenu').removeClass('hide');
					$('.alram_layer,.cart_layer').addClass('hide');
				}
			}
			if( $this.closest('main').hasClass('site_main') || $this.closest('h1').hasClass('logo') || $this.closest('.header_links').length>0 ){
				$('#allmenu').addClass('hide');
			}
		}
		if( $this.closest('#timeattack').hasClass('timeattack') && $this.closest('div').hasClass('desc') ){ // 타임어택
			var $ta = $('#timeattack'),
				$after = $ta.find('.after'),
				$before = $ta.find('.before'),
				$slides = $after.find('.slides'),
				$countAfter = $slides[0].slick.$slides.length == 0?$after.find('.txt_timeattack'):$after.find('.slick-active .txt_timeattack');
			if(!$after.hasClass('view') ){
				$countAfter.countdown('start');
				$before.find('.txt_timeattack').countdown('stop');
				$slides.slick('slickSetOption',{autoplay:true},true);
				$slides.slick('slickPlay');
				$after.addClass('view').find('.btn_close').one('click',function(e){
					$slides.slick('slickPause');
					$countAfter.countdown('stop');
					$after.removeClass('view').one(transitionendEvent,function(e){
						$before.find('.txt_timeattack').countdown('start');
						$before.find('.desc').removeClass('back').addClass('tran').one(transitionendEvent,function(e){
							$(this).removeClass('tran');
							$slides.slick('slickSetOption',{autoplay:false},true);
							$slides.slick('slickSetOption',{initialSlide:0},true);
							$slides.slick('slickGoTo',0,true);
						})
					});
				});
				$('#timeattack').find('.before .desc').addClass('back');
			}
		}
		if(!mCheck()) {
			if( $this.closest('.wrap_cart')[0]){
				$('#cartLayer').removeClass('hide');
				$('#alramLayer').addClass('hide');
			}
			if( $this.closest('.wrap_alram')[0]){
				$('#alramLayer').removeClass('hide');
				$('#cartLayer').addClass('hide');
			}
		}
	},
	mouseleave:function(e){
		var $this = $(e.target);
		if( $this.closest('button').is('[data-type*=qnaview]') ){//qna 버튼 오버 줄표시
			$this.closest('button').prev().removeClass('over')
		}
		if(!mCheck()) {
			if( $this.closest('.gnb').length==0 && $this.closest('.allmenu').length==0 ){
				$('#allmenu').addClass('hide');
			}
		}
		if(!mCheck()) {
			if( $this.closest('.wrap_layer').is('#cartLayer')){
				$('#cartLayer').addClass('hide');
			}
			if( $this.closest('.wrap_layer').is('#alramLayer')){
				$('#alramLayer').addClass('hide');
			}
		}
	},
	focusin:function(e){
		var $this = $(e.target);
		if( $this.closest('button').is('[data-type*=qnaview]') ){//qna 버튼 오버 줄표시
			$this.closest('button').prev().addClass('over')
		}
		if( $this.closest('ul').hasClass('allfeed_list') ){
			$this.closest('li').addClass('hover');
		}
		if(!mCheck()) {
			if( $this.closest('.allmenu').length>0 ){
				$('#allmenu').removeClass('hide');
			}
		}
	},
	focusout:function(e){
		var $this = $(e.target);
		if( $this.closest('button').is('[data-type*=qnaview]') ){//qna 버튼 오버 줄표시
			$this.closest('button').prev().removeClass('over')
		}
		if( $this.closest('ul').hasClass('allfeed_list') ){
			$this.closest('li').removeClass('hover');
		}
	},
	keyup:function(e){
		var $this = $(e.target);
		if( $this.is('textarea[data-type=countlength]') ){//textarea 글자수 세기
			var max = $this.attr('maxlength')*1,
				count = $this.val().length;
			$this.closest('div').find('[data-type=showlength]').text(count);
		}
		if( $this.is('[type=number][maxlength]') ){//number maxlength 제한
			numberMaxlength($this[0]);
		}
		if($this.is('textarea[data-type="autoheight"]')){
			autolineFn($this)
		}
	},
	keydown:function(e){
		var $this = $(e.target);
		if( $this.is('[type=number][maxlength]') ){//number maxlength 제한
			numberMaxlength($this[0]);
		}
		if($this.is('textarea[data-type="autoheight"]')){
			autolineFn($this)
		}
	},
	resize:function(e){
		resizeFn();
	},
	load:function(e){
		resizeFn()
	}
})
$(document).ready(function(){
	if($.browser.msie){$('html').addClass('ie')};
	if( $('[data-type=autowidth]')[0] ){
		autoWidthSelect($('[data-type=autowidth]')[0]);
	};
	if( $('#timeattack')[0] || $('#mTimeattack')[0] ){
		if(mCheck()){
			var tt = function(obj){
				var time = $(obj).attr('data-time'),
					set = $(obj).closest('.before')[0]?'%H:%M:%S':'%D DAY %H:%M:%S';
				$(obj).countdown(time, function(event) {
					$(this).text(event.strftime(set));
				});
			}
			$('#mTimeattack').find('.txt_timeattack').each(function(i,el) {
				tt(el);
			});
			$('#mTimeattack').on({
				'beforeChange':function(e,slick,currentSlide,nextSlide){
					$(slick.$slides[nextSlide]).find('.txt_timeattack').countdown('start');
				},
				'afterChange':function(e,slick,currentSlide){
					var num;
					if(currentSlide==0){
						num = slick.$slides.length-1;
					}else{
						num = currentSlide-1;
					}
					$(slick.$slides[num]).find('.txt_timeattack').countdown('stop');
				}
			}).slick({
				dots:true,
				arrows:false,
				dotsClass:'slick-dots pos_center h dis_f',
				variableWidth:true
			});
			if($('#mTimeattack')[0].slick.$slides.length==1){
				$('#mTimeattack').slick('unslick');
			};
			$.each($('#mTimeattack')[0].slick.$slides, function(index, val) {
				if(index>0){
					$(val).find('.txt_timeattack').countdown('stop');
				}
			});
		}else{
			$('#timeattack').find('.txt_timeattack').each(function(i,el) {
				var time = $(el).attr('data-time'),
					set = $(el).closest('.before')[0]?'%H:%M:%S':'%D DAY %H:%M:%S';
				$(el).countdown(time, function(event) {
					$(this).text(event.strftime(set));
				});
				if($(el).closest('.after')[0]){
					$(el).countdown('stop');
				}
			});
			var $taSlides = $('#timeattack').find('.slides');
			$taSlides.on({
				'beforeChange':function(e,slick,currentSlide,nextSlide){
					$(slick.$slides[nextSlide]).find('.txt_timeattack').countdown('start');
				},
				'afterChange':function(e,slick,currentSlide){
					var num;
					if(currentSlide==0){
						num = slick.$slides.length-1;
					}else{
						num = currentSlide-1;
					}
					$(slick.$slides[num]).find('.txt_timeattack').countdown('stop');
				}
			}).slick({
				dots:true,
				arrows:false,
				autoplay:false,
				autoplaySpeed:2000,
				pauseOnDotsHover:true,
				dotsClass:'slick-dots pos_center h dis_f',
				draggable:false,
				variableWidth:true
			}).each(function(index, el){
				if( $(el)[0].slick.slideCount == 1 ){
					$(el).slick('unslick');
				}
			});
		}
	}

	$(".btn_date.to").click(function(){
		$("#calFormMobile").removeClass("show");
		$("#calFormMobile").addClass("hide");
		$("#calToMobile").removeClass("hide");
		$("#calToMobile").addClass("show");
	});
	$(".btn_date.form").click(function(){
		$("#calToMobile").removeClass("show");
		$("#calToMobile").addClass("hide");
		$("#calFormMobile").removeClass("hide");
		$("#calFormMobile").addClass("show");

	});
	$(".btn_change").click(function(){
		$(this).toggleClass("mini");
		$(this).parent(".tit").next().toggle();
	})
	$("#discontentType").change(function() {
	    $("#discontentType option:selected").each(function() {
	      str = $(this).val();
	    });
		if(str == 0) {
			$(".order_detail_view").addClass("hide");
			$(".order_detail_view.cancel").removeClass("hide");
		}else if(str == 1){
			$(".order_detail_view").addClass("hide");
			$(".order_detail_view.change").removeClass("hide");
		}else if(str == 2){
			$(".order_detail_view").addClass("hide");
			$(".order_detail_view.return").removeClass("hide");
		}
	}).change();
});





















