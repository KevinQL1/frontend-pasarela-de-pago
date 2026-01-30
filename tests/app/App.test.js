import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store';
import App from '../../src/App';

test('renders App component', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Add your assertions here
});
