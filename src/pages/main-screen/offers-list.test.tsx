import { vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utils-mocks/mock-component';
import { extractActionsTypes, makeFakeOffer, makeFakeStore } from '../../utils-mocks/mocks';
import OffersList from './offers-list';
import userEvent from '@testing-library/user-event';
import { addToFavorites, removeFromFavorites } from '../../store/api-actions';
import { ApiRoute } from '../../const';


describe('OffersList', () => {
  const onOffersListHover = vi.fn();
  const offer = makeFakeOffer();

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<OffersList offers = {[offer]} onOfferHover = {onOffersListHover}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        }
      }));


    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(offer.type)).toBeInTheDocument();
  });

  it('dispatches "addToFavorites" when offer.isFavorite = false and user clicking on favoriteButton', async () => {

    const notFavoriteOffer = {
      ... offer,
      isFavorite: false
    };

    const favoriteOffer = {
      ... offer,
      isFavorite: true
    };

    const withHistoryComponent = withHistory(<OffersList offers = {[notFavoriteOffer]} onOfferHover = {onOffersListHover}/>);


    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [notFavoriteOffer],
          isOffersFetchingError: false,
        }
      }));

    mockAxiosAdapter
      .onPost(
        `${ApiRoute.Favorite}/${notFavoriteOffer.id}/${1}`)
      .reply(200, favoriteOffer);

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('favoriteButton'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      addToFavorites.pending.type,
      addToFavorites.fulfilled.type,

    ]);
  });

  it('dispatches "removeFromFavorites" when offer.isFavorite = true and user clicking on favoriteButton', async () => {
    const favoriteOffer = {
      ... offer,
      isFavorite: true
    };

    const notFavoriteOffer = {
      ... offer,
      isFavorite: false
    };

    const withHistoryComponent = withHistory(<OffersList offers = {[favoriteOffer]} onOfferHover = {onOffersListHover}/>);


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
      }));

    mockAxiosAdapter
      .onPost(
        `${ApiRoute.Favorite}/${favoriteOffer.id}/${0}`)
      .reply(200, notFavoriteOffer);

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('favoriteButton'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      removeFromFavorites.pending.type,
      removeFromFavorites.fulfilled.type,

    ]);
  });


  it('should calls onOffersListHover with offer.id on mouseEnter and empty on mouseLeave', async () => {
    const withHistoryComponent = withHistory(<OffersList offers = {[offer]} onOfferHover = {onOffersListHover}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        }
      }));


    render(withStoreComponent);

    await userEvent.hover(screen.getByTestId(`rental-card-${offer.id}`));
    expect(onOffersListHover).toHaveBeenLastCalledWith(offer.id);

    await userEvent.unhover(screen.getByTestId(`rental-card-${offer.id}`));
    expect(onOffersListHover).toHaveBeenLastCalledWith('');

  });

});
