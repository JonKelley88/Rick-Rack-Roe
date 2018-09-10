import test from 'tape';
import createGame from './scripts/game';
import createStore from './scripts/createStore';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import _ from 'lodash';

test('BASIC TESTS', assert => {
	const store = createStore();
	const game = createGame(store);
	const modalOpen = store.get('modalOpen');
	const squares = store.get('squares');
	const availableSquares = game.getAvailableSquares();

	assert.ok(isFunction(createGame), 'should be a function');
	assert.ok(isObject(game), 'should be an object');
	assert.ok(modalOpen, 'the modal starts out open');
	assert.ok(isArray(squares), 'squares is an array');
	assert.ok(isArray(availableSquares), 'available squares is an array');

	assert.end();
});

test('CHARACTER SELECT', assert => {
	const store = createStore();
	const game = createGame(store);

	game.on('character:select', () => {
		const playerChar = store.get('playerChar');
		assert.ok(playerChar === 'Rick', 'the chosen character is assigned to the player');
		
		assert.end();
	});

	game.characterSelect('Rick');
});

test('START GAME', assert => {
	const store = createStore();
	const game = createGame(store);

	game.on('game:start', () => {
		const modalOpen = store.get('modalOpen');
		const gameStart = store.get('gameStart');
		const showScore = store.get('showScore');

		assert.ok(!gameStart, 'the character selection component is wiped from the modal');
		assert.ok(!modalOpen, 'the modal closes when the game starts');
		assert.ok(showScore, 'the score board is opened');

		assert.end();
	});

	game.start();
});

test('PLAYER MOVE', assert => {
	const store = createStore();
	const game = createGame(store);

	game.on('player:move', () => {
		const square = store.get('squares', 1);
		const squareIsSelected = square.selected === true;
		const squareIsAssigned = square.player === 'Rick';
		const playerMoveStored = store.get('playerMoves').includes(1);
		const playerTurn = store.get('playerTurn');

		assert.ok(squareIsSelected, 'the square selection is true');
		assert.ok(squareIsAssigned, 'the square is assigned to the player');
		assert.ok(playerMoveStored, 'the player\'s move is stored');
		assert.ok(!playerTurn, 'the player\'s turn is then disabled');

		assert.end();
	});

	game.characterSelect('Rick');
	game.playerMove(1);
});

test('COMPUTER MOVE', assert => {
	const store = createStore();
	const game = createGame(store);

	game.on('computer:move', () => {
		const square = store.get('squares', 2);
		const squareIsSelected = square.selected === true;
		const squareIsAssigned = square.player === 'Morty';
		const computerMoveStored = store.get('computerMoves').includes(2);
		const playerTurn = store.get('playerTurn');

		assert.ok(squareIsSelected, 'the square selection is true');
		assert.ok(squareIsAssigned, 'the square is assigned to the computer');
		assert.ok(computerMoveStored, 'the computer\'s move is stored');
		assert.ok(playerTurn, 'the player\'s turn is then enabled');

		assert.end();
	});

	game.makeMove(2, 'Morty');
});

test('END GAME', assert => {
	const store = createStore();
	const game = createGame(store);
	const score = store.get('scoreBoard', 'Rick'); // 0

	game.on('game:end', () => {
		const playerTurn = store.get('playerTurn');
		const gameEnd = store.get('gameEnd');
		const portalTextUpdated = store.get('portalText') === 'Rick Wins!';
		const scoreUpdated = score + 1 === 1;
		const modalOpen = store.get('modalOpen');

		assert.ok(!playerTurn, 'the player\'s turn is disabled');
		assert.ok(gameEnd, 'the end game component is opened');
		assert.ok(portalTextUpdated, 'the modal text is updated to say who won');
		assert.ok(scoreUpdated, 'the winner\'s score is updated');
		assert.ok(modalOpen, 'the modal is opened');
		
		assert.end();
	});

	game.endGame('Rick');
});


test('PLAY AGAIN', assert => {
	const store = createStore();
	const game = createGame(store);
	const resetSubStore = {
		playerMoves: [],
		computerMoves: [],
		playerTurn: true,
		squares: [...Array(9)].map(() => {
			return { player: '', selected: false };
		}),
		modalOpen: false,
	};
	const resetScoreBoard = {
		Rick: 0,
		Morty: 0,
		draw: 0,
	};

	game.on('game:playAgain', () => {
		const subStore = _.pick(store.get(), [
			'playerMoves',
			'computerMoves',
			'playerTurn',
			'squares',
			'modalOpen'
		]);
		const scoreBoard = store.get('scoreBoard');

		assert.deepEqual(resetSubStore, subStore, 'the appropriate properties were reset in the store');
		assert.notDeepEqual(resetScoreBoard, scoreBoard, 'the score board retained its values');

		assert.end();
	});

	game.endGame('Rick');
	game.playAgain();
});