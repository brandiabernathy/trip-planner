import { useState, useEffect } from 'react';
import { db } from '../utils/firebase/config';
import { getDocs, collection } from "firebase/firestore";
import { Box } from '@chakra-ui/react';
import Header from '../components/Header';
import PlacesList from '../components/PlacesList';
import { useAppContext } from '../context/app';

function Index() {
	const { authed } = useAppContext();
	const [ places, setPlaces ] = useState([]);

	const fetchPlaces = async () => {
        try {
			const data = await getDocs(collection(db, "places"));
            const placesData =  data.docs.map((doc => ({
				...doc.data(),
				id: doc.id,
			})))
            setPlaces(placesData);
		}
		catch(err) {
			console.error(err);
		}
    };

    useEffect(() => {
		console.log('authed', authed);
        fetchPlaces();
    }, []);

	return (
		<Box>
			<Header refreshPlaces={fetchPlaces}/>
			<PlacesList places={places}/>
		</Box>
	)
}

export default Index;