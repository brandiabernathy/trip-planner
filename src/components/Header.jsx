import {
	Heading,
	Button,
	useDisclosure,
	Link,
	Image,
} from '@chakra-ui/react';
import PlaceForm from './PlaceForm';
import AuthForm from './AuthForm';
import logo from '/atp-logo.svg';
import { useAppContext } from '../context/app';

function Header({ refreshPlaces }) {
	const { authed } = useAppContext();
	const { isOpen: isAuthFormOpen, onOpen: onAuthFormOpen, onClose: onAuthFormClose } = useDisclosure();
    const { isOpen: isPlaceFormOpen, onOpen: onPlaceFormOpen, onClose: onPlaceFormClose } = useDisclosure();

	const placeAdded = () => {
		onPlaceFormClose();
		refreshPlaces();
	}

	const showModal = () => {
		if(authed) {
			onPlaceFormOpen();
		}
		else {
			onAuthFormOpen();
		}
	}

	return (
		<>
			<header className="container header">
				<Link href="/" display="flex" alignItems="center">
					<Image src={logo} boxSize="45px" mr={2}/>
					<Heading as="h1">Abernathy Trip Planner</Heading>
				</Link>
				{ window.location.pathname === "/trip-planner/" && <Button onClick={showModal}>Add New Place</Button> }
			</header>

			{ isAuthFormOpen && <AuthForm isOpen={isAuthFormOpen} onClose={onAuthFormClose} /> }

			{ isPlaceFormOpen && <PlaceForm isOpen={isPlaceFormOpen} onClose={placeAdded} isEdit={false}/> }
		</>
	)
}

export default Header;
