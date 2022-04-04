import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from './redux/configureStore';
import App from './shared/App';
import store from "./redux/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
