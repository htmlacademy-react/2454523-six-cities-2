import { vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../utilsMocks/mocks';
import MainScreen from './main-screen';
import { SortType } from '../../const';
import userEvent from '@testing-library/user-event';
import { changeCity, changeSortOptions } from '../../store/filters/filters-slice';

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
  it('dispatches "changeCity" when clicking on another city', async () => {

    const otherCity = 'Amsterdam';

    const offer = makeFakeOffer();

    const withHistoryComponent = withHistory(<MainScreen/>);

    const { withStoreComponent, mockStore } = withStore(
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

    const amsterdamLink = screen.getByRole('link', { name: otherCity });
    await userEvent.click(amsterdamLink);
    const actions = mockStore.getActions();

    expect(actions).toEqual([ changeCity(otherCity) ]);

  });

  it('dispatches "changeSortOptions" when clicking on another sort option', async () => {

    const withHistoryComponent = withHistory(<MainScreen/>);

    const offer = makeFakeOffer();

    const { withStoreComponent, mockStore } = withStore(
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

    await userEvent.click(screen.getByText(SortType.PriceLowToHigh));

    const actions = mockStore.getActions();

    expect(actions).toEqual([changeSortOptions(SortType.PriceLowToHigh)]);
  });

});
