import signal from 'signal-js';

export default function actions(store, game) {
	signal.on('character:select', character => {
		game.characterSelect(character);
	});

	signal.on('square:select', idx => {
		game.playerMove(idx);
	});

	signal.on('game:start', () => {
		game.start();
	});

	signal.on('game:playAgain', () => {
		game.playAgain();
	});

	signal.on('game:reset', () => {
		game.reset();
	});
}