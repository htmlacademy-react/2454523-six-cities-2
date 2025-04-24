import {render, screen } from '@testing-library/react';
import FetchingError from './fetching-error';

describe ('Component: FetchingError', ()=> {
  it ('should render correct', () => {
    const expectedHeaderText = /Сервер не доступен/i;
    const expectedParagrphText = /Попробуйте обновить страницу или зайти позже/i;

    render(<FetchingError/>);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedParagrphText)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Сервер не доступен/i }));
  });
});
