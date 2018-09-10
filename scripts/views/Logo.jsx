import React from 'react';

export default function Logo() {
	const imgSrc = 'http://image.ibb.co/gENxa6/Rick_Rack_Roe.png';
	return (
		<div className='img-responsive center-block'>
			<img 
				className='logo'
				src={imgSrc}
			/>
		</div>
	);
}