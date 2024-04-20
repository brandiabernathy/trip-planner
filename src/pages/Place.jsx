import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Image, AspectRatio, Text, Heading, Link } from '@chakra-ui/react';
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
		<Box className="place-page">
			<Header />
            <AspectRatio ratio={16 / 6} className="hero-img">
                <Box>
                    <Box className="overlay"></Box>
                    <Image
                        src={place.image}
                        alt={place.name}
                    />
                    <Heading as="h2" className="container heading">{place.name}</Heading>
                </Box>
            </AspectRatio>
            <Box className="container">
                <Heading as="h3">Things To Do</Heading>
                { place.hasOwnProperty('toDo') && place.toDo.map(item => {
                    return (
                        <Box key={item.shortCode}>
                            { item.link ?
                                <Link href={item.link} target="_blank">{item.description}</Link>
                            :
                                <Text>{item.description}</Text>
                            }
                        </Box>
                    )
                })}
            </Box>
		</Box>
	)
}

export default Place;