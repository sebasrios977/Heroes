import { heroes } from '..';


export const getHeroesByPublisher = (publisher) => {

    const validPublishers = ['DC Comics', 'Marvel Comics'];

    if( !validPublishers.includes(publisher)) {
        throw new Error(`${publisher} no es una editorial valida`);
    }

    return heroes.filter( heroe => heroe.publisher === publisher);


}