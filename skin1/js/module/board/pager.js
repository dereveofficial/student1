$(document).ready(function(){
    // 게시판 리스트
    $('.xans-board-paging ol a, .xans-board-paging ol strong').each(function() {
        PAGER.setPaging($(this), getQueryString('page'));
    });
    
    // 댓글 리스트
    $('.xans-board-commentpaging ol a, .xans-board-commentpaging ol strong').each(function() {
        PAGER.setPaging($(this), getQueryString('c_page'));
    });
    
    // 마이 게시물 리스트
    $('.xans-myshop-boardlistpaging ol a, .xans-myshop-boardlistpaging ol strong').each(function() {
        PAGER.setPaging($(this), getQueryString('page'));
    });
});

var PAGER = {
    /**
     * 페이징
     */
    setPaging : function(obj, sNowPage)
    {
        var sPage = (obj.text() != '')? obj.text() : 1;

        if (sNowPage == undefined) sNowPage = 1;

        if (sPage == ''+sNowPage+'')
        {            
            obj.parent().html('<strong title="현재페이지">'+sPage+'</strong>');
        } else {
            var sHref = obj.attr('href');
            obj.parent().html('<a href="'+sHref+'" title="'+sPage+' 페이지로 이동">'+sPage+'</a>');
        }
    }
};
