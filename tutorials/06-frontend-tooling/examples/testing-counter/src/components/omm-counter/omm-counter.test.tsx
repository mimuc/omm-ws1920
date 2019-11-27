import React from 'react';
import OmmCounter from './omm-counter';
import { render, fireEvent } from '@testing-library/react';

it('renders without crashing', async () => {
  const { getByText } = render(<OmmCounter />);
  const text = document.querySelector('.counter-state');
  expect(text!.innerHTML).toBe('0');
});

it('plus button works', () => {
  const { getByText } = render(<OmmCounter />);
  fireEvent.click(getByText('+'));
  const text = document.querySelector('.counter-state');
  expect(text).toBeDefined();
  expect(text!.innerHTML).toBe('1'); // similar to above
});

it('minus button works', () => {
  const { getByText } = render(<OmmCounter />);
  fireEvent.click(getByText('-'));
  const text = document.querySelector('.counter-state');
  expect(text).toBeDefined();
  expect(text!.innerHTML).toBe('-1');
});