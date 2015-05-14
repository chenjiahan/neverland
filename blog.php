<?php

$type = $_GET["type"];
$mysql = new SaeMysql();

if ($type == 'blog_list') {
  //获取blog总数
  $sql_num = "select count(*) from Blog";
  $num = $mysql->getData($sql_num);
  $num = $num[0]['count(*)'];
  $page = $_GET["page"];
  if ($num >= $page * 6) {
    $start = ( $page - 1 ) * 6;
    $sql = "SELECT blog_id,blog_name,blog_title,blog_des,blog_date,cover_box FROM Blog order by blog_id desc LIMIT ".$start.",6";
    $data = $mysql->getData($sql);
    $data[0][success] = 1;
  }
  else if ($num < $page * 6 && $num > ( $page - 1 ) * 6) {
    $start = ( $page - 1 ) * 6;
    $jump = $num - $start;
    $sql = "SELECT blog_id,blog_name,blog_title,blog_des,blog_date,cover_box FROM Blog order by blog_id desc LIMIT ".$start.",".$jump;
    $data = $mysql->getData($sql);
    $data[0][success] = 2;
  }
  else {
    $data[0][success] = 0;
  }
  echo json_encode($data);
}
else if  ($type == 'blog_content') {
  $name = $_GET["name"];
  //读取当前blog数据
  $sql = "SELECT * FROM Blog WHERE blog_name='".$name."'";
  $data = $mysql->getData($sql);

  //读取前后blog数据
  $sql_id = "SELECT max(blog_id) FROM Blog";
  $max_id = $mysql->getData($sql_id);
  if ($data[0][blog_id] < $max_id[0]['max(blog_id)']) {
    $prev_id = $data[0][blog_id] + 1;
    $sql_prev = "SELECT blog_name,blog_title FROM Blog WHERE blog_id='".$prev_id."'";
    $prev_data = $mysql->getData($sql_prev);
    $data[0][prev_name] = $prev_data[0][blog_name];
    $data[0][prev_title] = $prev_data[0][blog_title];
  }
  if ( $data[0][blog_id] > 1 ) {
    $next_id = $data[0][blog_id] - 1;
    $sql_next = "SELECT blog_name,blog_title FROM Blog WHERE blog_id='".$next_id."'";
    $next_data = $mysql->getData($sql_next);
    $data[0][next_name] = $next_data[0][blog_name];
    $data[0][next_title] = $next_data[0][blog_title];
  }
  //返回json数据
  echo json_encode($data);
}