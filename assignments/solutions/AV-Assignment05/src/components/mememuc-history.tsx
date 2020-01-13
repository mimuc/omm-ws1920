import React from 'react'
import './mememuc-history.css';
import {CustomizedMeme} from './mememuc';
import DeleteForever from '@material-ui/icons/Delete';


interface HisotryProps {
    savedMemes: CustomizedMeme[],
    deleteMeme: any
}

const OmmMemeMUCHistory: React.FC<HisotryProps> = (props: HisotryProps) => {
    return (
        <div className="history-container">
            <h4>My Favorite Memes</h4>
            <div className="meme-history">

                {
                    props.savedMemes.map((meme, key) => {
                        return (
                            <div key={key} className={"a-meme-history-item"}>
                                <img className={"a-meme-history-item img"} src={meme.link.href}/>
                                <div className={'a-meme-history-item mat-icon'} onClick={() => props.deleteMeme(key)}>
                                    <DeleteForever/>
                                </div>
                            </div>)
                    })
                }
            </div>
        </div>
    )
};

export default OmmMemeMUCHistory;