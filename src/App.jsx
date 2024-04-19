import { Box } from '@chakra-ui/react';
import './App.css'
import Header from './components/Header';
import PlacesList from './components/PlacesList';

function App() {

	return (
		<Box>
			<Header />
			<PlacesList />
		</Box>
	)
}

export default App;