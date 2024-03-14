import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "app.routes";
import { Provider } from "react-redux";
import store from "store";
import { ThemeProvider } from "@mui/material";
import { theme } from "theme/theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
