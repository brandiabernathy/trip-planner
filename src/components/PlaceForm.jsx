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
	FormControl,
	FormLabel,
	Input,
	Stack,
} from '@chakra-ui/react';
import { db } from '../utils/firebase/config';
import { doc, addDoc, updateDoc, collection } from "firebase/firestore";
import TagInput from './TagInput';

function PlaceForm({ isOpen, onClose, isEdit, placeToEdit }) {
	const [ place, setPlace ] = useState(placeToEdit? placeToEdit : {});

	const submit = async () => {
		if(place.id) {
			const placeRef = doc(db, "places", place.id);
			// update existing place
			try {
				await updateDoc(placeRef, {
					...place
				});
			}
			catch(err) {
				console.error(err);
			}
		}
		else {
			// add new place
			const str = place.name.split(',');
			const shortCode = str[0].replace(/\s+/g, '-').toLowerCase();

			try {
				await addDoc(collection(db, "places"), {
					...place,
					shortCode: shortCode
				});

			}
			catch(err) {
				console.error(err);
			}
		}
		onClose();
	}

	const setTags = (tags) => {
		setPlace({
			...place,
			tags: tags
		})
	}

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
                            <Input type="text" value={place.name || '' } onChange={(e) => setPlace({...place, name: e.target.value})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Image URL</FormLabel>
                            <Input type="text" value={place.image || ''} onChange={(e) => setPlace({...place, image: e.target.value})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Tags</FormLabel>
                            <TagInput onTagsChange={setTags} presentTags={place.tags || ''}/>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="secondary" mr={3} onClick={onClose}>Cancel</Button>
                    <Button onClick={submit}>{ isEdit ? 'Save' : 'Add' }</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
	)
}

export default PlaceForm;
