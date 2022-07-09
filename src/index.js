import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import Header from './Header';
import Footer from './Footer';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Header />
    <App />
    <Footer />
  </StrictMode>
);
