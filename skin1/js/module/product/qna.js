/**
 * 상품 상세 Q&A
 */
$(document).ready(function(){
    $('.xans-product-qna a').click(function(e) {
        e.preventDefault();
        QNA.getReadData($(this));
    });
});

var PARENT = '';

var OPEN_QNA = '';

var QNA = {
    getReadData : function(obj)
    {
        if (obj != undefined) {
            PARENT = obj;
            var sHref = obj.attr('href');
            var pNode = obj.parents('tr');
            var pass_check = '&pass_check=F';
        } else {
            var sHref = PARENT.attr('href');
            var pNode = PARENT.parents('tr');
            var pass_check = '&pass_check=T';
        }
       
        var sQuery = sHref.split('?');
        
        var sQueryNo = sQuery[1].split('=');
        if (OPEN_QNA == sQueryNo[1]) {
            $('#product-qna-read').remove();
            OPEN_QNA = '';
            return false;
        } else {
            OPEN_QNA = sQueryNo[1];
        }
        
        $.ajax({
            url : '/exec/front/board/product/6?'+sQuery[1]+pass_check,
            dataType: 'json',
            success: function(data) {
                $('#product-qna-read').remove();
                var aHtml = [];
                
                if (data.is_secret == true) {
                    // 비밀글 비밀번호 입력 폼
                    aHtml.push('<form name="SecretForm_6" id="SecretForm_6">');
                    aHtml.push('    <input type="text" name="a" style="display:none;">');
                    aHtml.push('    <div class="contArea"><p>비밀번호 <input type="password" id="secure_password" name="secure_password" onkeydown="if (event.keyCode == 13) '+data.action_pass_submit+'"> <input type="button" value="확인" onclick="'+data.action_pass_submit+'"></p></div>');
                    aHtml.push('</form>');
                } else {
                    // 글 내용
                    if (data.read['content_image'] != null) {
                        var sImg = data.read['content_image'];
                    } else {
                        var sImg = '';
                    }

                    aHtml.push('<div class="contArea"><p>'+data.read['content']+'</p><p>'+sImg+'</p></div>');
					aHtml.push('<p class="btnArea"><a href="/board/product/modify.html? board_act=edit&no='+data.no+'&board_no=6&link_product_no='+getQueryString ('product_no')+'"><!--Edit--></a></p>');
                    
                    // 댓글리스트
                    if (data.comment != undefined) {
                        aHtml.push('<table summary="상품의 사용후기 리플 입니다." class="boardReplyList">');
                        aHtml.push('<caption>상품의 사용후기 리플</caption>');
                        aHtml.push('<thead>');
                        aHtml.push('<tr>');
                        aHtml.push(' <th scope="col" class="name">이름</th>');
                        aHtml.push(' <th scope="col" class="subject">내용</th>');
                        aHtml.push(' <th scope="col" class="date">날짜</th>');
                        aHtml.push(' <th scope="col" class="grade '+data.use_point+'">평점</th>');
                        aHtml.push('</tr>');
                        aHtml.push('</thead>');
    
                        aHtml.push('<tbody>');
                        for (var i=0; data.comment.length > i; i++) {
                            aHtml.push('<tr>');
                            aHtml.push('    <td class="name">'+data.comment[i]['member_icon']+' '+data.comment[i]['comment_name']+'</td>');
                            aHtml.push('    <td class="subject">'+data.comment[i]['comment_content']+'</td>');
                            aHtml.push('    <td class="date">'+data.comment[i]['comment_write_date']+'</td>');
                            aHtml.push('    <td class="grade '+data.use_point+'"><img src="http://img.echosting.cafe24.com/design/skin/mono/ico_point'+data.comment[i]['comment_point_count']+'.gif" alt="'+data.comment[i]['comment_point_count']+'점" /></td>');
                            aHtml.push('</tr>');
                        }
                        aHtml.push('</table>');
                    }
                    
                    // 댓글쓰기
                    if (data.comment_write != undefined) {
                        aHtml.push('<form name="commentWriteForm_6" id="commentWriteForm_6">');
                        aHtml.push('    <div class="memoCont">');
                        aHtml.push('    <div class="writer">');
                        aHtml.push('        <p class="user"><span class="nameArea">Name '+data.comment_write['comment_name']+' Password '+data.comment_write['comment_password']+'</span>');
                        aHtml.push('        '+data.comment_write['comment']+'<a href="#none" onclick="'+data.comment_write['action_comment_insert']+'"><img src="/test/images/btn_comment_write.jpg" title="Write" /></a></p>');
                        aHtml.push('        <p class="rating '+data.comment_write['use_point']+'">'+data.comment_write['comment_point']+'</p>');
                        aHtml.push('        <p class="text '+data.comment_write['use_comment_size']+'">'+data.comment_write['comment_byte']+' / '+data.comment_write['comment_size']+' byte</p>');
                        aHtml.push('        <p class="captcha '+data.comment_write['use_captcha']+'">'+data.comment_write['captcha_image']+'<br />'+data.comment_write['captcha']+'* 왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p>');
                        aHtml.push('    </div>');
                        aHtml.push('</div>');
                        aHtml.push('</form>');
                    }
                }
                
                $(pNode).after('<tr id="product-qna-read"><td colspan="6" align="left">'+aHtml.join('')+'</td></tr>');
                
                if (data.comment_write != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(6);
            }
        });
    },
    
    END : function() {}
};
