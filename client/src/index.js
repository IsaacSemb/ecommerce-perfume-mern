// this one is obvious why we need it
import React from 'react';

// the react dom that mimics our normal browser dom 
import ReactDOM from 'react-dom/client';

// normal file importation for the app file where our program resides
import App from './App';

// idk what the hell this is
import reportWebVitals from './reportWebVitals';

// import the custom authentication provider we made
import {  AuthenticationNecessitiesProvider } from '../src/components/AuthenticationContext';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthenticationNecessitiesProvider>
    <App />
    </AuthenticationNecessitiesProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

