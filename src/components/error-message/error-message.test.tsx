import { render, screen} from '@testing-library/react';
import { withStore } from '../../utils-mocks/mock-component';
import ErrorMessage from './error-message';
import { makeFakeStore } from '../../utils-mocks/mocks';

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
