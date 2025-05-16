import { NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils-mocks/mocks';
import { getFavorites, getIsFavoritesLoading, getIsFavoritesFetchingError } from './favorites-selectors';


describe('Favorites Selectors', ()=> {

  const favoriteOffer = makeFakeOffer();

  const state = {
    [NameSpace.Favorites]: {
      favorites: [favoriteOffer],
      isFavoritesLoading: true,
      isFavoritesFetchingError: false
    }
  };

  it('should return favorites from State', ()=> {
    const {favorites} = state[NameSpace.Favorites];
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });

  it('should return FavoritesLoading status from State', ()=> {
    const {isFavoritesLoading} = state[NameSpace.Favorites];
    const result = getIsFavoritesLoading(state);
    expect(result).toBe(isFavoritesLoading);
  });

  it('should return FavoritesFetchingError status from State', ()=> {
    const {isFavoritesFetchingError} = state[NameSpace.Favorites];
    const result = getIsFavoritesFetchingError(state);
    expect(result).toBe(isFavoritesFetchingError);
  });
});
