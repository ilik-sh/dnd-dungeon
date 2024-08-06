import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppRoutes from 'app/routing/app.routes';
import { initializeApp } from 'firebase/app';
import { SnackbarProvider } from 'notistack';
import store from 'store';

import ThemeProvider from 'shared/theme';

import { firebaseConfig } from './app/config/firebase-config';

export const router = createBrowserRouter([{ path: '*', element: <AppRoutes /> }]);

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
