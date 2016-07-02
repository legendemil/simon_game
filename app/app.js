var simon = (function() {
	var DOM = {
		simon 			: null,
		fields 			: null,
		currentField 	: null,
		menu 			: {
			screen 			: null,
			startBtn 		: null,
			strictBtn 		: null,
			switchBtn 		: null
		},
		audio 				: null
	};


	function cacheDOM() {
		DOM.simon 			= $('.simon');
		DOM.fields 			= $(DOM.simon).find('.field');
		DOM.menu.screen 	= $(DOM.simon).find('.simon-screen');
		DOM.menu.startBtn 	= $(DOM.simon).find('#btn-start');
		DOM.menu.strictBtn 	= $(DOM.simon).find('#btn-strict');
		DOM.menu.switchBtn 	= $(DOM.simon).find('.switch-btn-control');

		DOM.audio 			= document.querySelector('audio');
	}

	function bindEvents() {

	}
	
	function init() {
		cacheDOM();
		bindEvents();
	}

	init();

})();