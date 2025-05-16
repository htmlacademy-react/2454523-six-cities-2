import { vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utils-mocks/mock-component';
import { extractActionsTypes, makeFakeComment, makeFakeStore } from '../../utils-mocks/mocks';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';
import { ApiRoute } from '../../const';
import { postReviewAction } from '../../store/api-actions';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useParams: () => ({ offerId: 'abc123' }),
  };
});

describe('ReviewForm', () => {
  it('should render correctly', ()=> {
    const withHistoryComponent = withHistory(<ReviewForm />);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    const expectedTest = /To submit review please make sure to set/i;
    const expectedPlaceholderText = /Tell how was your stay, what you like and what can be improved/i;
    render(withStoreComponent);

    expect(screen.getByText(expectedTest)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedPlaceholderText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

  });


  it('should render correctly when user enter comment', async () => {
    const expectedReviewsTextValue = 'test-comment';

    const withHistoryComponent = withHistory(<ReviewForm />);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId('reviewsTextElement'), expectedReviewsTextValue);

    expect(screen.getByDisplayValue(expectedReviewsTextValue)).toBeInTheDocument();

  });

  it('should render correctly when user enter stars', async () => {
    const expectedStarsValue = 5;

    const withHistoryComponent = withHistory(<ReviewForm />);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);

    const starInput = screen.getByDisplayValue(expectedStarsValue);

    await userEvent.click(starInput);

    expect(starInput).toBeChecked();
  });


  it('should dispatch "postReviewAction" when user clicked submitButton', async () => {
    const expectedReviewsTextValue = 'test-comment/test-comment/test-comment/test-comment/test-comment';
    const expectedStarsValue = 5;
    const id = 'abc123';

    const withHistoryComponent = withHistory(<ReviewForm />);

    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);

    await userEvent.type(screen.getByTestId('reviewsTextElement'), expectedReviewsTextValue);

    const starInput = screen.getByDisplayValue(expectedStarsValue);
    await userEvent.click(starInput);


    const fakeComment = makeFakeComment();

    mockAxiosAdapter
      .onPost((`${ApiRoute.Comments}/${id}`))
      .reply(200, fakeComment);

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type,
    ]);
  });
});
