import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import AuthProvider from 'app/auth/auth.provider';
import { initializeApp } from 'firebase/app';
import { SnackbarProvider } from 'notistack';
import AppRoutes from 'routing/app.routes';
import store, { persistor } from 'store';
import ThemeProvider from 'theme';

import { firebaseConfig } from './firebase-config';

import './App.css';

export const router = createBrowserRouter([{ path: '*', element: <AppRoutes /> }]);

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SnackbarProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
