<?php
    include "./base.php";
  //验证部分
  $name1 = $_REQUEST['username'];

  $conn1 = mysqli_connect('localhost','root','root','music');

  $sql1 = "SELECT * FROM `user` WHERE `username` = '$name1'";
  $res1 = mysqli_query($conn1,$sql1);

  $ver1 = mysqli_fetch_assoc($res1);

  if(!$ver1){
        $arr = array('code'=>1,'text'=>'成功');
        echo json_encode($arr);
  }else{
      $arr = array('code'=>0,'msg'=>'失败');
      echo json_encode($arr);
  }
?>