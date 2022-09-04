import React from 'react';
import ReactDOM from 'react-dom/client';
import Archive from '../Archive';

describe('Archive', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<Archive />);
  });
});