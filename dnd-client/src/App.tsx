import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'app.routes';
import { Provider } from 'react-redux';
import store, { persistor } from 'store';
import { ThemeProvider } from '@mui/material';
import { theme } from 'theme/theme';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';
import AuthProvider from 'app/auth/auth.provider';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <AuthProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
