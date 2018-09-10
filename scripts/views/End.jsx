import React, { Fragment } from 'react';
import signal from 'signal-js';
import { branch } from 'baobab-react/higher-order';

const End = function({ gameEnd }) {
	if (!gameEnd) return null;
	return (
		<Fragment>
			<div className='col-xs-6 col-md-6'>
				<img 
					className='choose-pic Rick' 
					src='http://image.ibb.co/b2X82m/Rick_body.png'

				/>
			</div>
			<div className='col-xs-6 col-md-6'>
				<img 
					className='choose-pic Morty' 
					src='http://image.ibb.co/icpXTR/morty_body.png'
				/>
			</div>
			<div className='col-xs-6 col-md-6 play-again-button'>
				<p 
					className='button-text'
					onClick={() => signal.trigger('game:playAgain')}>
								Play Again
				</p>
			</div>
			<div className='col-xs-6 col-md-6 reset-button'>
				<p 
					className='button-text'
					onClick={() => signal.trigger('game:reset')}>
								Reset
				</p>
			</div>
		</Fragment>	
	);
};

export default branch({
	gameEnd: ['gameEnd'],
}, End);
