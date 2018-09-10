import Baobab from 'baobab';

export default function createStore() {
	return new Baobab({
		playerChar: '',
		playerMoves: [],
		computerChar: '',
		computerMoves: [],
		playerTurn: true,
		portalText: 'Who do you want to be?',
		squares: [...Array(9)].map(() => {
			return { player: '', selected: false };
		}),
		winCombos: [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		],
		scoreBoard: {
			Rick: 0,
			Morty: 0,
			draw: 0,
		},
		modalOpen: true,
		gameStart: true,
		gameEnd: false,
		showScore: false,
	});
};

