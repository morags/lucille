import React from 'react';
import ReactDOM from 'react-dom/client';
import Setup from '../Setup';

describe('Setup', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<Setup />);
  });
});
