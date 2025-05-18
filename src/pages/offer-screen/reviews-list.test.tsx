import { vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utils-mocks/mock-component';
import { makeFakeComment, makeFakeStore } from '../../utils-mocks/mocks';
import ReviewsList from './reviews-list';
import { AuthorizationStatus, MAX_REVIEW_COUNT } from '../../const';
import { Review } from '../../types/review';


vi.mock('./review-form', () => ({
  default: () => <div data-testid='review-form-mock' />
}));


vi.mock('./review-item', () => ({
  default: ({ review }: { review: Review }) => (
    <li data-testid="review-item">
      <span data-testid="review-user">{review.user.name}</span>
      <span data-testid="review-text">{review.comment}</span>
      <span data-testid="review-date">{review.date}</span>
    </li>
  ),
}));

describe('ReviewsList', () => {

  it('should render correctly', ()=> {
    const withHistoryComponent = withHistory(<ReviewsList />);
    const comment = makeFakeComment();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        REVIEWS:{
          isSubmitting:false,
          isSubmittingFailed: false,
          isReviewsLoading: false,
          reviews: [comment],
          isReviewsFetchingError: false
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();

  });

  it('should render review-form when AuthorizationStatus is Auth', ()=> {
    const withHistoryComponent = withHistory(<ReviewsList />);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER:{
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test'
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId('review-form-mock')).toBeInTheDocument();
  });
  it('should not render review-form when AuthorizationStatus is NoAuth', ()=> {
    const withHistoryComponent = withHistory(<ReviewsList />);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER:{
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null
        }
      })
    );

    render(withStoreComponent);

    expect(screen.queryByTestId('review-form-mock')).not.toBeInTheDocument();
  });

  it('should render no more than MAX_COMMENT_LENGTH comments', ()=> {
    const withHistoryComponent = withHistory(<ReviewsList />);
    const comments = Array.from(
      { length: MAX_REVIEW_COUNT + 3 },
      () => makeFakeComment()
    );

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        REVIEWS:{
          isSubmitting:false,
          isSubmittingFailed: false,
          isReviewsLoading: false,
          reviews: comments,
          isReviewsFetchingError: false
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getAllByTestId('review-item')).toHaveLength(MAX_REVIEW_COUNT);

  });

  it('should render reviews in descending order by date', ()=> {
    const withHistoryComponent = withHistory(<ReviewsList />);
    const oldComment = {
      ...makeFakeComment(),
      date: '2020-01-01T00:00:00.000Z'
    };

    const newComment = {
      ...makeFakeComment(),
      date: '2021-01-01T00:00:00.000Z'
    };


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        REVIEWS:{
          isSubmitting:false,
          isSubmittingFailed: false,
          isReviewsLoading: false,
          reviews: [oldComment, newComment],
          isReviewsFetchingError: false
        }
      })
    );

    render(withStoreComponent);

    const dates = screen.getAllByTestId('review-date');

    expect(dates[0]).toHaveTextContent(newComment.date);
    expect(dates[1]).toHaveTextContent(oldComment.date);

  });


});
