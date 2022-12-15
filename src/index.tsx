import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import Notification from './components/common/Notification';
import './index.css';
import { NotificationContextProvider } from './contexts/NotificationContextProvider';
import { ThemeContextProvider } from './contexts/ThemeContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <BrowserRouter>
      <ThemeContextProvider>
        <NotificationContextProvider>
          <AuthContextProvider>
            <App />
            <Notification />
          </AuthContextProvider>
        </NotificationContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </>
);
