$(document).ready(function(){

  /*
   *  返回顶部按钮
   *  滚动条的位置处于距顶部100像素以下时，显示按钮
   *  点击按钮后，回到页面顶部位置
   */
  var toTop = $("#to-top");
  $(window).scroll(function(){
    if ($(window).scrollTop()>100){
      toTop.fadeIn();
    } else {
      toTop.fadeOut();
    }
    /*if ( document.getElementById("rwd").offsetTop < ($(window).scrollTop()+$(window).height())) {
      $('.rwd-pic').fadeIn(1000);
    }*/
  });
  toTop.click(function(){
    $('body,html').animate({scrollTop:0},500);
    return false;
  });

  /*
   *  微信图片
   *  鼠标经过按钮时显示图片
   */
  var weixin_box = $(".weixin-box");
  var img_weixin = $(".img-weixin");
  img_weixin.mouseover(function() {
    weixin_box.fadeIn(300);
  });
  img_weixin.mouseout(function() {
    weixin_box.fadeOut(300);
  });

  /*
   *  Home页面
   *  点击标签跳至相应位置
   *  移动端减去60px的导航栏长度
   */
  $(".to-rwd").click(function(){
    if ( $(window).width() > 768 ) {
      $("html,body").animate({scrollTop:$(".rwd").offset().top},400);
    } else {
      $("html,body").animate({scrollTop:$(".rwd").offset().top-60},400);
    }
  });
});