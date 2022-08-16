import { render, screen } from '@testing-library/react';
import Router from './App';

test('renders learn react link', () => {
  render(<Router />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
