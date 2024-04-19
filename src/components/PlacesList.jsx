import { useState, useEffect } from 'react';
import PlaceCard from './PlaceCard';
import { SimpleGrid } from "@chakra-ui/react"
import { db } from '../utils/firebase/config';
import { getDocs, collection } from "firebase/firestore";

function PlacesList() {
    const [places, setPlaces] = useState([]);


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
        fetchPlaces();
    }, []);

    let list = places.map(place=> {
		return <PlaceCard key={place.id} place={place} />
	});

    return (
        <SimpleGrid spacing={6} templateColumns='repeat(4,minmax(0,1fr))'>
            { places.length > 0 &&
                <>
                    { list }
                </>
            }
        </SimpleGrid>
    )
}
export default PlacesList;