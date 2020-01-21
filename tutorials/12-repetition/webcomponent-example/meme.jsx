import React from 'react';
import './Meme.css';

class Meme extends React.Component {
    render() {
        return (
            <div className="meme">
                <img src={this.props.imgSrc}/>
                <p className="captionTop">{this.props.captionTop}</p>
                <p className="captionBottom">{this.props.captionBottom}</p>
            </div>
        )
    }
}
export default Meme;
