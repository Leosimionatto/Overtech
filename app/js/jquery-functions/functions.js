$(document).ready(function(){
  if($(window).width() <= 768){
    $("#computer-menu").css("display","none");
    $("#cell-phone-menu").css("display","block");
  }else{
    $("#cell-phone-menu").css("display","none");
    $("#computer-menu").css("display","block");
  }
  $("#messages").click(function(){
    if($(".message-system").css("display") == "block"){
      // $(".message-system").animate({width:'toggle'}, 400);
      $(".message-system").animate({"width":"0"}, 200);
      $(".message-system").css("display","none");
      $(".open-message-system").animate({"right":"0px"}, 200);
    }else{
      // $(".message-system").animate({width:'toggle'}, 400);
      $(".message-system").animate({"width":"350px"}, 180);
      $(".message-system").css("display","block");
      $(".open-message-system").animate({"right":"350px"}, 180);
    }
  });
  $('.message-system-body').on('mousewheel DOMMouseScroll', function(e) {
    var d = e.originalEvent.wheelDelta || -e.originalEvent.detail,
        dir = d > 0 ? 'up' : 'down',
        stop = (dir == 'up' && this.scrollTop == 0) ||
               (dir == 'down' && this.scrollTop == this.scrollHeight-this.offsetHeight);
    stop && e.preventDefault();
  });
  $('.conversation').on('mousewheel DOMMouseScroll', function(e) {
    var d = e.originalEvent.wheelDelta || -e.originalEvent.detail,
        dir = d > 0 ? 'up' : 'down',
        stop = (dir == 'up' && this.scrollTop == 0) ||
               (dir == 'down' && this.scrollTop == this.scrollHeight-this.offsetHeight);
    stop && e.preventDefault();
  });
});
$(window).resize(function(){
  var width = $(window).width();
  if(width <= 768){
    $("#computer-menu").css("display","none");
    $("#cell-phone-menu").css("display","block");
  }else{
    $("#cell-phone-menu").css("display","none");
    $("#computer-menu").css("display","block");
  }
});
