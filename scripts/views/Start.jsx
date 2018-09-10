import React, { Fragment } from 'react';
import signal from 'signal-js';
import { branch } from 'baobab-react/higher-order';
import classnames from 'classnames';

const Start = function({ playerChar, gameStart }) {
	if (!gameStart) return null;
	return (
		<Fragment>
			<div className='col-xs-6 col-md-6'>
				<img 
					className='choose-pic Rick' 
					src='http://image.ibb.co/b2X82m/Rick_body.png'
					onClick={() => signal.trigger('character:select', 'Rick')}

				/>
			</div>
			<div className='col-xs-6 col-md-6'>
				<img 
					className='choose-pic Morty' 
					src='http://image.ibb.co/icpXTR/morty_body.png'
					onClick={() => signal.trigger('character:select', 'Morty')} 
				/>
			</div>
			<div className='col-xs-6 col-md-6'>
				<p className='rick-morty-text'>RICK</p>
			</div>
			<div className='col-xs-6 col-md-6'>
				<p className='rick-morty-text'>MORTY</p>
			</div>
			<div 
				className={classnames('col-xs-12 col-md-12 play-button', {
					hide: playerChar === '',
					show: playerChar !== '',
				})} 
				id='playButton'
				onClick={() => signal.trigger('game:start')}
			>
				<div className='text-center'>
					<p className='game-mode'>
						{
							playerChar === 'Rick' ? 
								'Play Easy Mode' : 
								'Play Hard Mode'
						} 
					</p>
				</div>
			</div>
		</Fragment>
	);
};

export default branch({
	playerChar: ['playerChar'],
	gameStart: ['gameStart'],
}, Start);