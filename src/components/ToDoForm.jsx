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
import { doc, updateDoc } from "firebase/firestore";

function ToDoForm({ isOpen, onClose, placeToEdit }) {
    const [ newToDo, setNewToDo ] = useState({});

	const submit = async () => {
        const placeRef = doc(db, "places", placeToEdit.id);
        try {
            await updateDoc(placeRef, {
                toDo: [
                    ...placeToEdit.toDo,
                    {...newToDo}
                ]
            });
        }
        catch(err) {
            console.error(err);
        }
		onClose();
	}

	return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Things To Do</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input type="text" onChange={(e) => setNewToDo({...newToDo, description: e.target.value})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Link</FormLabel>
                            <Input type="text" onChange={(e) => setNewToDo({...newToDo, link: e.target.value})}/>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="secondary" mr={3} onClick={onClose}>Cancel</Button>
                    <Button onClick={submit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
	)
}

export default ToDoForm;
