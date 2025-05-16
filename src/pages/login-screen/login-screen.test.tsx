import { render, screen} from '@testing-library/react';
import {ApiRoute, AuthorizationStatus } from '../../const';
import { withStore, withHistory } from '../../utils-mocks/mock-component';
import { extractActionsTypes, makeFakeStore } from '../../utils-mocks/mocks';
import LoginScreen from './login-screen';
import userEvent from '@testing-library/user-event';
import { AuthData } from '../../types/auth-data';
import { UserData } from '../../types/user-data';
import { loginAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';


describe('LoginScreen', () => {
  it('should render correctly', ()=> {
    const withHistoryComponent = withHistory(<LoginScreen />);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: ''
        },
      })
    );

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

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'test@gmail.com';
    const expectedPasswordValue = '123';

    const withHistoryComponent = withHistory(<LoginScreen />);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: ''
        },
      })
    );

    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(loginElementTestId), expectedLoginValue);

    await userEvent.type(
      screen.getByTestId(passwordElementTestId), expectedPasswordValue);

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();

  });

  it('should dispatch "loginAction" when user clicked submitButton', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';

    const mockAuthData: AuthData = {
      email: 'test@mail.com',
      password: 'supersecret1',
    };

    const mockUserData: UserData = {
      name: 'Иван Иванов',
      avatarUrl: 'https://example.com/avatar.png',
      isPro: true,
      email: 'test@mail.com',
      token: 'jwt-token-123',
    };

    const withHistoryComponent = withHistory(<LoginScreen />);

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: ''
        },
      })
    );


    mockAxiosAdapter.onPost(ApiRoute.Login).reply(200,mockUserData);


    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(loginElementTestId), mockAuthData.email);

    await userEvent.type(
      screen.getByTestId(passwordElementTestId), mockAuthData.password);

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());


    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);
  });
});
