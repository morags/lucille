/* For more info on testing, see:
 * https://create-react-app.dev/docs/running-tests
 * https://jestjs.io/docs/tutorial-react
 * https://testing-library.com/docs/react-testing-library/intro
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

import { render, screen } from '@testing-library/react';

import App from '../App';

// Using Jest
describe('App', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<App />);
  });
});

// Using Testing Library
describe('New list button', () => {
  it('is accessible', () => {
    render(<App />);
    expect(screen.getByAltText('New list')).toBeInTheDocument();
  });
});
