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
		isSound 			= false,
		isStart 			= false;

	
	function runGame() {
		console.log('started');
	}

	function stopGame() {
		console.log('stopped');
	}

	
	function handleStartGame(ev) {
		var btn = ev.target;
		$(btn).toggleClass('clicked');

		if(!isStart) 
			runGame();	
		else 
			stopGame();
		
		isStart = !isStart;
	}

	function handleStrictMode(ev){
		var btn = ev.target;
		$(btn).toggleClass('clicked');
		isStrict = !isStrict;
	}

	function handleSoundChange(ev) {
		var btn = ev.target;
		$(btn).toggleClass('switched');
		isSound = !isSound;
	}


	function cacheDOM() {
		DOM.simon 			= $('.simon');
		DOM.fields 			= $(DOM.simon).find('.field');
		DOM.menu.screen 	= $(DOM.simon).find('.simon-screen');
		DOM.menu.startBtn 	= $(DOM.simon).find('#btn-start');
		DOM.menu.strictBtn 	= $(DOM.simon).find('#btn-strict');
		DOM.menu.switchBtn 	= $(DOM.simon).find('.switch-btn-control');
	}

	function bindEvents() {
		DOM.menu.startBtn.on('click', handleStartGame);
		DOM.menu.strictBtn.on('click', handleStrictMode);
		DOM.menu.switchBtn.on('click', handleSoundChange);
	}
	
	function init() {
		cacheDOM();
		bindEvents();
	}

	init();

})();