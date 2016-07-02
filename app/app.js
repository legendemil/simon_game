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
		audio 			: {
			simon 			: null,
			user 			: null
		}
	};

	var isStart 			= false,
		isUserTurn 			= false,
		moves 				= [],
		currentSimonIndex 	= 0,
		currentUserIndex 	= 0,
		currentUserField 	= 0;
	
	function stopGame() {
		isStart 			= false;
		isUserTurn 			= false;
		moves 				= [];
		currentSimonIndex 	= 0;
		currentUserIndex 	= 0;
	}

	function randomField() {
		return Math.floor(Math.random() * 4 ) + 1;
	}

	function updateScreen() {
		DOM.menu.screen.text(moves.length);
	}

	function runRound() {
		var newField = randomField();
		moves.push(newField);
		updateScreen();
		setTimeout(function () {
			startSimonSound();
		}, 1000);
		console.log("moves", moves)
	}

	function nextRound() {
		currentUserIndex = 0;
		console.log('dorze, kolejna runda');
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
			console.log('user turn');
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

	// highlight or unhighlighed field
	function highlightField(value) {
		var query = '[data-value=' + value +']';
		var field = DOM.fields.closest(query);
		field.toggleClass('active');
	}

	function handleSimonSoundEnd(ev) {
		highlightField(moves[currentSimonIndex]);
		currentSimonIndex++;
		startSimonSound();
	}

	function handleUserSoundEnd() {
		highlightField(currentUserField);
		if(currentUserIndex === moves.length) {
			nextRound();
		}
	}

	function handleClickField(ev) {
		if(!isUserTurn)
			return;

		var field 			= $(ev.target);
		currentUserField 	= parseInt(field.attr('data-value'));
		console.log(field);

		startUserSound(currentUserField);
		console.log(currentUserField, moves[currentUserIndex])
		if(currentUserField === moves[currentUserIndex]) {
			console.log('dobrze');
			currentUserIndex++;
		}
		else {
			console.log('zle');
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


	function cacheDOM() {
		DOM.simon 			= $('.simon');
		DOM.fields 			= $(DOM.simon).find('.field');
		DOM.menu.screen 	= $(DOM.simon).find('.simon-screen');
		DOM.menu.startBtn 	= $(DOM.simon).find('#btn-start');
		DOM.menu.strictBtn 	= $(DOM.simon).find('#btn-strict');
		DOM.menu.switchBtn 	= $(DOM.simon).find('.switch-btn-control');

		DOM.audio.simon 	= document.querySelector('#simon-audio');
		DOM.audio.user 	= document.querySelector('#user-audio');
	}

	function bindEvents() {
		DOM.menu.startBtn.on('click', handleStartGame);
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