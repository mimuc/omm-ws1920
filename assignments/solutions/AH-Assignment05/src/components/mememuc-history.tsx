import React from 'react';
import {CustomizedMeme} from './mememuc';

interface HisotryProps {
  // TODO: props use to pass savedMemes
}

// The MemeMUCHistoryComponent is a horizontal bar located 
// at the webpage bottom
const OmmMemeMUCHistory: React.FC<HisotryProps> = (props) => {
  // TODO: this property should contain all saved memes, which already 
  // exists in the same-named parent component's property.

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
      </div>
    </div>
  )
};

export default OmmMemeMUCHistory;