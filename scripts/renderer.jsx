import React from 'react';
import ReactDOM from 'react-dom';
import { root } from 'baobab-react/higher-order';

export default function renderer(App, store, mount) {
	const RootedApp = root(store, App);
	ReactDOM.render(<RootedApp />, mount);
}