import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store';
import { MemoryRouter } from 'react-router-dom';
import PaymentPage from '../../src/pages/PaymentPage';

test('renders PaymentPage component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PaymentPage />
      </MemoryRouter>
    </Provider>
  );
  // Add your assertions here
});
