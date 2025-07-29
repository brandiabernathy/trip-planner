import { useState, useEffect } from 'react';
import { db } from '../utils/firebase/config';
import { getDocs, collection } from 'firebase/firestore';
import { Box, Stack, Text } from '@chakra-ui/react';
import Header from '../components/Header';
import PlacesList from '../components/PlacesList';

function Index() {
	const [taken, setTaken] = useState([]);
	const [ideas, setIdeas] = useState([]);

	const fetchPlaces = async () => {
        try {
			const data = await getDocs(collection(db, "places"));
            const placesData =  data.docs.map((doc => ({
				...doc.data(),
				id: doc.id,
			})))
            setIdeas(placesData.filter(trip => !trip.taken));
			setTaken(placesData.filter(trip => trip.taken == true));
			console.log('placedata', placesData);
		}
		catch(err) {
			console.error(err);
		}
    };

    useEffect(() => {
        fetchPlaces();
    }, []);

	return (
		<Box>
			<Header refreshPlaces={fetchPlaces}/>
			<Stack className="container">
				<Text fontWeight="bold" fontSize="2xl">Trip ideas</Text>
				<PlacesList places={ideas}/>
				<Text fontWeight="bold" fontSize="2xl">Trips taken</Text>
				<PlacesList places={taken}/>
			</Stack>
		</Box>
	)
}

export default Index;