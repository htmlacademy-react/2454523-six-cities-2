import { render, screen} from '@testing-library/react';
import { withStore } from '../../utilsMocks/mock-component';
import ErrorMessage from './error-massage';
import { makeFakeStore } from '../../utilsMocks/mocks';

describe('ErrorMessage', ()=> {

  it('should render correctly', ()=> {
    const {withStoreComponent} = withStore(<ErrorMessage/>,
      makeFakeStore({
        ERROR: {
          error: 'error-message'
        }
      }));

    render(withStoreComponent);

    expect(screen.getByText('error-message')).toBeInTheDocument();

  });

  it('does not render anything when there is no error', ()=> {
    const {withStoreComponent} = withStore(<ErrorMessage/>,
      makeFakeStore({
        ERROR: {
          error: null
        }
      }));

    const { container } = render(withStoreComponent);
    expect(container.firstChild).toBeNull();

  });

});
