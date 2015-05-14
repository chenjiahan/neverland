$(document).ready(function(){
  /*
   *  swiper控件
   *  初始化并设置相关属性
   */
  var workSwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable :true,
    speed: 200,
    grabCursor : true
  });

  /*
   *  work中点击跳转至swiper
   *  PC端滚动至swiper顶部
   *  移动端减去60px的导航栏长度
   */
  $("#jump-to-swiper").click(function(){
    if ( $(window).width() > 768 ) {
      $("html,body").animate({scrollTop:$(".sec-swiper").offset().top},400);
    } else {
      $("html,body").animate({scrollTop:$(".sec-swiper").offset().top-60},400);
    }
  });

  /*
   *  页面加载后刷新swiper
   *  窗口大小改变时，刷新swiper
   */
  resizeSwiper();
  $(window).resize(function() {
    resizeSwiper();
  });
});

/*
 *  刷新swiper
 *  swiper高度变化，屏幕宽度大于768时，最小高度为630,否则为360
 */
function resizeSwiper() {
  var swiper_div = $(".swiper-slide .work-sec");
  var win_height = $(window).height()-140;
  var win_width = $(window).width();
  if ( win_width >768 ) {
    swiper_div.height(Math.max(win_height,630));
  } else {
    swiper_div.height(Math.max(win_height,360)) ;
  }
}
