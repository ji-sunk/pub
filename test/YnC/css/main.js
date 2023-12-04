//LNB 여닫기
$(".lnb_btn").on("click",onLnbToggle);
$(".folded_btn").on("click",function(){
    $(".lnb_btn").trigger("click");
});

$("#contents_wrap, .all_wrap > header").on("click",function(){
    onLnbClose();
});

function onLnbToggle(){
    $(".lnb").toggleClass('off', 300);
    $(".lnb_btn").toggleClass('btn_hidden', 300);
    $(".folded_btn").toggleClass('back', 300);
};

function onLnbClose(){
    $(".lnb").addClass('off', 300);
    $(".lnb_btn").addClass('btn_hidden', 300);
    $(".folded_btn").addClass('back', 300);
}

//LNB 메뉴 slideToggle
$('.toggle').click(function(e) {
      //e.preventDefault();
    var $this = $(this);
  
    if ($this.next().hasClass('show')) { //클릭한 a의 하위메뉴 ul에 show가 있는경우
        $this.next().removeClass('show');
        $this.removeClass("on");
        $this.next().slideUp(350);
    } else { 							//클릭한 a의 하위메뉴 ul에 show가 없는경우
        $this.parent().parent().find('li .inner').removeClass('show'); //일단 모든 ul show class제거
        $this.parent().parent().find('li .inner').slideUp(350); //모든 ul slide up
        $this.parent().parent().find('a').removeClass('on'); //미 선택 depth2 지우기
        $this.parent().parent().prev('.depth_2 a').removeClass('on'); //선택 상위 depth2 지우기
        $this.addClass("on");
        $this.next().toggleClass('show'); //클릭한 a의 하위메뉴 ul에 show class Toggle
        $this.next().slideToggle(350); //클릭한 a의 하위메뉴 ul에 slideToggle
    }
});


