import {
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	Tag,
	Box,
	AspectRatio,
	Icon,
	useDisclosure,
} from '@chakra-ui/react';

import { FiEdit2 } from "react-icons/fi";
import PlaceForm from './PlaceForm';

function PlaceCard({ place }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	let tags;
	if(place.tags.length) {
		tags = place.tags.map(tag => {
			return <Tag key={tag}>{ tag }</Tag>
		});
	}

	const editPlace = e => {
		e.preventDefault();
		onOpen();
	}

	return (
		<>
			<Card role="group" height="100%">
				<CardBody>
					<Icon
						as={FiEdit2}
						onClick={editPlace}
						position="absolute"
						zIndex="1"
						right={2}
						top={2}
						color="white"
						boxSize={5}
						display="none"
						_groupHover={{
							display: "block"
					}}
					/>
					<AspectRatio ratio={4 / 3}>
						<Image
							src={place.image}
							alt={place.name}
							borderTopLeftRadius="lg"
							borderTopRightRadius="lg"
						/>
					</AspectRatio>
					<Stack m="4" spacing="3">
						<Heading size="md">{place.name}</Heading>
						<Box m={-1}>
							{tags && tags}
						</Box>
					</Stack>
				</CardBody>
			</Card>

			{ isOpen && <PlaceForm isOpen={isOpen} onClose={onClose} isEdit={true} placeToEdit={place}/> }
		</>
	)
}
export default PlaceCard;