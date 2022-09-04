import React from 'react';
import ReactDOM from 'react-dom/client';
import Board from '../Board';

describe('Board', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<Board />);
  });
});