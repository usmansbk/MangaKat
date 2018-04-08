import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import mangakatApp from './redux/reducers';
import App from './components/App';
import './css/materialize.min.css';

const loggerMiddleware = createLogger();

const store = createStore(
	mangakatApp,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector('#root')
);