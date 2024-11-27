import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Login from './components/Login.jsx';

const appElement = document.getElementById('app');

if (appElement) {
    const root = createRoot(appElement);
    root.render(<Login />);
}
