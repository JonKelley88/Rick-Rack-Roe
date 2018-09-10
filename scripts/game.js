import _ from 'lodash';
import wait from './utilities/wait';
import EventEmitter from 'events';

export default function createGame(store) {
	const signal = new EventEmitter();

	const getAvailableSquares = function() {
		const playerMoves = store.get('playerMoves');
		const computerMoves = store.get('computerMoves');
		const allMoves = playerMoves.concat(computerMoves);
		let availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		availableSquares = availableSquares.filter(num => !allMoves.includes(num));
		return availableSquares;
	};

	const checkWin = function(moves) {
		const winCombos = store.get('winCombos');
		return !!winCombos.find(function(combo) {
			return combo.every(function(num) {
				return moves.includes(num);
			});
		});
	};

	const checkPlayerWin = function() {
		const moves = store.get('playerMoves');
		return checkWin(moves);
	};

	const findWin = function(moves) {
		const winCombos = store.get('winCombos');
		const availableSquares = getAvailableSquares();

		return winCombos.reduce(function(winningMove, combo) {
			// we've already found the move, stop
			if (winningMove !== undefined) return winningMove;

			const madeMoves = combo.filter(move => {
				return moves.includes(move);
			});

			// only valid if 2 out of 3 moves
			if (madeMoves.length !== 2) return undefined;

			const notMadeMove = combo.find(move => {
				return !moves.includes(move);
			});

			// move is already taken
			if (!availableSquares.includes(notMadeMove)) return undefined;

			return notMadeMove;
		}, undefined);
	};

	const endGame = async function(winner) {
		store.set('playerTurn', false);
		store.set('gameEnd', true);

		if (winner === 'draw') {
			store.set('portalText', 'It\'s a draw!');
			const drawScore = store.get(['scoreBoard', 'draw']) + 1;
			store.set(['scoreBoard', 'draw'], drawScore);
		} else { // else if the winner is Rick or Morty
			store.set('portalText', `${winner} Wins!`);
			const winnerScore = store.get(['scoreBoard', winner]) + 1;
			store.set(['scoreBoard', winner], winnerScore);
		}

		signal.emit('game:end');

		await wait(1000);
		store.set('modalOpen', true);
	};

	const checkDraw = function() {
		const squares = store.get('squares');
		return squares.every(function(square) {
			return square.selected === true;
		});
	};

	const makeMove = function(move, character) {
		const isComputerMove = character !== store.get('playerChar');
		store.set(['squares', move, 'selected'], true);
		store.set(['squares', move, 'player'], character);
		const moveKey = isComputerMove ? 'computerMoves' : 'playerMoves';
		store.push(moveKey, move);

		const moves = store.get(moveKey);
		const gameWon = checkWin(moves);
		const draw = checkDraw();
		if (gameWon) return endGame(character);
		if (draw) return endGame('draw');

		signal.emit('computer:move');
	};

	const getHardMove = function() {
		const playerMoves = store.get('playerMoves');
		const computerMoves = store.get('computerMoves');
		
		const computerWinMove = findWin(computerMoves);
		if (computerWinMove !== undefined) return computerWinMove;
		
		const playerWinMove = findWin(playerMoves);
		if (playerWinMove !== undefined) return playerWinMove;

		if (getAvailableSquares().includes(4)) return 4;

		const cornerSquares = getAvailableSquares().filter(index => {
			return index === 0 || index === 2 || index === 6 || index === 8;
		});
		if (cornerSquares.length) return _.sample(cornerSquares);

		return _.sample(getAvailableSquares());
	};

	const computerMove = async function() {
		await wait(1000);
		const availableSquares = getAvailableSquares();
		const character = store.get('computerChar');
		const easyMode = store.get('playerChar') === 'Rick' ? true : false;
		let computerPick;

		if (easyMode) {
			computerPick = _.sample(availableSquares);
		} else {
			computerPick = getHardMove();
		}

		store.set('playerTurn', true);
		makeMove(computerPick, character);
	};

	const playerMove = function(move) {
		// return if it's not the player's turn or if the square is already selected
		if (!store.get('playerTurn') || store.get('squares', move, 'selected') === true) return;

		const character = store.get('playerChar');
		makeMove(move, character);
		store.set('playerTurn', false);
		computerMove();

		signal.emit('player:move');
	};

	const playAgain = function() {
		store.merge({
			playerMoves: [],
			computerMoves: [],
			playerTurn: true,
			squares: [...Array(9)].map(() => {
				return { player: '', selected: false };
			}),
			modalOpen: false,
		});

		signal.emit('game:playAgain');
	};

	const reset = function() {
		history.go(0);
		location.reload(true);
	};

	const start = function() {
		store.set('playerTurn', true);
		store.set('modalOpen', false);
		store.set('gameStart', false);
		store.set('showScore', true);

		signal.emit('game:start');
	};

	const characterSelect = function(character) {
		if (!store.get('playerTurn')) return;
		store.set('playerChar', character);
		store.set('computerChar', store.get('playerChar') === 'Rick' ? 'Morty' : 'Rick');
		
		signal.emit('character:select');
	};

	return Object.assign(signal, {
		checkPlayerWin,
		reset, 
		checkDraw,
		endGame,
		computerMove,
		playAgain,
		playerMove,
		start,
		characterSelect,
		makeMove,
		getAvailableSquares
	});
}