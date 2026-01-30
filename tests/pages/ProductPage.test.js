import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store';
import { MemoryRouter } from 'react-router-dom';
import ProductPage from '../../src/pages/ProductPage';

test('renders ProductPage component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>
    </Provider>
  );
  // Add your assertions here
});
