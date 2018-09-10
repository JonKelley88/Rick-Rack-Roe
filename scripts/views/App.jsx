import React, { Fragment } from 'react';
import Logo from './Logo';
import Board from './Board';
import Squares from './Squares';
import Modal from './Modal';
import TurnDisplay from './TurnDisplay';
import ScoreBoard from './ScoreBoard';
import Start from './Start';
import End from './End';
import PortalText from './PortalText';

export default function App() {
	return (
		<Fragment>
			<Logo />
			<Board >
				<Squares />
			</Board>
			<Modal>
				<PortalText />
				<Start />
				<End />
			</Modal>
			<TurnDisplay />
			<ScoreBoard />
		</Fragment>
	);
}