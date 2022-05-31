$(document).ready(function(){

	

	
	/*scorll header */
	$(function () {
		header_toggle();
		function header_toggle() {
			var top = $(document).scrollTop();
			if (top >= 1) {
				$("header").addClass("on");
			} else {
				$("header").removeClass("on");
			}
		}
		$(window).scroll(function () {
			header_toggle();
		});
	});

	/*scorll top btn */
	$(function () {
		header_toggle();
		var height = $(window).height() / 4;
		function header_toggle() {
			var top = $(document).scrollTop();
					
			if (top >= height) {
				$(".scroll_top_btn").addClass("on");
			} else {
				$(".scroll_top_btn").removeClass("on");
			}
		}
		$(window).scroll(function () {
			header_toggle();
		});
	
		$(".scroll_top_btn").on("click", function (e) {
			e.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, 500);
		});
	});


		
	/*scorll down btn */
	$(function() { 	
		if ($(".main_page").length <= 0) return;
		// var height = $(window).height();	
		$(".scroll_down_btn").on("click", function () {
			var target = $(".main_page section")[1];
			$('html, body').stop().animate({ scrollTop: $(target).offset().top - 75 }, 1500);

		});
	});


	// nav();
	// function nav(){
	// 	$('.menu_container .dep_1').mouseover(function() {
	// 		$('.menu_container .dep_2').removeClass('active');		
	// 		$(this).children('.dep_2').addClass('active');		
	// 		$("header").addClass("on_menu");	
	// 	});

	// 	$('.menu_container .has_dep3').mouseover(function () {
	// 		$('.menu_container .dep_3').removeClass('active');
	// 		$(this).children('.dep_3').addClass('active');
	// 		$(".navBg").addClass("on_add");
	// 	});

	// 	$("header nav").mouseout(function(){
	// 		$('.menu_container .dep_2').removeClass('active');
	// 		$('.menu_container .dep_3').removeClass('active');	
	// 		$("header").removeClass("on_menu");
	// 	});
	

	// 	$('.menu_container .dep_1').not(".mobile_link").mouseover(function () {
	// 		$(".navBg").addClass("on");
	// 	});

	// 	$('.menu_container .dep_1').mouseout(function () {
	// 		$(".navBg").removeClass("on");
	// 	});

	// 	$('.menu_container .has_dep3').mouseout(function () {
	// 		$(".navBg").removeClass("on_add");
	// 	});

	// 	$('.hamburger_btn').on('click', function(){
	// 		$('.m_menu_container').css({display:'block'});
	// 		$('body').addClass('active_burger'); 
	// 		$('.m_menu_container .close_btn').addClass("active");
	// 	});

	// 	$('.m_menu_container .close_btn').on('click', function () {	
	// 		$('.m_menu_container').css({ display: 'none' });
	// 		$(this).removeClass("active");
	// 		$('body').removeClass('active_burger');

	// 		$(".m_menu_container .dep_2").removeClass("active")
	// 		$(".m_menu_container .dep_2").css({ display: "", height: "" });		
	// 	});
	
	// }

	nav(); //2차메뉴 한꺼번에
	function nav() {
		$("header").mouseover(function () {
			$(this).addClass("on_menu");
		});
		$("header").mouseout(function () {
			$(this).removeClass("on_menu");
		});

		$('.menu_container .dep_1').mouseover(function () {
			$(this).children('a').addClass('active');
			$('.menu_container .dep_2').addClass('active');
			$(this).children('.dep_2').addClass('dep2_active');
			// $("header").addClass("on_menu");
		});

		$('.menu_container .dep_1').mouseout(function () {
			$(".navBg").removeClass("on");
			$(this).children('a').removeClass('active');
			$(this).children('.dep_2').removeClass('dep2_active');
		});

		$("header nav").mouseout(function () {
			$('.menu_container .dep_2').removeClass('active');	
		});

		$('.menu_container .dep_1').mouseover(function () {
			$(".navBg").addClass("on");
		});

		$('.hamburger_btn').on('click', function () {
			$('.m_menu_container').css({ display: 'block' });
			$('body').addClass('active_burger');
			$('.m_menu_container .close_btn').addClass("active");
		});

			$('.m_menu_container .close_btn').on('click', function () {	
				$('.m_menu_container').css({ display: 'none' });
				$(this).removeClass("active");
				$('body').removeClass('active_burger');
				$('header').removeClass("on_menu");
				$(".m_menu_container .dep_2").removeClass("active")
				$(".m_menu_container .dep_2").css({ display: "", height: "" });		
		});
	}


	mobile_navgation();
	function mobile_navgation(){			

		$(window).resize(function (e) {	
			var win_width = $(this).outerWidth();					
			if (win_width <= 1024) {	
			
				if ($(".dep_2").hasClass("active")){
					gsap.set(".dep_2.active", { display: 'block', height: 'auto', });					
				}else{
					gsap.set(".dep_2", { display: 'none', height: 0 });
				}
				mobile_nav(".dep_2", ".mgnb .dep_1>a", "");		
				// mobile_nav(".dep_3", ".mgnb .has_dep3>a", "");
			}else{				
				$(".dep_2").removeClass("active")
				$(".dep_2").css({display:"",height:""});	
				$(".dep_3").removeClass("active")
				//$(".dep_3").css({ display: "", height: "" });
			}
		});


		function mobile_nav(t1, t2, t3) {
			var t1_parent = $('.mgnb').find(t1);
		
			$(t2).not(t3).unbind("click").bind("click", function (e) {
				var win_width = $(window).outerWidth();
				if (win_width >= 1024) return;

				e.preventDefault();

				var target = $(this).next(t1);			

				if ($(this).hasClass('home') || target.find('ul').length == 0) {
					location.href = $(this).attr('href');
				}

				if (target.hasClass('active')) {
					target.removeClass('active');
					gsap.to(target, { display: 'none', height: 0 });
				} else {
					t1_parent.removeClass('active');
					gsap.to(t1_parent.not(target), { display: 'none', height: 0 });
					target.addClass('active');
					gsap.set(target, { display: 'block' });
					gsap.to(target, { height: 'auto', duration: .5 });
				}
			});
		}
		mobile_nav(".dep_2", ".mgnb .dep_1>a", "");		
		// mobile_nav(".dep_3", ".mgnb .has_dep3>a", "");
	}

/**************************************/
// lang
/**************************************/
	$('.lang a').on("click", function(e){
		// e.preventDefault();
		const dropArrow = $(this).find(".dropdown_arrow");
		const list = $(this).next("ul");
		if (list.hasClass("on")){
			dropArrow.removeClass("on_drop");
			list.removeClass("on");
		}else{
			list.addClass("on");
			dropArrow.addClass("on_drop");
		}
	});	

	$(".lang ul").mouseleave(function () {
		$(".dropdown_arrow").removeClass("on_drop");
		$(this).removeClass("on");
	});
	
	$(document).on("click", function (e) {
		// if (!$(e.target).hasClass("lang_link") && !$(e.target).hasClass("lang_btn" )){		
		if (!$(e.target).is(".lang, .lang_btn, .current_lang, .dropdown_arrow")) {		
			$(".lang ul").removeClass("on");
			$(".lang>a").removeClass("on_drop");
		}		
	});





	// /**************************************/
	// // breadcrumb
	// /**************************************/
	
	// 	/*breadcrumb active*/
	// $(function () {
	// 	var sub_page = $(".sub_page");
	// 	if (sub_page.length <= 0) return;

	// 	var compare_1 = $('.sub_title_wrap h2').text();
	// 	var compare_2 = $('.current_title_wrap h3').text();
	// 	var list = $('.breadcrumb .dep li');


	// 	list.each(function (index, item) {		
	// 		if ($(item).text() == compare_1) {
	// 			$(item).children('a').addClass("active");				
	// 		} else if ($(item).text() == compare_2){
	// 			$(item).children('a').addClass("active");			
	// 		}
	// 	});


	// 	/**************************************/
	// 	// breadcrumb
	// 	/**************************************/
	// 	breadcrumb();
	// 	function breadcrumb() {
	// 		$(function (){
	// 			var text_1 = $(".breadcrumb .br_dep_1 a.active").text();
	// 			var text_2 = $(".breadcrumb .br_dep_2 a.active").text();
	// 			var target_1 = $(".breadcrumb .br_dep_1 .current_path span");
	// 			var target_2 = $(".breadcrumb .br_dep_2 .current_path span");

	// 			if (!text_1) {
	// 				target_1.text("privacy");
	// 			} else {
	// 				target_1.text(text_1);
	// 			}
	// 			target_2.text(text_2);
	// 		});						

	// 		function removeTarget() {
	// 			$('.dep ul').removeClass('on');
	// 			$(".current_path").removeClass('active');
	// 			$(".dropdown_arrow").removeClass('on_drop');
	// 		}
			
	// 		function toggleList(t1,t2,t3){
	// 			t1.toggleClass('on');
	// 			t2.toggleClass('active');
	// 			t3.toggleClass('on_drop');
	// 		}			
	
	// 		$(".current_path").unbind("click").bind("click", function (e) {
	// 			e.preventDefault();
	// 			const dep_target = $(this).next("ul");
	// 			const dropArrow = $(this).find(".dropdown_arrow");		

	// 			if (dep_target.hasClass("on") ) {		
	// 				toggleList(dep_target, $(this), dropArrow);	
	// 				gsap.to(dep_target, { display: 'none', height: 0 });
	// 			} else {
	// 				removeTarget();
	// 				gsap.set($('.dep ul'), { display: 'none', height: 0 });
	// 				toggleList(dep_target, $(this), dropArrow);	
	// 				gsap.set(dep_target, { display: 'block' });
	// 				gsap.to(dep_target, { height: 'auto', duration: .5 });			
	// 			}
	// 		});
		
	// 		$(".breadcrumb").mouseleave(function () {			
	// 			removeTarget();	
	// 			gsap.to($('.current_path').next("ul"), { display: 'none', height: 0, duration: .3 });
	// 		});
	// 	}
	// });


		/*breadcrumb active*/
		$(function () {
			var sub_page = $(".sub_page");
			if (sub_page.length <= 0) return;
	
			var compare_1 = $('.sub_title_wrap h2').text();
			var compare_2 = $('.current_title_wrap h3').text();
			var list = $('.breadcrumb .dept_1 li');
	
	
			list.each(function (index, item) {		
				if ($(item).text() == compare_1) {
					$(item).children('a').addClass("active");
				} else if ($(item).text() == compare_2){
					$(item).children('a').addClass("active");
				}
			});	
	
		mo_breadcrumb();
		function mo_breadcrumb(){
			if (!$(".main_page").length <= 0) return;
			var text = $('.current_title_wrap h3').text();
			var target = $(".single_breadcrumb_text");
			target.text(text);
	
			$(window).resize(function (e) {
				var dep_target = $(".breadcrumb .dept_1");
				var win_width = $(this).outerWidth();
	
				if (win_width <= 1280) {	
					console.log("test")	
					if (dep_target.hasClass("on")) {
						gsap.set(".breadcrumb .dept_1.on", { display: 'block', height: 'auto', });
					} else {
						gsap.set(dep_target, { display: 'none', height: 0 });
					}	
	
				} else {
					dep_target.removeClass("on")
					dep_target.css({ display: "", height: "" });
				}
			});
	
			$(".mo_breadcrumb_btn").on("click", function(e){
				e.preventDefault();
				var dep_target = $(this).next(".dept_1");
				
	
				if(dep_target.hasClass("on")){
					dep_target.removeClass('on');
					gsap.to(dep_target, { display: 'none', height: 0 });
				}else{
					dep_target.addClass('on');
					gsap.set(dep_target, { display: 'block' });
					gsap.to(dep_target, { height: 'auto', direction: .2 });
				}
			});
		}
	
		});

	



	
	/**************************************/
	// tab
	/**************************************/
	$(function () {
		if ($(".tab_nav").length <= 0) return;
		var list_target = $(".tab_nav li a");

		list_target.on("click", function (e) {
			e.preventDefault();
			var content_target = "." + $(e.target).attr('href').substr(1);
			var con_target = $(".tab_scroll");
			var header_height = $(".header_wrap").outerHeight();

			$('html, body').stop().animate({ scrollTop: con_target.offset().top - header_height }, 500);

			if ($(".tab_con").hasClass("active")) {
				$(".tab_con").removeClass("active");
				$(content_target).addClass("active");
			} else {
				$(content_target).addClass("active");
			}
			$(".tab_nav li a").removeClass("active");
			$(this).addClass("active");
		});
	});


	/**************************************/
	// faq
	/**************************************/

	faq_board();
	function faq_board() {
		if (!$('#faq_board').length) return;
		$(".answer").hide();

		$(".questions").off().on("click", function (e) {
			e.preventDefault();

			if ($(this).hasClass("active")) {
				$(this).removeClass("active").attr("title", "답변펼치기");
				$(".answer").slideUp(300);
			} else {
				$(".questions").removeClass("active").attr("title", "답변펼치기").next().slideUp(300);
				$(this).addClass("active").attr("title", "답변접기").next().slideDown(300);
			}
		});
	}

/**************************************/
	// family_site
/**************************************/
	family_site();
	function family_site() {
		$(".family_site_wrap a").unbind("click").bind("click", function(){	
			if($(this).hasClass("active")){
				$(this).removeClass("active");
			}else{
				$(this).addClass("active");	
			}
		});
	
		$('.footer_wrap .wrap').on("mouseleave", function () {
			console.log(":aaa");
			$(".family_site_wrap a").removeClass("active");		
		});
	}


	// AOS.init({
	// 	offset: 200,
	// 	disable: 'mobile',
	// 	once: true,
	// });



/*end jquery */	
});
