import React from 'react';
import ReactDOM from 'react-dom/client';
import Guide from '../Guide';

describe('Guide', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<Guide />);
  });
});