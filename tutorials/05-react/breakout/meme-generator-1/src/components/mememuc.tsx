import React from 'react';
import './mememuc.css';

const MEME_API_BASE_URL = 'http://212.227.193.27:3000';

interface Meme {
  name: string;
  link: string;
}

interface Caption {
  topText: string
  topX: number
  topY: number
  bottomText: string
  bottomX: number
  bottomY: number
}

interface OmmMemeMUCState {
  selectedBaseImage?: Meme
  memes: Meme[]
  caption: Caption
}

export default class OmmMemeMUC extends React.Component<{}, OmmMemeMUCState> {
  state = {
    selectedBaseImage: undefined,
    memes: [
      {
        name: 'doge',
        link: `${MEME_API_BASE_URL}/memes/doge`,
      },
    ],
    caption: {
      topText: '', topX: 0, topY: 0,
      bottomText: '', bottomX: 0, bottomY: 0,
    }
  }

  selectBaseImage = (meme: Meme) => {
    // TODO:
  }

  memeURL = () => {
    // TODO:
  }

  captionChanged = (e: any) => {
    // TODO:
  }

  render() {
    // TODO:
  }
};
