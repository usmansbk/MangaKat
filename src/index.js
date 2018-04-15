import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';
import mangakatApp from './redux/reducers';
import App from './components/App';
import { saveState, loadState, deleteState } from './helpers/persistState';
import register from './registerServiceWorker';
import './css/materialize.min.css';
const currentVersion = '1.0.1';

register();
const loggerMiddleware = createLogger();
let persistedState = loadState();

if (persistedState && (persistedState.version !== currentVersion)) {
	persistedState = deleteState();
}

const middlewares = [
	thunkMiddleware
];

(process.env.NODE_ENV === 'development') && middlewares.push(loggerMiddleware);
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