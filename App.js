import React, { PureComponent } from 'react';
import {
	AppRegistry
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './main.js';

const store = configureStore();

export default class ReduxApp extends PureComponent {
	render() {
		return(
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

AppRegistry.registerComponent('reduxApp', () => ReduxApp);
