import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { extractActionsTypes, makeFakeOffer, makeFakeStore } from '../../utilsMocks/mocks';
import userEvent from '@testing-library/user-event';
import FavoriteScreen from './favorite-screen';
import { fetchFavoritesOffersAction, removeFromFavorites } from '../../store/api-actions';
import { ApiRoute } from '../../const';


describe('FavoriteScreen', ()=> {
  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<FavoriteScreen />);

    const favoriteOffer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [favoriteOffer],
          isOffersFetchingError: false,
        },
        FAVORITES: {
          isFavoritesFetchingError: false,
          isFavoritesLoading: false,
          favorites: [favoriteOffer]
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(favoriteOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${favoriteOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(favoriteOffer.type)).toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should dispatch "fetchFavoritesOffersAction", "removeFromFavorites" when user clicked button', async () => {
    const withHistoryComponent = withHistory(<FavoriteScreen />);

    const favoriteOffer = makeFakeOffer();

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [favoriteOffer],
          isOffersFetchingError: false,
        },
        FAVORITES: {
          isFavoritesFetchingError: false,
          isFavoritesLoading: false,
          favorites: [favoriteOffer]
        }
      })
    );

    const mockFavoriteOffer = makeFakeOffer();

    mockAxiosAdapter
      .onGet(ApiRoute.Favorite)
      .reply(200, [favoriteOffer]);

    mockAxiosAdapter
      .onPost(
        `${ApiRoute.Favorite}/${favoriteOffer.id}/${0}`)
      .reply(200, mockFavoriteOffer);

    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchFavoritesOffersAction.pending.type,
      fetchFavoritesOffersAction.fulfilled.type,
      removeFromFavorites.pending.type,
      removeFromFavorites.fulfilled.type,

    ]);
  });
});
