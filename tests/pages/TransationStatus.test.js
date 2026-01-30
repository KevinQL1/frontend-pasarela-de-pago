import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store';
import { MemoryRouter } from 'react-router-dom';
import TransationStatus from '../../src/pages/TransationStatus';

test('renders TransationStatus component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TransationStatus />
      </MemoryRouter>
    </Provider>
  );
  // Add your assertions here
});
