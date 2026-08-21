import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the prediction interface', () => {
  render(<App />);

  expect(screen.getByText(/career outcome prediction/i)).toBeInTheDocument();
  expect(screen.getByText(/upload a csv of grades/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /upload csv file/i })).toBeInTheDocument();
});
