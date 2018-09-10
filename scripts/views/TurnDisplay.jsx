import React from 'react';
import { branch } from 'baobab-react/higher-order';

const TurnDisplay = function({ playerChar, playerTurn, computerChar }) {
	return (
		<div className='text-center turn-display' >
			{playerTurn ? `${playerChar}'s Turn` : `${computerChar}'s Turn`}
		</div>
	);
};

export default branch({
	playerChar: ['playerChar'],
	playerTurn: ['playerTurn'],
	computerChar: ['computerChar'],

}, TurnDisplay);