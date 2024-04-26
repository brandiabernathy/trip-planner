import { useState } from 'react';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	Stack,
} from '@chakra-ui/react';
import { db } from '../utils/firebase/config';
import { addDoc, collection } from "firebase/firestore";
import TagInput from './TagInput';

function PlaceForm({ isOpen, onClose, isEdit, place }) {
	const [ newPlace, setNewPlace ] = useState({});

	const submitNewPlace = async () => {
		console.log("new place", newPlace);
		const str = newPlace.name.split(',');
		const shortCode = str[0].replace(/\s+/g, '-').toLowerCase();

		try {
			await addDoc(collection(db, "places"), {
				...newPlace,
				shortCode: shortCode
		  	});

            onClose();
		}
		catch(err) {
			console.error(err);
		}
	}

	const setTags = (tags) => {
		setNewPlace({
			...newPlace,
			tags: tags
		})
	}

    console.log("place!", place);

	return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ isEdit ? 'Edit' : 'Add' } Place</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Image URL</FormLabel>
                            <Input type="text" onChange={(e) => setNewPlace({...newPlace, image: e.target.value})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Tags</FormLabel>
                            <TagInput onTagsChange={setTags}/>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose}>Cancel</Button>
                    <Button onClick={submitNewPlace}>{ isEdit ? 'Edit' : 'Add' }</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
	)
}

export default PlaceForm;
