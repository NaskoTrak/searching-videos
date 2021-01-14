import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { VideoContextProvider } from './context/videoContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<VideoContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</VideoContextProvider>,
	document.getElementById('root')
);