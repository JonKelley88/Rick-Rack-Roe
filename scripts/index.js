import 'babel-polyfill';
import App from './views/App';
import createStore from './createStore';
import renderer from './renderer';
import actions from './actions';
import createGame from './game';

const mount = document.querySelector('#mount');

const init = function() {
	const store = createStore();
	const game = createGame(store);
	renderer(App, store, mount);
	actions(store, game);
};

init();

