import React from 'react';
import { branch } from 'baobab-react/higher-order';

const ScoreBoard = function({ scoreBoard, playerChar, computerChar, showScore }) {
	const playerScore = scoreBoard[playerChar];
	const computerScore = scoreBoard[computerChar];
	const draws = scoreBoard.draw;

	if (!showScore) return null;

	return (
		<div className="score-board">
			<div className="row">
				<div className="col-xs-4 col-md-4 text-center">
					<p className="scores player-score" >
						{`${playerChar}: ${playerScore}`}
					</p>
				</div>
				<div className="col-xs-4 col-md-4 text-center">
					<p className="scores draws">
						{`Draws: ${draws}`}
					</p>
				</div>
				<div className="col-xs-4 col-md-4 text-center">
					<p className="scores computer-score" >
						{`${computerChar}: ${computerScore}`}
					</p>
				</div>
			</div>
		</div>
	);
};

export default branch({
	scoreBoard: ['scoreBoard'],
	playerChar: ['playerChar'],
	computerChar: ['computerChar'],
	showScore: ['showScore'],
}, ScoreBoard);