import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';
import mangakatApp from './redux/reducers';
import App from './components/App';
import { saveState, loadState } from './helpers/persistState';
import register from './registerServiceWorker';
import './css/materialize.min.css';

register();
const loggerMiddleware = createLogger();
const persistedState = loadState();

const middlewares = [
	thunkMiddleware
];

process.env.NODE_ENV || middlewares.push(loggerMiddleware);
const store = createStore(
	mangakatApp,
	persistedState,
	applyMiddleware(...middlewares)
);

store.subscribe(throttle(() => {
	saveState(store.getState());
}, 1000));

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector('#root')
);