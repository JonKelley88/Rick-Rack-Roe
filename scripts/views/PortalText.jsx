import React from 'react';
import { branch } from 'baobab-react/higher-order';

const PortalText = function({ portalText }) {
	return (
		<div className="col-xs-12 col-md-12">
			<p className='portal-text'>
				{portalText}
			</p>
		</div>
	);
};

export default branch({
	portalText: ['portalText'],
}, PortalText);