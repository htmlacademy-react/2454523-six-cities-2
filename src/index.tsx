import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { offers, detailedOffers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { neighboringOffers } from './mocks/neighboringOffers';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        offers = {offers}
        detailedOffers = {detailedOffers}
        reviews = {reviews}
        neighboringOffers = {neighboringOffers}
      />
    </Provider>
  </React.StrictMode>
);
