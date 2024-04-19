import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from '@chakra-ui/react';
import { db } from '../utils/firebase/config';
import { getDocs, collection, query, where } from "firebase/firestore";

import Header from '../components/Header';

function Place() {
    const { shortCode } = useParams();
    const [ place, setPlace ] = useState([]);

    const placesCollectionRef = collection(db, "places");

    const fetchPlace = async () => {
        try {
            const q = query(placesCollectionRef, where("shortCode", "==", shortCode));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setPlace(doc.data());
            });
		}
		catch(err) {
			console.error(err);
		}
    };


    useEffect(() => {
        fetchPlace();
      }, [shortCode]);

	return (
		<Box>
			<Header />
            <div>{place.name}</div>
		</Box>
	)
}

export default Place;