import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<Navbar />);
  });
});