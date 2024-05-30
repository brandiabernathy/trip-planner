import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AppContextProvider } from './context/app';
import theme from './theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router basename="/trip-planner">
			<AppContextProvider>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</AppContextProvider>
		</Router>
	</React.StrictMode>,
)
