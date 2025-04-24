import {render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeComment } from '../../utilsMocks/mocks';


describe ('Component: ReviewItem', ()=> {
  it ('should render correct', () => {
    const fakeComment = makeFakeComment();

    render(<ReviewItem review = {fakeComment}/>);

    const img = screen.getByRole('img', { name: /reviews avatar/i });

    expect(img).toHaveAttribute('src', fakeComment.user.avatarUrl);
    expect(img).toHaveAttribute('width', '100');
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();

  });
});
