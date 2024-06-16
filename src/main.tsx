import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import { queryClient } from './app/config';
import { QueryClientProvider } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
