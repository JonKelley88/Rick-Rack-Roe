import React from 'react';
import { branch } from 'baobab-react/higher-order';
import classnames from 'classnames';

const Modal = function({ modalOpen, children }) {
	return (
		<div 
			className={classnames('portal', {
				show: modalOpen,
				hide: !modalOpen,
			})} 
		>
			<div className='portal-content container' >
				<div className='row'>
					<div className='col-xs-12 col-md-12 center-block'>
						<img 
							src='http://image.ibb.co/gENxa6/Rick_Rack_Roe.png' 
							className='portal-logo'
						/>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default branch({
	modalOpen: ['modalOpen'],
}, Modal);