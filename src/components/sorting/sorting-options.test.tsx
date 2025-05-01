import { render, screen} from '@testing-library/react';
import { withStore } from '../../utilsMocks/mock-component';
import SortingOptions from './sorting-options';
import { makeFakeStore } from '../../utilsMocks/mocks';
import { SortType } from '../../const';
import userEvent from '@testing-library/user-event';

describe('SortingOptions', ()=> {

  const onClickSortType = vi.fn();

  it('should render correctly', () => {
    const expectedText = 'Sort by';
    const sortOptions = Object.values(SortType);

    const { withStoreComponent } = withStore(
      <SortingOptions onClickSortType = {onClickSortType}/>,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    sortOptions.forEach((option)=> {
      expect(screen.getByText(option, { selector: 'li' })).toBeInTheDocument();
    });

  });


  it('should calls "onClickSortType" when clicking on the sort type', async () => {

    const { withStoreComponent } = withStore(
      <SortingOptions onClickSortType = {onClickSortType}/>,
      makeFakeStore({
        FILTERS:{
          city: 'Paris',
          sortType: SortType.PriceHighToLow,
        }
      })
    );

    render(withStoreComponent);

    await userEvent.click(screen.getByText(SortType.PriceHighToLow, { selector: 'li' }));
    expect(onClickSortType).toHaveBeenCalledTimes(1);
    expect(onClickSortType).toHaveBeenCalledWith(SortType.PriceHighToLow,);

  });


  it('should display the current sort type and keep the options list closed by default', () => {

    const { withStoreComponent } = withStore(
      <SortingOptions onClickSortType = {onClickSortType}/>,
      makeFakeStore({
        FILTERS:{
          city: 'Paris',
          sortType: SortType.PriceHighToLow,
        }
      })
    );

    render(withStoreComponent);

    const caption = screen.getByText(SortType.PriceHighToLow, { selector: 'span' });

    expect(caption).toBeInTheDocument();
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });


  it('should open the options list when clicking on the sort type caption', async () => {

    const { withStoreComponent } = withStore(
      <SortingOptions onClickSortType = {onClickSortType}/>,
      makeFakeStore({
        FILTERS:{
          city: 'Paris',
          sortType: SortType.PriceHighToLow,
        }
      })
    );

    render(withStoreComponent);

    const caption = screen.getByText(SortType.PriceHighToLow, { selector: 'span' });

    await userEvent.click(caption);
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

  });

});
