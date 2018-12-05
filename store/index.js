import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import FetchData from './FetchData';

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default ({ children }) => (
  <Provider store={store}>
    <FetchData>{children}</FetchData>
  </Provider>
);
