



//const menuToggler = (menuElement, ...otherMenus) => {
//  return function () {
//    menuElement.classList.toggle("open");
//    otherMenus.forEach(menu => {
//      menu.classList.remove("open");
//    });
//    closeAllDropdowns();
//  };
//};
//



const lnb = document.querySelector("#lnb");
const Lnb_lst = document.querySelector(".Lnb_lst li a");
const dropdownItems = document.querySelectorAll('.dropdown');

Lnb_lst.addEventListener('click', menuToggler(LNB2));
Lnb_lst.addEventListener('click', () => {
  leftMenu2.classList.toggle('active');
});

dropdownItems.forEach(item => {
 item.addEventListener('click', () => {
   item.classList.toggle('active');
 });
});

function closeAllDropdowns() {
 dropdownItems.forEach(item => {
   item.classList.remove('active');
 });
}






// 
// $(document).ready(function() {
//   const leftMenuCtr = $(".leftMenuCtr, .leftMenuIcon li a");
//   const leftMenu1 = $(".leftMenu1");
//   const leftMenu2 = $(".leftMenu2");
//   const leftMenuWrap = $(".leftMenuWrap");
//   const dropdown = $(".dropdown");

//   leftMenuCtr.on('click', function() {
//     menuToggler(leftMenu1, leftMenu2)();
//     leftMenuWrap.toggleClass('active');
//   });

//   dropdown.on('click', function() {
//     const isActive = $(this).hasClass('active');
//     dropdown.removeClass('active');
//     closeAllSubMenus();
    
//     if (!isActive) {
//       $(this).addClass('active');
//       openSubMenus($(this));
//     }
//   });

//   function closeAllDropdowns() {
//     dropdown.removeClass('active');
//     closeAllSubMenus();
//   }

//   function menuToggler(...menus) {
//     return function() {
//       menus.forEach(menu => {
//         if (menu.hasClass("close")) {
//           menu.removeClass("close").addClass("open");
//         } else {
//           menu.removeClass("open").addClass("close");
//         }
//       });
//     };
//   }

//   function closeAllSubMenus() {
//     $(".dropdownlist2.depth2, .dropdownlist3.depth3, .dropdownlist4.depth4").hide();
//   }

//   function openSubMenus(parentDropdown) {
//     const subMenus = parentDropdown.find(".dropdownlist2.depth2, .dropdownlist3.depth3, .dropdownlist4.depth4");
//     subMenus.show();
//   }

  // 초기에 dropdownlist2 depth2를 숨김
  // $(".dropdownlist2.depth2").hide();

  // depth2 메뉴를 클릭했을 때 depth3 메뉴 토글
  // $(".dropdownlist.depth2 > li > a").on('click', function(e) {
  //   e.preventDefault();
  //   const depth3Menu = $(this).siblings(".dropdownlist2.depth2");
  //   depth3Menu.toggle();
  // });

  // depth3 메뉴를 클릭했을 때 depth4 메뉴 토글
//   $(".dropdownlist2.depth2 > li > a").on('click', function(e) {
//     e.preventDefault();
//     const depth4Menu = $(this).siblings(".dropdownlist3.depth3");
//     depth4Menu.toggle();
//   });
// });








