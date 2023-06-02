import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { db,auth,storage } from './firebase/config';
import './index.css';
import { FirebaseContext } from './store/Context';
import Context from "./store/Context";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={ { db,auth,storage }}>
      <Context>
         <App />
      </Context>
     
    </FirebaseContext.Provider>
  </React.StrictMode>
);
