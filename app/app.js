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

	var moves 				= [],
		userMoves 			= [],
		movesCount 			= 0,
		currentMovesCount 	= 0,
		isStrict 			= false,
		isSound 			= false,
		isStart 			= false,
		isUserTurn 			= false;
	

	
	function runGame() {
		console.log('started')
		runRound();
	}

	function makeMove(field){
		var query 			= '[data-value=' + field + ']';
		DOM.currentField 	= DOM.fields.closest(query);
		moves.push(field);
		startSound(field);
		DOM.currentField.addClass('active');
		movesCount++;
	}

	function runRound() {
		var newField = randomField();
		currentMovesCount = 0;
		

		moves.forEach(function (field) {
			startSound(field);
		});
		makeMove(newField);
	}

	function startSound(field) {
		var url 			= 'https://s3.amazonaws.com/freecodecamp/simonSound' + field + '.mp3';
		var query 			= '[data-value=' + field + ']';

		DOM.currentField = DOM.fields.closest(query);
		DOM.currentField.addClass('active');
		DOM.audio.querySelector('source').src = url;
		DOM.audio.load();
		DOM.audio.play();
	}

	function randomField() {
		return Math.floor( Math.random() * 4 ) + 1;
	}

	function startUserMove() {
		currentMovesCount = 0;
		isUserTurn = true;
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

	function handleSoundEnd(ev) {
		DOM.fields.removeClass('active');
		if(!isUserTurn)
			startUserMove();
	}

	function handleClickField(ev) {
		if(!isUserTurn || !isStart)
			return;
		DOM.currentField = $(ev.target);

		var field = parseInt(DOM.currentField.attr('data-value'));
		DOM.currentField.addClass('active');
		startSound(field);
		
		console.log(field , moves[currentMovesCount], field === moves[currentMovesCount])
		if(field === moves[currentMovesCount]) {
			console.log('dobrze');
			currentMovesCount++;
			if(currentMovesCount === movesCount) {	
				runRound();
			}
		}
		else {
			console.log('zle');
			currentMovesCount = 0;
		}
	}


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
		DOM.menu.startBtn.on('click', handleStartGame);
		DOM.menu.strictBtn.on('click', handleStrictMode);
		DOM.menu.switchBtn.on('click', handleSoundChange);
		DOM.fields.on('click', handleClickField);
		DOM.audio.addEventListener('ended', handleSoundEnd);
	}
	
	function init() {
		cacheDOM();
		bindEvents();
	}

	init();

})();