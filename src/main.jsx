import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router basename="/trip-planner">
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</Router>
	</React.StrictMode>,
)
