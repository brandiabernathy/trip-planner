import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Image,
    AspectRatio,
    Text,
    Heading,
    Link,
    useDisclosure,
    Icon,
    Flex,
} from '@chakra-ui/react';
import { db } from '../utils/firebase/config';
import { getDocs, collection, query, where } from "firebase/firestore";
import { FiPlusSquare, FiTrash2 } from "react-icons/fi";

import Header from '../components/Header';
import ToDoForm from '../components/ToDoForm';

function Place() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { shortCode } = useParams();
    const [ place, setPlace ] = useState({});


    const placesCollectionRef = collection(db, "places");

    const fetchPlace = async () => {
        try {
            const q = query(placesCollectionRef, where("shortCode", "==", shortCode));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                setPlace({
                    ...doc.data(),
                    id: doc.id
                });
                console.log("doc", doc.data());
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
        <>
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
                    <Flex role="group" alignItems="center">
                        <Heading as="h3">Things To Do</Heading>
                        <Icon
                            as={FiPlusSquare}
                            onClick={onOpen}
                            boxSize={8}
                            display="none"
                            cursor="pointer"
                            ml={4}
                            _groupHover={{
                                display: "block"
                            }}
                        />
                    </Flex>
                    { place.hasOwnProperty('toDo') && place.toDo.map(item => {
                        return (
                            <Flex key={item.shortCode} role="group">
                                { item.link ?
                                    <Link href={item.link} target="_blank">{item.description}</Link>
                                :
                                    <Text>{item.description}</Text>
                                }
                                <Icon
                                    as={FiTrash2}
                                    display="none"
                                    cursor="pointer"
                                    ml={2}
                                    _groupHover={{
                                        display: "block"
                                    }}
                                />
                            </Flex>
                        )
                    })}
                </Box>
            </Box>
            { isOpen && <ToDoForm isOpen={isOpen} onClose={onClose} placeToEdit={place}/> }
        </>
	)
}

export default Place;