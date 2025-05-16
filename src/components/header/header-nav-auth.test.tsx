import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utils-mocks/mock-component';
import { extractActionsTypes, makeFakeOffer, makeFakeStore } from '../../utils-mocks/mocks';
import userEvent from '@testing-library/user-event';
import HeaderNavAuth from './header-nav-auth';
import { ApiRoute } from '../../const';
import { logoutAction } from '../../store/api-actions';

describe('HeaderNavAuth', ()=> {
  it('should render correctly', ()=> {

    const expectedUserMail = 'test@mail.ru';
    const withHistoryComponent = withHistory(<HeaderNavAuth userEmail={expectedUserMail}/>);
    const favoriteOffer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        FAVORITES: {
          isFavoritesFetchingError: false,
          isFavoritesLoading: false,
          favorites: [favoriteOffer]
        }
      })
    );
    const expectedFavoritesLength = '1';
    const expectedText = 'Sign out';

    render(withStoreComponent);

    expect(screen.getByText(expectedUserMail)).toBeInTheDocument();
    expect(screen.getByText(expectedFavoritesLength)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });


  it('should  dispatch "logoutAction" when user clicked on "Sign out" ', async ()=> {

    const userMail = 'test@mail.ru';
    const withHistoryComponent = withHistory(<HeaderNavAuth userEmail={userMail}/>);
    const favoriteOffer = makeFakeOffer();

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      makeFakeStore({
        FAVORITES: {
          isFavoritesFetchingError: false,
          isFavoritesLoading: false,
          favorites: [favoriteOffer]
        }
      })
    );
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('SignOutElement'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

  });

});
