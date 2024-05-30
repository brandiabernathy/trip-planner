import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
	ModalHeader,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
  } from '@chakra-ui/react';
import { auth } from '../utils/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Auth({ isOpen, onClose }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const logIn = async () => {
		try {
			let existingUser = await signInWithEmailAndPassword(auth, email, password);

			onClose();
		}
		catch(err) {
			console.log(err);
		}
	}

	return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
				<ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type="text" onChange={(e) => setEmail(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="secondary" mr={3} onClick={onClose}>Cancel</Button>
                    <Button onClick={logIn}>Log in</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
	)
}