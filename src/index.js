import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from "./store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GG_KEY}>
  <Provider store={store}>
  <App/>
  </Provider>
  </GoogleOAuthProvider>

);

