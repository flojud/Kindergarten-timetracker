import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Notification from './components/common/Notification';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import { NotificationContextProvider } from './contexts/NotificationContextProvider';
import { ThemeContextProvider } from './contexts/ThemeContextProvider';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

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

serviceWorkerRegistration.register();
