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
    Stack,
} from '@chakra-ui/react';
import { db } from '../utils/firebase/config';
import { getDocs, collection, query, where, doc, updateDoc } from "firebase/firestore";
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
            });
		}
		catch(err) {
			console.error(err);
		}
    };

    const deleteToDo = async(description) => {
        const placeRef = doc(db, "places", place.id);
        try {
            await updateDoc(placeRef, {
                toDo: place.toDo.filter(place => place.description != description)
            });
            fetchPlace();
        }
        catch(err) {
            console.error(err);
        }
    }

    const placeEdited = () => {
        onClose();
		fetchPlace();
    }


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
                        <Heading as="h2" size="2xl" className="container heading">{place.name}</Heading>
                    </Box>
                </AspectRatio>
                <Box className="container" my={10}>
                    <Flex role="group" alignItems="center"  mb={4}>
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
                    { place.toDo && place.toDo.length ?
                        <Stack>
                            { place.toDo.map(item => {
                                return (
                                    <Flex key={item.shortCode} role="group" alignItems="center">
                                        { item.link ?
                                            <>
                                                <Link href={item.link} isExternal><Text fontSize="xl">{item.name}</Text></Link>
                                                { item.description && <Text fontSize="xl">&nbsp;- {item.description}</Text> }
                                            </>
                                        :
                                            <>
                                                <Text fontSize="xl">{item.name}</Text>
                                                { item.description && <Text fontSize="xl">&nbsp;- {item.description}</Text> }
                                            </>
                                        }
                                        <Icon
                                            as={FiTrash2}
                                            onClick={() => deleteToDo(item.description)}
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
                        </Stack>
                    :
                        <Text>No ideas as of yet</Text>
                    }
                </Box>
            </Box>
            { isOpen && <ToDoForm isOpen={isOpen} onClose={placeEdited} placeToEdit={place}/> }
        </>
	)
}

export default Place;