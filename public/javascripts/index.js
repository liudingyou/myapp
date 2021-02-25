function login(){
    var userName = $.trim($("#userName").val()) ;
    var password = $.trim($("#password").val()) ;

    var errMsg ;
    if(userName == null || userName == ""){
        errMsg = "请输入账户名" ;
        $(".login-error-msg").html(errMsg) ;
        $("#login-error").css("display", "block") ;
        $("#userName").focus();
        return false ;
    }else if(password == null || password == ""){
        errMsg = "请输入密码" ;
        $(".login-error-msg").html(errMsg) ;
        $("#login-error").css("display", "block") ;
        $("#password").focus();
        return false ;
    }else{
        $(".login-error-msg").html("") ;
        $("#login-error").css("display", "none") ;

        $.ajax({
            url:'/catalog/user/login',
            data:$("#login-form").serialize(),
            type:'POST',
            dataType:'',
            success:function (data){
                if(data.sucFlag == 0){
                    errMsg = "账户已禁用" ;
                    $(".login-error-msg").html(errMsg) ;
                    $("#login-error").css("display", "block") ;
                    return false ;
                }else if(data.sucFlag == 2){
                    errMsg = "登录名或登录密码不正确" ;
                    $(".login-error-msg").html(errMsg) ;
                    $("#login-error").css("display", "block") ;
                    return false ;
                }else{
                    $(location).attr('href', '/catalog/user/home') ;
                } ;
            },
            error:function (data){
                errMsg = "系统异常" ;
                $(".login-error-msg").html(errMsg) ;
                $("#login-error").css("display", "block") ;
                return false ;
            }
        }) ;
    }
}

$().ready(function (){
    var imageUrl = '/images/background' + (Math.floor(Math.random() * 2) + 1) + '.jpg';
    $(".login-newbg").css("background-image", "url('" + imageUrl + "')") ;

    $("#userName").bind('keydown', function(event){
        if(event.keyCode == '13'){
            login();
        }
    }) ;

    $("#password").bind('keydown', function(event){
        if(event.keyCode == '13'){
            login();
        }
    }) ;

    //登陆表单提交事件
    $("#loginButton").click(login);
}) ;