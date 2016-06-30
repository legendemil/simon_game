var simon = (function() {
	var DOM = {
		simon 			: null,
		fields 			: null,
		menu 			: {
			screen 			: null,
			startBtn 		: null,
			strictBtn 		: null,
			switchBtn 		: null
		}
	};

	var moves 				= [],
		userMoves 			= [],
		movesCount 			= 0,
		isStrict 			= false,
		isSound 			= false;


	function cacheDOM() {
		DOM.simon 			= $('.simon');
		DOM.fields 			= $(DOM.simon).find('.field');
		DOM.menu.screen 	= $(DOM.simon).find('.simon-screen');
		DOM.menu.startBtn 	= $(DOM.simon).find('#btn-start');
		DOM.menu.strictBtn 	= $(DOM.simon).find('#btn-strict');
		DOM.menu.switchBtn 	= $(DOM.simon).find('.switch-btn-control');
	}

	function bindEvents() {
		
	}
	
	function init() {
		cacheDOM();
		bindEvents();
	}

	init();

})();