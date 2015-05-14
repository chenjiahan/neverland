$(document).ready(function(){
  /*
   *  加载blog box
   *  默认加载第一页内容
   *  每次点击加载按钮，加载下一页
   */
  var nowPage = 1;
  getBlogBox(nowPage);
  $('#add-more').click(function(){
    $('#add-more').hide();
    $('.loader-snake').show();
    nowPage++;
    getBlogBox(nowPage);
  });
});

/*
 *  Ajax获取blog box内容
 */
function getBlogBox(page) {
  $.ajax({
    url: '../blog.php',
    type: 'GET',
    dataType: 'json',
    data: {type: 'blog_list', page: page},
    success: function (data) {
      var obj = eval(data);
      //第一次载入 隐藏loading-spinDisc
      if ( page === 1) {
        $('.loader-spinDisc').remove();
        $('.loader-padding').remove();
      }
      if ( obj[0].success ==  0 ) {
        $('#no-more').show();
        $('.loader-snake').hide();
      }
      else {
        for (var i = 0; i < obj.length; i++) {
          var blog_box = "";
          blog_box += '<div class="col-md-6"> <div class="blog-box"> <div class="img-box"><a href="http://www.neverl.com/blogs/';
          blog_box += obj[i].blog_name;
          blog_box += '"><img src="';
          blog_box += obj[i].cover_box;
          blog_box += '"  class="blog-cover" alt="';
          blog_box += obj[i].blog_title;
          blog_box += '"></a></div> <h3 class="box-title"><a href="http://www.neverl.com/blogs/';
          blog_box += obj[i].blog_name;
          blog_box += '">';
          blog_box += obj[i].blog_title;
          blog_box += '</a></h3><p>';
          blog_box += obj[i].blog_des;
          blog_box += '</p> <span class="blog-date">';
          blog_box += obj[i].blog_date;
          blog_box += '</span> </div> </div>';
          $('#blog-row').append(blog_box);
        }
        $('#add-more').show();
        $('.loader-snake').hide();
      }
    }
  });
}