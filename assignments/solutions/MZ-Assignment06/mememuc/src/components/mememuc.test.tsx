import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen, wait } from '@testing-library/react';

import OmmMememuc from './mememuc';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<OmmMememuc />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders meme correctly', async () => {
  const { container } = render(<OmmMememuc />);

  // Wait for memes to be loaded from API
  await wait(() => screen.getByAltText('raptor meme'));

  // get the meme
  fireEvent.click(screen.getByAltText('doge meme'));

  // fill out the captions
  fireEvent.change(screen.getByPlaceholderText('Upper Text'), { target: { value: 'ate too many chickem nuggers' } });
  fireEvent.change(screen.getByPlaceholderText('Lower Text'), { target: { value: 'need to sleep plz' } });

  expect(container.querySelector('.results')).toMatchSnapshot();
});

describe('Test meme handling', () => {
  // Note:
  // Bad practice to test one component through another, but for simplity I want to keep everything in this file.

  let containerDOM: HTMLElement;
  beforeEach(async () => {
    const { container } = render(<OmmMememuc />);
    containerDOM = container;

    // Wait for memes to be loaded from API
    await wait(() => screen.getByAltText('raptor meme'));

    const saveMeme = (meme: string, text1: string, text2: string) => {
      fireEvent.click(screen.getByAltText(meme));
      fireEvent.change(screen.getByPlaceholderText('Upper Text'), { target: { value: text1 } });
      fireEvent.change(screen.getByPlaceholderText('Lower Text'), { target: { value: text2 } });
      fireEvent.click(screen.getByText('Save to favorites'));
    };

    saveMeme('doge meme', 'ate too many chickem nuggers', 'need to sleep plz');
    saveMeme('boromir meme', 'One does not simply', 'skip the assignments');
    saveMeme('raptor meme', "Isn't the raptor claw", 'on the foot?');
  });

  it('saves meme to favorites', async () => {
    expect(containerDOM.querySelector('.meme-history')).toMatchSnapshot();
  });

  it('allows meme to be restored from favorites', async () => {
    const resultsBefore = containerDOM.querySelector('.results');
    expect(resultsBefore).toMatchSnapshot();

    const firstMeme = containerDOM.querySelector('.a-meme-history-item img');
    expect(firstMeme).toBeTruthy();
    fireEvent.click(firstMeme!);

    const resultsAfter = containerDOM.querySelector('.results');
    expect(resultsAfter).toMatchSnapshot();
  });

  it('allows meme to be removed from favorites', async () => {
    expect(containerDOM.querySelectorAll('.a-meme-history-item').length).toBe(3);

    // Get second meme
    const secondMeme = containerDOM.querySelector('.meme-history .a-meme-history-item:nth-child(2) .mat-icon');
    expect(secondMeme).toBeTruthy();
    fireEvent.click(secondMeme!);

    expect(containerDOM.querySelectorAll('.a-meme-history-item').length).toBe(2);
    expect(containerDOM.querySelector('.meme-history')).toMatchSnapshot();
  });
});
