$(function(){

    /**
     * function getQueryString
     * include /js/common.js
     */

    $('.xans-myshop-wishlistpaging ol a, .xans-myshop-wishlistpaging ol strong').each(function() {
        var sPage = $(this).text() ? $(this).text() : 1;


        if (sPage == ''+getQueryString('page')+'')
        {
            $(this).parent().html('<strong title="현재페이지">'+sPage+'</strong>');
        } else {
            var sHref = $(this).attr('href');
            $(this).parent().html('<a href="'+sHref+'" title="'+sPage+'페이지로 이동">'+sPage+'</a>');
        }
    });

   $('.btn_popup').click(function(){
       var sKey;
       
       try {
           sKey = this.href.match(/.*\/([^?#.]*)/)[1];
       } catch (e) {
           sKey = 'detail_popup';
       }
       
       window.open(this.href, sKey, 'scrollbars=0, resizeable=0, status=0, directories=0, toolbar=0');
       
       return false;
   });
});
