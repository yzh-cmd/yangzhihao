<?php
    include './base.php';

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $conn = mysqli_connect('localhost','root','root','music');

    $sql = "SELECT * FROM `user` WHERE `username`='$username'";
    $res = mysqli_query($conn,$sql);

    $ver = mysqli_fetch_assoc($res);

    if(!$ver){
        $sql = "INSERT INTO `user` (`username`, `password`) VALUES('$username', '$password')";
        $res = mysqli_query($conn,$sql);
        $arr = array('code'=>1,'text'=>"成功");
        echo json_encode($arr,true);
    }else{
        $arr = array('code'=>0,'msg'=>"失败");
        echo json_encode($arr,true);
    }
    
?>
