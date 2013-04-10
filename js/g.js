(function($){
    $('nav.fixnav').bind('mouseover',function(){
        $('nav.fixnav .navitem').removeClass('hide');
    }).bind('mouseout',function(){
        $('nav.fixnav .navitem').addClass('hide');
    });
})(jQuery)
