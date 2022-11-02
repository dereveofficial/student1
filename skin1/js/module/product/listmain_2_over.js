$(document).ready(function(){
	var _total = 0, _go = 1, _current = 4, _interval = {};

	_total = $('.xans-product-2 ul li').size();

	_interval = setInterval(loop, 5000);

	$('.xans-product-2 .prev').click(function(e) {
		e.preventDefault();
		_go = -1;
		change();
	});

	$('.xans-product-2 .next').click(function(e) {
		e.preventDefault();
		_go = 1;
		change();
	});

	function change() {
		clearInterval(_interval);
		_interval = setInterval(loop, 5000);
		loop();
	}

	function loop() {
		if(_go == 1) (_current == _total) ? _current = 4 : _current++;
		else (_current == 4) ? _current = _total : _current--;

		$('.xans-product-2 ul').animate({'left' : '-' + ((_current - 4) * 186) + 'px'}, 300);
	}
});