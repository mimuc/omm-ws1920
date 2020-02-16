import React from 'react';
import { CustomizedMeme } from './mememuc';
import DeleteForever from '@material-ui/icons/DeleteForever';

import './mememuc-history.css';

interface HistoryProps {
  // TODO: props use to pass savedMemes
  savedMemes: CustomizedMeme[];
  onSelectMeme(customMeme: CustomizedMeme): any;
  onDeleteMemeAtIndex(index: number): any;
}

// The MemeMUCHistoryComponent is a horizontal bar located
// at the webpage bottom
const OmmMemeMUCHistory: React.FC<HistoryProps> = props => {
  // TODO: this property should contain all saved memes, which already
  // exists in the same-named parent component's property.

  const renderMeme = (customMeme: CustomizedMeme, i: number) => (
    <div key={i} className="a-meme-history-item">
      <img onClick={() => props.onSelectMeme(customMeme)} src={customMeme.link.toString()} alt="history" />
      <div onClick={() => props.onDeleteMemeAtIndex(i)} className="mat-icon">
        <DeleteForever />
      </div>
    </div>
  );

  return (
    <div className="history-container">
      <h4>My Favorite Memes</h4>
      <div className="meme-history">
        {/* 
        TODO: this container should contain the saved memes.
        TODO: each saved meme should be rendered as div container 
              containing an img tag (the meme itself) and a mat-icon 
              tag (delete icon)
        TODO: use the css class a-meme-history-item for a meme's 
              container in order to apply the provided styling */}
        {props.savedMemes.map(renderMeme)}
      </div>
    </div>
  );
};

export default OmmMemeMUCHistory;
