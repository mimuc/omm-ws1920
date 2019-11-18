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

const OmmMemeMUC: React.FC = () => {
  // TODO:
};

export default OmmMemeMUC;