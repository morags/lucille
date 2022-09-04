import React from 'react';
import ReactDOM from 'react-dom/client';
import BoardDetail from '../BoardDetail';

describe('BoardDetail', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<BoardDetail />);
  });
});