import React from 'react';
import ReactDOM from 'react-dom/client';
import Helper from '../Helper';

describe('Helper', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<Helper />);
  });
});