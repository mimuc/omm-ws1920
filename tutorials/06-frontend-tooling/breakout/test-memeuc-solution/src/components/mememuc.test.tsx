import React from 'react';
import ReactDOM from 'react-dom';
import MemeMUC from './mememuc';
import { render, act,fireEvent } from '@testing-library/react';

// 1. MemeMUC component renders without errors
it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemeMUC />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// 2. The middle image shows correctly if user clicks image from the left
it('shows image correctly when clicked', () => {
  const { getByRole } = render(<MemeMUC />);
  fireEvent.click(getByRole('img'));
  const results = document.querySelector('.results img');
  expect(results).toBeDefined();
  expect(results!.getAttribute('src')).toBe('http://212.227.193.27:3000/memes/doge?text=&x=0&y=0&text2=&x2=0&y2=0');
});

// 3. The middle image is rendered correct if user inputs upper text or lower text
it('shows image correctly when clicked', () => {
  const { getByRole, getByPlaceholderText } = render(<MemeMUC />);

  // an image is selected
  act(() => {
    fireEvent.click(getByRole('img'));
  });
  let results = document.querySelector('.results img');
  expect(results).toBeDefined();
  expect(results!.getAttribute('src')).toBe('http://212.227.193.27:3000/memes/doge?text=&x=0&y=0&text2=&x2=0&y2=0');

  // input texts
  act(() => {
    fireEvent.change(getByPlaceholderText('Upper Text'), {target: {value: 'Testing'}})
  });
  expect(results!.getAttribute('src')).toBe('http://212.227.193.27:3000/memes/doge?text=Testing&x=0&y=0&text2=&x2=0&y2=0');
});
