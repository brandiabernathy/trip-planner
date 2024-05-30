import PlaceCard from './PlaceCard';
import { SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function PlacesList({ places }) {

    let list = places.map(place=> {
		return <Link key={place.id} to={"/" + place.shortCode}><PlaceCard place={place} /></Link>
	});

    return (
        <SimpleGrid className="container" spacing={6} templateColumns='repeat(4,minmax(0,1fr))' mb={20}>
            { places.length > 0 &&
                <>
                    { list }
                </>
            }
        </SimpleGrid>
    )
}
export default PlacesList;