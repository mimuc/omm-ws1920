
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
    this.setState({selectedBaseImage: meme})
  }

  memeURL = () => {
    var meme: Meme = this.state.selectedBaseImage!
    if (!meme) {
      return null
    }
    const url = new URL(meme!.link);
    const params: {[index: string]: string} = {
      text: this.state.caption.topText,
      x: this.state.caption.topX.toString(),
      y: this.state.caption.topY.toString(),
      text2: this.state.caption.bottomText,
      x2: this.state.caption.bottomX.toString(),
      y2: this.state.caption.bottomY.toString(),
    }
    for (let key in params) {
      url.searchParams.append(key, params[key])
    }
    return url
  }

  captionChanged = (e: any) => {
    this.setState({
      ...this.state,
      caption: {
        ...this.state.caption,
        [e.target.name]: e.target.value,
      },
    })
  }

  render() {
    let results = (<h3>No Meme Selected</h3>)
    let url = this.memeURL()
    if (url) {
      results = (<img src={url.toString()} alt="selected"/>)
    }

    return (<div className="mememuc">
      <ul className="meme-list">
        {
          this.state.memes.map((meme) => {
            return (
              <li key={meme.link} onClick={() => {this.selectBaseImage(meme)}}>
                <img src={meme.link} alt="lists"/>
              </li>
            )
          })
        }
      </ul>
      <div className="results">
        {results}
      </div>
      <div className="params">
        <div className="texts">
          <input name="topText" value={this.state.caption.topText} onChange={this.captionChanged} type="text" placeholder="Upper Text"/>
          <input name="bottomText" value={this.state.caption.bottomText} onChange={this.captionChanged} type="text" placeholder="Lower Text"/>
        </div>
        <div className="positions">
          <input name="topX" value={this.state.caption.topX} onChange={this.captionChanged} type="number"/>
          <input name="topY" value={this.state.caption.topY} onChange={this.captionChanged} type="number"/>
          <input name="bottomX" value={this.state.caption.bottomX} onChange={this.captionChanged} type="number"/>
          <input name="bottomY" value={this.state.caption.bottomY} onChange={this.captionChanged} type="number"/>
        </div>
      </div>
    </div>);
  }
};