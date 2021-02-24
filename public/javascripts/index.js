$().ready(function (){
    var imageUrl = '/images/background' + (Math.floor(Math.random() * 2) + 1) + '.jpg';
    $(".login-newbg").css("background-image", "url('" + imageUrl + "')") ;
}) ;