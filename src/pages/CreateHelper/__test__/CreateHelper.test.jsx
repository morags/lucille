import React from 'react';
import ReactDOM from 'react-dom/client';
import CreateHelper from '../CreateHelper';

describe('CreateHelper', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<CreateHelper />);
  });
});