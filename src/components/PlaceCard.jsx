import {
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	Tag,
	Box,
	AspectRatio,
} from '@chakra-ui/react';

function PlaceCard({ place }) {

	console.log('placeeee', place);
	let tags = place.tags.map(tag => {
		return <Tag key={tag}>{ tag }</Tag>
	});

	return (
		<Card>
			<CardBody>
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
						{tags}
					</Box>
				</Stack>
			</CardBody>
		</Card>
	)
}
export default PlaceCard;