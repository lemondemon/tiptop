;(function(root){

	/* todo: 	
	 *
	 *	add some indline styles instead of in file
	 *	tip width option
	 */

	var _defaults = {
			position: 'tc',	
			hoffset: 0,
			voffset:  0,
			dotSize: 10,
			hoverSize: 30
		},
		_visible = true,
		_options = {}
		_tiptops = [],
		_popupWidth = 200,
		Tiptop = function(){};

	Tiptop.prototype._extend = function(params) {
		params = params || {};

		for (var i = 1; i < arguments.length; i++) {
			if (!arguments[i])
				continue;

			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key))
					params[key] = arguments[i][key];
			}
		}

		return params;
	};

	Tiptop.prototype._createTiptops = function() {
		
		var me = this;

		for (tip in _tiptops) {

			var	ele = document.querySelector(_tiptops[tip].selector),
				positions = me._calculateTipAndPopupPosition(ele, _tiptops[tip]),
				hoverSize = _tiptops[tip].hoverSize,
				dotSize = _tiptops[tip].dotSize,
				hoverPos = -0.5 * (_tiptops[tip].hoverSize - _tiptops[tip].dotSize),
				htmlTemplate = me._prepareHtmlTemplate(_tiptops[tip].title, _tiptops[tip].text, positions, dotSize, hoverSize, hoverPos);

			ele.style.position = 'relative';

			// TODO: remove empty parent div
			var temp = document.createElement('div');
			temp.innerHTML = htmlTemplate;

			ele.insertBefore(temp, ele.firstChild);

		}
	};

	Tiptop.prototype._prepareHtmlTemplate = function(title, text, positions, dotSize, hoverSize, hoverPos) {

		var directions = ['top', 'right', 'bottom', 'left'],
			popupPositionStyles = '';


		directions.forEach(function(direction) {

			if (positions.popup[direction]) {
				popupPositionStyles += ( direction + ': ' + positions.popup[direction] + 'px; ');
			}

		});
		
		return '<div class="tiptop" style="width: ' + dotSize + 'px; height: ' + dotSize + 'px; top: ' + positions.top + 'px; left: '+ positions.left +'px">' +
					'<div class="tiptopPopup tiptopPopupDirection' + positions.popup.popupDirection + '" style="' + popupPositionStyles + '">' +
						'<div class="title">' + title + '</div>' + 
						'<div class="text">' + text + '</div>' +
					'</div>' + 
					'<div class="tiptopHover" style="width: '+ hoverSize +'px; height: '+ hoverSize +'px; top: '+ hoverPos +'px; left: '+ hoverPos +'px;">' + 
					'</div>' +

				'</div>';
	};

	Tiptop.prototype._getDocumentHeight = function() {
	    var d = document;
	    return Math.max(
	        d.body.scrollHeight, d.documentElement.scrollHeight,
	        d.body.offsetHeight, d.documentElement.offsetHeight,
	        d.body.clientHeight, d.documentElement.clientHeight
	    );
	};

	Tiptop.prototype._getDocumentWidth = function() {
		var d = document;
	    return Math.max(
	        d.body.scrollWidth, d.documentElement.scrollWidth,
	        d.body.offsetWidth, d.documentElement.offsetWidth,
	        d.body.clientWidth, d.documentElement.clientWidth
	    );
	},

	Tiptop.prototype._checkPopupDirection = function(ele, direction) {

		var documentHeight = this._getDocumentHeight(),
			documentWidth = this._getDocumentWidth();

		switch (direction) {

			case 't':
				if (ele.offsetTop < 120 ) {
					direction = 'b';
				}
			break;

			case 'b':
				if (documentHeight - ele.offsetTop < 120 ) {
					direction = 't';
				}	
			break;

			case 'l':
				if (ele.offsetLeft < 280) {
					direction = 'r';
				}
			break;

			case 'r':
				if (documentWidth - (ele.offsetLeft + ele.offsetWidth) < 280) {
					direction = 'l';
				}
			break;
		}

		return direction;
	};

	Tiptop.prototype._calculatePopupPosition = function(dotSize, direction) {

		var position = {};

		switch (direction) {

			case 't':
				position.bottom =  10 + dotSize;
				position.left = (_popupWidth - dotSize) / -2;
			break;

			case 'b':
				position.top = 10 + dotSize;
				position.left = (_popupWidth - dotSize) / -2;
			break;

			case 'l':
				position.top = dotSize - (20 + dotSize/2);
				position.right = 10 + dotSize;
			break;

			case 'r':
				position.top = dotSize - (20 + dotSize/2);
				position.left = 10 + dotSize;
			break;
		}

		position.popupDirection = direction;

		return position;
	};

	Tiptop.prototype._calculateTipAndPopupPosition = function(ele, eleOptions) {

		var me = this,
			top, left, popupDirection, popupPosition;

		switch (eleOptions.position) {

			case 'tl': 
				top = 0 - eleOptions.voffset;
				left = 0 - eleOptions.hoffset;
				popupDirection = me._checkPopupDirection(ele, 't');
			break;

			case 'tc':
				top = 0 - eleOptions.voffset;
				left = ele.offsetWidth / 2;
				popupDirection = me._checkPopupDirection(ele, 't');
			break;

			case 'tr':
				top = 0 - eleOptions.voffset;
				left = ele.offsetWidth + eleOptions.hoffset;
				popupDirection = me._checkPopupDirection(ele, 't');
			break;

			case 'cl':
				top = ele.offsetHeight / 2 ;
				left = 0 - eleOptions.hoffset;
				popupDirection = me._checkPopupDirection(ele, 'l');
			break;

			case 'cr':
				top = ele.offsetHeight / 2;
				left = ele.offsetWidth + eleOptions.hoffset;
				popupDirection = me._checkPopupDirection(ele, 'r');
			break;

			case 'bl':
				top = ele.offsetHeight + eleOptions.voffset;
				left = 0 - eleOptions.hoffset;
				popupDirection = me._checkPopupDirection(ele, 'b');
			break;

			case 'bc':
				top = ele.offsetHeight + eleOptions.voffset;
				left = ele.offsetWidth / 2;
				popupDirection = me._checkPopupDirection(ele, 'b');
			break;

			case 'br':
				top = ele.offsetHeight + eleOptions.voffset;
				left = ele.offsetWidth + eleOptions.hoffset;
				popupDirection = me._checkPopupDirection(ele, 'b');
			break;

			default:
				top = ele.offsetHeight / 2;
				left = ele.offsetWidth / 2;
				popupDirection = me._checkPopupDirection(ele, 't');
			break;
		}


		popupPosition = me._calculatePopupPosition(eleOptions.dotSize, popupDirection);

		return {
			top: top - eleOptions.dotSize / 2,
			left: left - eleOptions.dotSize / 2,
			popup: popupPosition 
		}

	};

	Tiptop.prototype.init = function(params) {
		var me = this;

		// extend default options with user global options
		if (params.options) {
			_options = me._extend({}, _defaults, params.options);	
		}

		// extend each tip options with default options
		if (params.tips) {
			var temptip = {};
			for (tip in params.tips) {
				temptip = me._extend({}, _options, params.tips[tip]);
				temptip.selector = tip;
				_tiptops.push(temptip);
			}
			console.log('tiptops', _tiptops);
		}

		me._createTiptops();
	};	

	Tiptop.prototype.show = function() {

		if (!_visible) {
			var tips = document.querySelectorAll('.tiptop'),
				tipsLength = tips.length; 

			for (var i = 0; i < tipsLength; i++) {
				tips[i].style.display = '';
			}

			_visible = true;	
		}
	};

	Tiptop.prototype.hide = function() {

		if (_visible) {
			var tips = document.querySelectorAll('.tiptop'),
				tipsLength = tips.length;

			for (var i = 0; i < tipsLength; i++) {
				tips[i].style.display = 'none';
			}

			_visible = false;	
		}
	};

	Tiptop.prototype.toggle = function() {
		var me = this;

		if (_visible) {
			me.hide();
		} else {
			me.show();
		}
	};
	
	if (typeof define === 'function' && define.amd) {
        define('tiptop', [], function() {
            return new Tiptop();
        });
    } else if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = new Tiptop();
    } else {
        root.tiptop = new Tiptop();
    }

})(window);