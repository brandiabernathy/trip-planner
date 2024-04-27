import {
	Heading,
	Button,
	useDisclosure,
	Link,
} from '@chakra-ui/react';
import PlaceForm from './PlaceForm';

function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<header className="container header">
				<Link href='/'>
					<Heading as="h1">Abernathy Trip Planner</Heading>
				</Link>
				<Button onClick={onOpen}>Add New Place</Button>
			</header>

			{ isOpen && <PlaceForm isOpen={isOpen} onClose={onClose} isEdit={false}/> }
		</>
	)
}

export default Header;
