$(document).ready(function(){

    var sTitleImage = '/web/img/basic/sub_title/'+getKeyVisualImage();

    
    $('#key-visual')
        .html('<img src="'+sTitleImage+'" alt="서브 타이블 이미지"  />')
        .find('img').error(function() {
            $(this).unbind("error").attr('src', '/web/img/basic/sub_title/noImg.gif');
            //$(this).attr('src', '/web/img/basic/sub_title/noImg.gif').after(sTitleImage);
        });

    function getKeyVisualImage()
    {   
        var sPathName = window.location.pathname.replace(/\//ig, '_').substring(1);
        var aPathName = sPathName.split('.');
        var sImageName = aPathName[0];
            
        var sCateNo   = getQueryString('cate_no');
    
        if (sCateNo) {
            sImageName = sImageName+'_'+sCateNo;
        }   
        return sImageName+'.jpg';
    }

});
