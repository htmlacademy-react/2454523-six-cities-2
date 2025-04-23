import axios from 'axios';
import { vi } from 'vitest';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeComment, makeFakeDetailedOffer, makeFakeOffer } from '../utilsMocks/mocks';
import { State } from '../types/state';
import { checkAuthAction,
  fetchOffersAction,
  fetchDetailedOfferAction,
  fetchReviewsAction,
  fetchFavoritesOffersAction,
  clearErrorAction,
  loginAction
} from './api-actions';
import { ApiRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';
import * as emailStorage from '../services/email';

vi.mock('../services/api', () => ({
  createAPI: () => axios.create(),
}));

describe('Async actions', () => {

  const axiosInstance = axios.create();
  const mockAxiosAdapter = new MockAdapter(axiosInstance);
  const middleware = [thunk.withExtraArgument(axiosInstance)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFERS: { offers: [] }});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
    it(`should dispatch "checkAuthAction.pending"
      and "checkAuthAction.rejected" when server response 400`, async() => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', ()=> {
    it(`should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled",
      when server response 200`, async ()=> {

      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it(`should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected",
      when server response 400`, async ()=> {

      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchDetailedOfferAction', ()=> {
    it(`should dispatch "fetchDetailedOfferAction.pending", "fetchDetailedOfferAction.fulfilled",
    when server response 200`, async ()=> {

      const mockDetailedOffer = makeFakeDetailedOffer();
      const id = mockDetailedOffer.id;
      const mockNeighboringOffers = [makeFakeOffer()];
      const expectedData = {
        detailedOffer: mockDetailedOffer,
        neighboringOffers: mockNeighboringOffers};


      mockAxiosAdapter
        .onGet((`${ApiRoute.Offers}/${id}`))
        .reply(200, mockDetailedOffer);


      mockAxiosAdapter
        .onGet((`${ApiRoute.Offers}/${id}/nearby`))
        .reply(200, mockNeighboringOffers);


      await store.dispatch(fetchDetailedOfferAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchDetailedActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchDetailedOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchDetailedOfferAction.pending.type,
        fetchDetailedOfferAction.fulfilled.type,
      ]);

      expect(fetchDetailedActionFulfilled.payload)
        .toEqual(expectedData);
    });

    it(`should dispatch "fetchDetailedOfferAction.pending", "fetchDetailedOfferAction.rejected",
    when server response 400`, async ()=> {

      const mockDetailedOffer = makeFakeDetailedOffer();
      const id = mockDetailedOffer.id;

      mockAxiosAdapter
        .onGet((`${ApiRoute.Offers}/${id}`))
        .reply(400);


      mockAxiosAdapter
        .onGet((`${ApiRoute.Offers}/${id}/nearby`))
        .reply(400);

      await store.dispatch(fetchDetailedOfferAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchDetailedOfferAction.pending.type,
        fetchDetailedOfferAction.rejected.type,
      ]);
    });
  });


  describe('fetchReviewsAction', ()=> {
    it(`should dispatch "fetchReviewsAction.pending",
      "fetchReviewsAction.fulfilled",
       when server response 200`, async ()=> {

      const mockDetailedOffer = makeFakeDetailedOffer();
      const id = mockDetailedOffer.id;
      const mockReviews = [makeFakeComment()];


      mockAxiosAdapter
        .onGet((`${ApiRoute.Comments}/${id}`))
        .reply(200, mockReviews);


      await store.dispatch(fetchReviewsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it(`should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected",
    when server response 400`, async ()=> {

      const mockDetailedOffer = makeFakeDetailedOffer();
      const id = mockDetailedOffer.id;

      mockAxiosAdapter
        .onGet((`${ApiRoute.Comments}/${id}`))
        .reply(400);

      await store.dispatch(fetchReviewsAction(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });


  describe('fetchFavoritesOffersAction', ()=> {
    it(`should dispatch "fetchFavoritesOffersAction.pending",
      "fetchFavoritesOffersAction.fulfilled",
       when server response 200`, async ()=> {

      const mockFavoritesOffers = [makeFakeOffer()];

      mockAxiosAdapter
        .onGet(ApiRoute.Favorite)
        .reply(200, mockFavoritesOffers);


      await store.dispatch(fetchFavoritesOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesOffersAction.pending.type,
        fetchFavoritesOffersAction.fulfilled.type,
      ]);

      expect(fetchFavoritesOffersActionFulfilled.payload)
        .toEqual(mockFavoritesOffers);
    });

    it(`should dispatch "fetchFavoritesOffersAction.pending",
      "fetchFavoritesOffersActionnFulfilled.rejected",
      when server response 400`, async ()=> {

      mockAxiosAdapter
        .onGet(ApiRoute.Favorite)
        .reply(400);

      await store.dispatch(fetchFavoritesOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesOffersAction.pending.type,
        fetchFavoritesOffersAction.rejected.type,
      ]);
    });
  });

  describe('clearErrorAction', ()=> {
    it(`should dispatch "clearErrorAction.pending",
      "clearErrorAction.fulfilled" `, async ()=> {

      await store.dispatch(clearErrorAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        clearErrorAction.pending.type,
        clearErrorAction.fulfilled.type,
      ]);

    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {

      const mockAuthData: AuthData = {
        email: 'test@mail.com',
        password: 'supersecret',
      };

      const mockUserData: UserData = {
        name: 'Иван Иванов',
        avatarUrl: 'https://example.com/avatar.png',
        isPro: true,
        email: 'test@mail.com',
        token: 'jwt-token-123',
      };

      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200,mockUserData);

      await store.dispatch(loginAction(mockAuthData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {

      const mockAuthData: AuthData = {
        email: 'test@mail.com',
        password: 'supersecret',
      };

      const mockUserData: UserData = {
        name: 'Иван Иванов',
        avatarUrl: 'https://example.com/avatar.png',
        isPro: true,
        email: 'test@mail.com',
        token: 'jwt-token-123',
      };

      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200,mockUserData);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(mockAuthData));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(mockUserData.token);
    });

    it('should call "saveEmail" once with the received email', async () => {

      const mockAuthData: AuthData = {
        email: 'test@mail.com',
        password: 'supersecret',
      };

      const mockUserData: UserData = {
        name: 'Иван Иванов',
        avatarUrl: 'https://example.com/avatar.png',
        isPro: true,
        email: 'test@mail.com',
        token: 'jwt-token-123',
      };

      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200,mockUserData);

      const mockSaveEmail = vi.spyOn(emailStorage, 'saveEmail');

      await store.dispatch(loginAction(mockAuthData));

      expect(mockSaveEmail).toBeCalledTimes(1);
      expect(mockSaveEmail).toBeCalledWith(mockUserData.email);
    });
  });

});

