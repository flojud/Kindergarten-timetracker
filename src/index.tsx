import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import Notification from './components/Notification';
import './index.css';
import { NotificationContextProvider } from './contexts/NotificationContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <BrowserRouter>
      <NotificationContextProvider>
        <AuthContextProvider>
          <App />
          <Notification />
        </AuthContextProvider>
      </NotificationContextProvider>
    </BrowserRouter>
  </>
);
