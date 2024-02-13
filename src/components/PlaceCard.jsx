import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Image, Stack } from '@chakra-ui/react';

function PlaceCard({ place }) {

    console.log('placeeee', place);

    return (
        <Card>
            <CardBody>
                <Image
                    src={place.image}
                    alt={place.name}
                    borderRadius='lg'
                />
                <Stack mt='4' spacing='3'>
                    <Heading size='md'>{place.name}</Heading>
                </Stack>
            </CardBody>
        </Card>
    )
}
export default PlaceCard;