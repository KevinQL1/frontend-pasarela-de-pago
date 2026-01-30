import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store';
import { MemoryRouter } from 'react-router-dom';
import SummaryPage from '../../src/pages/SummaryPage';

test('renders SummaryPage component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SummaryPage />
      </MemoryRouter>
    </Provider>
  );
  // Add your assertions here
});
