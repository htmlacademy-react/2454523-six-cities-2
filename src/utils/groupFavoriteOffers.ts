import { Offers } from '../types/offer';

const groupFavoriteOffersByCity = (favorites: Offers) => favorites.reduce((groups, favoriteOffer) => {
  const city = favoriteOffer.city.name;
  if (!groups[city]) {
    groups[city] = [];
  }
  groups[city].push(favoriteOffer);
  return groups;
}, {} as Record<string, Offers>);

export {groupFavoriteOffersByCity};
