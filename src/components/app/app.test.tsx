import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, SortType } from '../../const';
import App from './app';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { makeFakeComment, makeFakeDetailedOffer, makeFakeOffer, makeFakeStore } from '../../utilsMocks/mocks';


describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render MainScreen when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const offer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        },
        FILTERS: {
          city: offer.city.name,
          sortType: SortType.Popular,
        },
      }));


    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(offer.type)).toBeInTheDocument();


  });


  it('should render FavoriteScreen when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

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
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(favoriteOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${favoriteOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(favoriteOffer.type)).toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });


  it('should render LoginScreen when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const offer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: ''
        },
      })
    );

    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(
      screen.getByRole('heading', { level: 1, name: /Sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'password');
  });


  it('should render OfferScreen when user navigate to "/offer/:offerId"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const offer = makeFakeOffer();
    const detailedOffer = makeFakeDetailedOffer();
    const review = makeFakeComment();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        },
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
      })
    );

    mockHistory.push(`${AppRoute.Offer}/${offer.id}`);

    render(withStoreComponent);

    expect(screen.getByText(detailedOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${detailedOffer.price}`)).toBeInTheDocument();

    detailedOffer.goods.forEach((good) => {
      expect(
        screen.getByText(good)
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();

  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const unknownRoute = '/unknown-route';

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();

  });
});
