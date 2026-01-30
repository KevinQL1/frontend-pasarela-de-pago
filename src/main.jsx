import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '#/app/store.js';
import App from '#/App.jsx';

/**
 * Provider permite que cualquier componente
 * acceda al estado global de Redux
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
);
