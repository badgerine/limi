import React from 'react';
import './StoryCard.css';

const storyCard = (props) => (
    <article className="StoryCard" onClick={props.clicked}>
        <h2>{props.title}</h2>
        <div>
            <div className="Synopsis"><span>Synopsis:</span> {props.synopsis}</div>
            <div className="Info"><span>Genre: </span>{props.genre}</div>
            <div className="Info"><span>Reading Time: </span>{props.readingTime}</div>
            <div className="Info"><span>Audio Language: </span>{props.audioLanguage}</div>
            <div className="Info"><span>Text Language: </span>{props.primaryText}</div>
            <div className="Info"><span>Text Language Alt: </span>{props.secondaryText}</div>
            <div className="Info"><span>Author: </span>{props.author}</div>
        </div>
    </article>
)

export default storyCard;