import {
	Heading,
	Button,
	useDisclosure,
	Link,
	Image,
} from '@chakra-ui/react';
import PlaceForm from './PlaceForm';
import logo from '/atp-logo.svg';

function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<header className="container header">
				<Link href="/" display="flex" alignItems="center">
					<Image src={logo} boxSize="45px" mr={2}/>
					<Heading as="h1">Abernathy Trip Planner</Heading>
				</Link>
				<Button onClick={onOpen}>Add New Place</Button>
			</header>

			{ isOpen && <PlaceForm isOpen={isOpen} onClose={onClose} isEdit={false}/> }
		</>
	)
}

export default Header;
