import React, { Component } from 'react';
import './StoryDeck.css';
import MenuBar from '../MenuBar/MenuBar';
import StoryCard from '../../components/StoryCard/StoryCard';

class StoryDeck extends Component {
    render() {
        return (
            // <React.Fragment>
            <div>
                <MenuBar />
                <section className="StoryDeck">
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                </section>
            </div>
            // </React.Fragment>
        );
    }

}

export default StoryDeck;