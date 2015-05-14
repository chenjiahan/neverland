/*
 *  Ajax获取blog content
 */
$(document).ready(function(){
  //获取url中的name
  var name = window.location.href.substr(28);
  $.ajax({
    url: '../blog.php',
    type: 'GET',
    dataType: 'json',
    data: {type: 'blog_content',name: name},
    success: function (data){
      var obj = eval(data);
      //隐藏loading
      $('.loader-spinDisc').remove();
      //载入head背景图
      if ($(window).width() > 768 ) {
        $('.head-content').css('background','url(' + obj[0].cover_big + ') no-repeat center');
        $('.head-content').css('background-size','cover');
      } else {
        $('.head-content').css('background','url(' + obj[0].cover_small + ') no-repeat center');
        $('.head-content').css('background-size','cover');
      }
      //加载blog内容
      document.title= obj[0].blog_title + ' - Neverland';
      $('#head-name').html(obj[0].blog_title);
      $('#blog-main-body').append(obj[0].blog_content);
      $('.blog-time').html(obj[0].blog_date);
      //加载前后blog链接
      var relate_blog = '';
      if ( obj[0].next_name == null ) {
        relate_blog += '<div class="col-xs-6 blog-pre"><a href="http://www.neverl.com/blogs/'
        relate_blog += obj[0].prev_name;
        relate_blog += '">';
        relate_blog += obj[0].prev_title;
        relate_blog += '</a></div>';
        $('.blog-body').append(relate_blog);
      } else if ( obj[0].prev_name == null ) {
        relate_blog += '<div class="col-xs-6 col-xs-offset-6 blog-next"><a href="http://www.neverl.com/blogs/'
        relate_blog += obj[0].next_name;
        relate_blog += '">';
        relate_blog += obj[0].next_title;
        relate_blog += '</a></div>';
        $('.blog-body').append(relate_blog);
      } else {
        relate_blog += '<div class="col-xs-6 blog-pre"><a href="http://www.neverl.com/blogs/'
        relate_blog += obj[0].prev_name;
        relate_blog += '">';
        relate_blog += obj[0].prev_title;
        relate_blog += '</a></div>';
        relate_blog += '<div class="col-xs-6 blog-next"><a href="http://www.neverl.com/blogs/'
        relate_blog += obj[0].next_name;
        relate_blog += '">';
        relate_blog += obj[0].next_title;
        relate_blog += '</a></div>';
        $('.blog-body').append(relate_blog);
      }
      //载入多说评论框
      var ds = document.createElement('div');
      ds.setAttribute('data-thread-key', obj[0].blog_name);
      ds.setAttribute('data-url', "http://www.neverl.com/blogs.html?name=" + obj[0].blog_content);
      DUOSHUO.EmbedThread(ds);
      $('.blog-body').append(ds);
    }
  })
});