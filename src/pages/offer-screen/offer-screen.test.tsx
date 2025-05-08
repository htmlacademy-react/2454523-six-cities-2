import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { extractActionsTypes, makeFakeComment, makeFakeDetailedOffer, makeFakeOffer, makeFakeStore } from '../../utilsMocks/mocks';
import OfferScreen from './offer-screen';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import { addToFavorites, removeFromFavorites } from '../../store/api-actions';


const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('OfferScreen', () => {

  const detailedOffer = makeFakeDetailedOffer();
  const review = makeFakeComment();

  it('should render correctly', () => {

    const withHistoryComponent = withHistory(<OfferScreen/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DETAILED_OFFER: {
          neighboringOffers:[makeFakeOffer()],
          detailedOffer: detailedOffer,
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        },
        REVIEWS: {
          isSubmitting:false,
          isSubmittingFailed: false,
          isReviewsLoading: false,
          reviews: [review],
          isReviewsFetchingError: false
        }
      }));


    render(withStoreComponent);

    expect(screen.getByText(detailedOffer.description)).toBeInTheDocument();
    expect(screen.getByText(`€${detailedOffer.price}`)).toBeInTheDocument();
    detailedOffer.goods.forEach((good) => {
      expect(
        screen.getByText(good)
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });

  it('should show Premium badge when isPremium is true', () => {
    const premiumOffer = {
      ...detailedOffer,
      isPremium: true
    };

    const withHistoryComponent = withHistory(<OfferScreen/>);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DETAILED_OFFER: {
          neighboringOffers:[makeFakeOffer()],
          detailedOffer: premiumOffer,
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        }
      }));


    render(withStoreComponent);

    expect(screen.getByTestId('offer-premium-badge')).toBeInTheDocument();

  });


  it('should not show Premium badge when isPremium is false', () => {
    const notPremiumOffer = {
      ...detailedOffer,
      isPremium: false
    };

    const withHistoryComponent = withHistory(<OfferScreen/>);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DETAILED_OFFER: {
          neighboringOffers:[makeFakeOffer()],
          detailedOffer: notPremiumOffer,
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        },
      }));

    render(withStoreComponent);

    expect(screen.queryByTestId('offer-premium-badge')).not.toBeInTheDocument();

  });


  it('should render correct number of gallery images', () => {
    const { withStoreComponent } = withStore(
      withHistory(<OfferScreen />),
      makeFakeStore({
        DETAILED_OFFER: {
          detailedOffer,
          neighboringOffers: [makeFakeOffer()],
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        },
      })
    );

    render(withStoreComponent);

    const imgs = screen.getAllByAltText('Photo studio');
    expect(imgs).toHaveLength(detailedOffer.images.length);
  });

  it('should dispatch addToFavorites when user clicks on favorite button and the offer is not favorite', async() => {
    const notFavoriteDetailedOffer = {
      ...detailedOffer,
      isFavorite: false
    };

    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      withHistory(<OfferScreen />),
      makeFakeStore({
        DETAILED_OFFER: {
          detailedOffer: notFavoriteDetailedOffer,
          neighboringOffers: [makeFakeOffer()],
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test'
        }
      })
    );

    const mockFavoriteOffer = makeFakeOffer();

    mockAxiosAdapter
      .onPost(
        `${ApiRoute.Favorite}/${notFavoriteDetailedOffer.id}/${1}`)
      .reply(200, mockFavoriteOffer);

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('favoriteButtonElement'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      addToFavorites.pending.type,
      addToFavorites.fulfilled.type,
    ]);
  });


  it('should dispatch removeFromFavorites when user clicks on favorite button and the offer is favorite', async() => {
    const favoriteDetailedOffer = {
      ...detailedOffer,
      isFavorite: true
    };

    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      withHistory(<OfferScreen />),
      makeFakeStore({
        DETAILED_OFFER: {
          detailedOffer: favoriteDetailedOffer,
          neighboringOffers: [makeFakeOffer()],
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test'
        }
      })
    );

    const mockFavoriteOffer = makeFakeOffer();

    mockAxiosAdapter
      .onPost(
        `${ApiRoute.Favorite}/${favoriteDetailedOffer.id}/${0}`)
      .reply(200, mockFavoriteOffer);

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('favoriteButtonElement'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      removeFromFavorites.pending.type,
      removeFromFavorites.fulfilled.type,
    ]);
  });

  it('should navigate to login when user clicks favorite button and Authorization Status is NoAuth', async () => {

    const { withStoreComponent, mockStore } = withStore(
      withHistory(<OfferScreen />),
      makeFakeStore({
        DETAILED_OFFER: {
          detailedOffer,
          neighboringOffers: [ makeFakeOffer() ],
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: '',
        },
      })
    );

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('favoriteButtonElement'));

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login, { replace: true });

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([]);
  });

});
