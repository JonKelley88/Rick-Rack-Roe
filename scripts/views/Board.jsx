import React from 'react';

export default function Board(props) {
	return (
		<div className="board">
			{props.children}
		</div>
	);
}