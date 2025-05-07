import { vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import MainEmptyScreen from './main-empty-screen';
import { makeFakeStore } from '../../utilsMocks/mocks';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { SortType } from '../../const';

vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid="header-mock" />
}));


vi.mock('./cities-tabs', () => ({
  default: () => <div data-testid="cities-tabs-mock" />
}));

describe('MainEmptyScreen', ()=> {

  it('should render correctly', () => {

    const withHistoryComponent = withHistory(<MainEmptyScreen/>);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    const expectedFirstText = /No places to stay available/i;
    const expectedParagrphText = /We could not find any property available at the moment/i;

    render(withStoreComponent);

    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('cities-tabs-mock')).toBeInTheDocument();
    expect(screen.getByText(expectedFirstText)).toBeInTheDocument();
    expect(screen.getByText(expectedParagrphText)).toBeInTheDocument();

  });

  it('should include the city from the store in the description', () => {

    const withHistoryComponent = withHistory(<MainEmptyScreen/>);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        FILTERS: {
          city: 'Amsterdam',
          sortType: SortType.Popular,
        },
      })
    );

    const expectedText = /We could not find any property available at the moment in Amsterdam/i;

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });

});
