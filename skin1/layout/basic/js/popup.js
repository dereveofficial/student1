/**
 * 팝업창에 리사이즈 관련
 */

function setResizePopup() {
	var iWrapWidth    = $('.layPop').width();	
	var iWrapHeight   = $('.layPop').height();

	var iWindowWidth  = $(window).width();
	var iWindowHeight = $(window).height();

	window.resizeBy(iWrapWidth - iWindowWidth, iWrapHeight - iWindowHeight+20); 
}
setResizePopup();
