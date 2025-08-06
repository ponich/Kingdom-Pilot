import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/ui';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App version="0.0.1" />);
} else {
  console.error('Root container not found');
}
