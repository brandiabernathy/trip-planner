import PlaceCard from './PlaceCard';
import { SimpleGrid, Link } from "@chakra-ui/react"

function PlacesList({ places }) {

    let list = places.map(place=> {
		return <Link key={place.id} href={"./place/" + place.shortCode}><PlaceCard place={place} /></Link>
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