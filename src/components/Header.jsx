import { useState } from 'react';
import {
	Heading,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import PlaceForm from './PlaceForm';

function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<header className="container header">
				<Heading as="h1">Trip Planner</Heading>
				<Button onClick={onOpen}>Add New Place</Button>
			</header>

			{ isOpen && <PlaceForm isOpen={isOpen} onClose={onClose} isEdit={false}/> }
		</>
	)
}

export default Header;
