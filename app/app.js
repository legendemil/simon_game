var simon = (function() {
	var DOM = {
		simon 			: null,
		fields 			: null,
		currentField 		: null,
		menu 			: {
			screen 			: null,
			startBtn 		: null,
			strictBtn 		: null,
			switchBtn 		: null
		},
		audio 			: {
			simon 			: null,
			user 			: null
		}
	};

	var 
		isStart 		= false,
		isStrict 		= false,
		isUserTurn 		= false,
		isMistake 		= false,
		isSound 		= true,
		moves 			= [],
		currentSimonIndex 	= 0,
		currentUserIndex 	= 0,
		currentUserField 	= 0;
	
	function stopGame() {
		isStart   		= false;
		isUserTurn 		= false;
		moves 			= [];
		currentSimonIndex 	= 0;
		currentUserIndex 	= 0;
		updateScreen();
		DOM.fields.removeClass('active');
	}

	function restartGame() {
		if(isStrict)
			moves = [];

		currentSimonIndex 	= 0;
		currentUserIndex  	= 0;
		updateScreen(true);
		setTimeout(function() { 
			updateScreen();
			runRound();
		}, 2000);
	}

	function randomField() {
		return Math.floor(Math.random() * 4 ) + 1;
	}

	function updateScreen(isMistake) {
		if(isMistake) {
			DOM.menu.screen.addClass('error');
			DOM.menu.screen.text('WRONG!');
			return;
		}
		DOM.menu.screen.removeClass('error');
		DOM.menu.screen.text(moves.length);
	}

	function runRound() {
		var newField;

		if( !isMistake 
			|| (isMistake && isStrict) ) {
			newField = randomField();
			moves.push(newField);
			updateScreen();
		}

		isMistake = false;

		setTimeout(function () {
			startSimonSound();
		}, 1000);
	}

	function nextRound() {
		currentUserIndex = 0;
		isUserTurn = false;
		runRound();
	}

	function startSimonSound() {
		var url,
			currentSimonField;
		currentSimonField = moves[currentSimonIndex];
		
		// start user turn
		if(currentSimonField === undefined) {
			currentSimonIndex = 0;
			isUserTurn = true;
			return;
		}

		url ='https://s3.amazonaws.com/freecodecamp/simonSound' + currentSimonField + '.mp3';
			
		highlightField(currentSimonField);
		DOM.audio.simon.src = url;
		DOM.audio.simon.load();
		DOM.audio.simon.play();
	}

	function startUserSound(field) {
		var url ='https://s3.amazonaws.com/freecodecamp/simonSound' + field + '.mp3';
		highlightField(field);
		DOM.audio.user.src = url;
		DOM.audio.user.load();
		DOM.audio.user.play();
	}	

	function winGame() {
		stopGame();
		DOM.menu.screen.text("WIN!");
		DOM.menu.startBtn.find('button').toggleClass('clicked');
	}

	// highlight or unhighlighed field
	function highlightField(value) {
		var query = '[data-value=' + value +']';
		var field = DOM.fields.closest(query);
		field.toggleClass('active');
	}

	function handleStrictMode(ev) {
		var btn = $(ev.target);
		btn.toggleClass('clicked');
		isStrict = !isStrict;
	}

	function handleSimonSoundEnd(ev) {
		highlightField(moves[currentSimonIndex]);
		currentSimonIndex++;
		setTimeout(function () {
			startSimonSound();
		}, 800);
	}

	function handleUserSoundEnd() {
		highlightField(currentUserField);
		if(currentUserIndex === 20 ) {
			winGame();
			return;
		}
		if(currentUserIndex === moves.length && !isMistake) 
			nextRound();
		
	}

	function handleClickField(ev) {
		if(!isUserTurn)
			return;

		var field 		= $(ev.target);
		currentUserField 	= parseInt(field.attr('data-value'));

		startUserSound(currentUserField);
		if(currentUserField === moves[currentUserIndex]) 
			currentUserIndex++;
		else {
			isMistake = true;
			restartGame();
		}
	}

	function handleStartGame(ev) {
		isStart = !isStart;
		DOM.menu.startBtn.find('button').toggleClass('clicked');
		if(!isStart) {
			stopGame();
			return;
		}
		runRound();
	}

	function handleEnableSound(ev) {
		var btn = $(ev.target);
		btn.toggleClass('switched');
		isSound = !isSound;
		if(isSound) {
			DOM.audio.simon.volume = 1;
			DOM.audio.user.volume = 1;
		} else {
			DOM.audio.simon.volume = 0;
			DOM.audio.user.volume = 0;
		}
	}


	function cacheDOM() {
		DOM.simon 		= $('.simon');
		DOM.fields 		= $(DOM.simon).find('.field');
		DOM.menu.screen 	= $(DOM.simon).find('.simon-screen');
		DOM.menu.startBtn 	= $(DOM.simon).find('#btn-start');
		DOM.menu.strictBtn 	= $(DOM.simon).find('#btn-strict');
		DOM.menu.switchBtn 	= $(DOM.simon).find('.switch-btn-control');

		DOM.audio.simon 	= document.querySelector('#simon-audio');
		DOM.audio.user 		= document.querySelector('#user-audio');
	}

	function bindEvents() {
		DOM.menu.startBtn.on('click', handleStartGame);
		DOM.menu.strictBtn.on('click', handleStrictMode);
		DOM.menu.switchBtn.on('click', handleEnableSound);
		DOM.fields.on('click', handleClickField);

		DOM.audio.simon.addEventListener('ended', handleSimonSoundEnd);
		DOM.audio.user.addEventListener('ended', handleUserSoundEnd);
	}
	
	function init() {
		cacheDOM();
		bindEvents();
	}

	init();

})();
