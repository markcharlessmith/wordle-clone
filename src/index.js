import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import Header from './Header';
import Footer from './Footer';
import Scoreboard from './Scoreboard';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Header />
    <Scoreboard />
    <App />
    <Footer />
  </StrictMode>
);
