import { NuqsAdapter } from 'nuqs/adapters/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  </StrictMode>
);
