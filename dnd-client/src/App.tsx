import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "app.routes";
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
