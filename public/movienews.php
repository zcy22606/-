<?php 
    header("Content-type:text/html;charset=utf-8");
    $pageNum = $_GET["pageNum"];

    $responseData = array("code" => 0, "message" => "");

    // if(!$pageNum){
    //     $responseData["code"] = 1;
    //     $responseData["message"] = "请求失败";
    //     echo json_encode($responseData);
    //     exit;
    // }

    $link = mysql_connect("localhost","root","123456");

    if(!$link){
        // echo "链接失败";
		$responseData["code"] = 2;
		$responseData["message"] = "数据库链接失败!";
		echo json_encode($responseData);
		exit;
    }

    mysql_set_charset("utf8");
    mysql_select_db("movie");

    $str = md5(md5(md5(md5($password)."qqq")."yyy")."jjj");
    if(!$pageNum){
        $sql = "SELECT * FROM movienews LIMIT  $pageNum, 10";
    }else{
        $sql = "SELECT * FROM movienews LIMIT  $pageNum * 10, 10";
    }
    
    $res = mysql_query($sql);

    $row = mysql_fetch_assoc($res);

    if(!$row){
        $responseData["code"] = 3;
        $responseData["message"] = "用户名或密码错误";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["message"] = "登陆成功";
        echo json_encode($responseData);
    }

    mysql_close($link);

?>