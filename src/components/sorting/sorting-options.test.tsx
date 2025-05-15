import { render, screen} from '@testing-library/react';
import { withStore } from '../../utils-mocks/mock-component';
import SortingOptions from './sorting-options';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { SortType } from '../../const';
import userEvent from '@testing-library/user-event';

describe('SortingOptions', ()=> {

  const handleSortTypeClick = vi.fn();

  it('should render correctly', () => {
    const expectedText = 'Sort by';
    const sortOptions = Object.values(SortType);

    const { withStoreComponent } = withStore(
      <SortingOptions onSortTypeClick = {handleSortTypeClick}/>,
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
      <SortingOptions onSortTypeClick = {handleSortTypeClick}/>,
      makeFakeStore({
        FILTERS:{
          city: 'Paris',
          sortType: SortType.PriceHighToLow,
        }
      })
    );

    render(withStoreComponent);

    await userEvent.click(screen.getByText(SortType.PriceHighToLow, { selector: 'li' }));
    expect(handleSortTypeClick).toHaveBeenCalledTimes(1);
    expect(handleSortTypeClick).toHaveBeenCalledWith(SortType.PriceHighToLow,);

  });


  it('should display the current sort type and keep the options list closed by default', () => {

    const { withStoreComponent } = withStore(
      <SortingOptions onSortTypeClick = {handleSortTypeClick}/>,
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
      <SortingOptions onSortTypeClick = {handleSortTypeClick}/>,
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
