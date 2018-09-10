import React, { Fragment } from 'react';
import { branch } from 'baobab-react/higher-order';
import signal from 'signal-js';

const Image = function({ player }) {
	return (
		<img 
			src={player === 'Rick' ? 'https://image.ibb.co/mkecsm/Rick1.png' : 'https://image.ibb.co/jDkiXm/Morty1.png'}
			className='icon'
		/>
	);
};

const Squares = function({ squares }) {
	return (
		<Fragment>
			{squares.map(function(square, idx) {
				return (
					<div 
						id={`square${idx}`}
						className="square"
						key={idx}
						onClick={() => signal.trigger('square:select', idx)} >
						{square.selected ? <Image player={square.player}/> : ''}
					</div>
				);
			})}
		</Fragment>
	);
};

export default branch({
	squares: ['squares'],
}, Squares);