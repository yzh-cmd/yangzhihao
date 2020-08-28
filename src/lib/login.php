<?php
    include "./base.php";
    //登录部分
    $name = $_REQUEST['username'];
    $pass = $_REQUEST['password'];

    $conn = mysqli_connect('localhost','root','root','music');

    $sql = "SELECT * FROM `user` WHERE `username` = '$name' AND `password` = '$pass'";
    $res = mysqli_query($conn,$sql);

    $ver = mysqli_fetch_assoc($res);

    if($ver){
        $arr = array('code'=>1,'text'=>'成功','data'=>array('un'=>$name));
        echo json_encode($arr);
    }else{
        $arr = array('code'=>0,'text'=>'失败');
        echo json_encode($arr);
    }

?>