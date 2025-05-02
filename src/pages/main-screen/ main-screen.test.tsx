import { vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../utilsMocks/mocks';
import MainScreen from './main-screen';
import { SortType } from '../../const';

vi.mock('./main-empty-screen', () => ({
  default: () => <div data-testid="main-empty-mock" />
}));

describe('MainScreen', () => {


  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<MainScreen/>);

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

  it('should render MainEmptyScreen when there are no offers for the selected city', () => {
    const withHistoryComponent = withHistory(<MainScreen/>);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [],
          isOffersFetchingError: false,
        },
      }));


    render(withStoreComponent);

    expect(screen.getByTestId('main-empty-mock')).toBeInTheDocument();

  });

});
