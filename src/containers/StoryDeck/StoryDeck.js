import React, { Component } from 'react';
import './StoryDeck.css';
import MenuBar from '../MenuBar/MenuBar';
import StoryCard from '../../components/StoryCard/StoryCard';
import { Link } from 'react-router-dom';
import storyCard from '../../components/StoryCard/StoryCard';

class StoryDeck extends Component {

    state = {
        loadDeck: true,
        stories: [
            {
                id: "1",
                title: "Colbert's dancing dreadlocks",
                synopsis: "The more Colbert practises his guitar, the more he can feel the vibration of the music.",
                genre: "fiction",
                readingTime: "15 mins",
                audioLanguage: "Venda",
                primaryText: "English",
                secondaryText: "Venda",
                author: "EM"
            },
            {
                id: "2",
                title: "Nitshitzivu finds a flying horse",
                synopsis: "Nitshitzivu is constantly exploring the huge garden at her grandmother's. One day she meets an unexpected friend.",
                genre: "fiction",
                readingTime: "15 mins",
                audioLanguage: "Venda",
                primaryText: "English",
                secondaryText: "Venda",
                author: "EM"
            },
            {
                id: "3",
                title: "Luthendo builds a flying skateboard",
                synopsis: "Luthendo loves playing on her skateboard, but she also likes playing with machines. Sometimes she doesnt know which one to play with.",
                genre: "fiction",
                readingTime: "15 mins",
                audioLanguage: "Venda",
                primaryText: "English",
                secondaryText: "Venda",
                author: "EM"
            },
            {
                id: "4",
                title: "Thoni's electric soccer ball",
                synopsis: "Thoni always wanted to be football star, but he keeps missing the goals. What if he could control where the ball goes another way.",
                genre: "fiction",
                readingTime: "15 mins",
                audioLanguage: "Venda",
                primaryText: "English",
                secondaryText: "Venda",
                author: "EM"
            },
            {
                id: "5",
                title: "Tintswalo's remote controlled cow",
                synopsis: "Tintswalo lives with her older brother who is always looking for one of his cows that go wandering off. She starts working on a solution.",
                genre: "fiction",
                readingTime: "15 mins",
                audioLanguage: "Tsonga",
                primaryText: "English",
                secondaryText: "Tsonga",
                author: "EM"
            },
            {
                id: "6",
                title: "Ngadji builds a robot",
                synopsis: "Ngadji is always being told to wash the dishes, or clean the house. She also has a great imagination and is not afraid to try new things.",
                genre: "fiction",
                readingTime: "15 mins",
                audioLanguage: "Tsonga",
                primaryText: "English",
                secondaryText: "Tsonga",
                author: "EM"
            },
            {
                id: "7",
                title: "Nkateko's electric wand",
                synopsis: "Nkateko lives in a hidden village surrounded by a think forest. Sometimes his sheep run off and he has to find them in the dark night. How can he create light without burning the forest?",
                genre: "fiction",
                readingTime: "15 mins",
                audioLanguage: "Tsonga",
                primaryText: "English",
                secondaryText: "Tsonga",
                author: "EM"
            },
        ]
    }

    componentDidMount() {
        const stories = this.state.stories.slice(0,6);
        this.setState({stories: stories});
    }

    // storySelectedHandler = () => {

    // }

    render() {
        let storyCards = this.state.stories.map(story => (
            // <Link to={"/story-roll/" + story.id} key={story.id} style={{ textDecoration: 'none' }}>
                <StoryCard 
                    id={story.id}
                    title={story.title}
                    synopsis={story.synopsis}
                    genre={story.genre}
                    readingTime={story.readingTime}
                    audioLanguage={story.audioLanguage}
                    primaryText={story.primaryText}
                    secondaryText={story.secondaryText}
                    author={story.author} 
                    // clicked={this.storySelectedHandler}
                    />
            // </Link>
        ));
        return (
            // <React.Fragment>
            <div>
                <section className="StoryDeck">
                   {storyCards}
                </section>
            </div>
            // </React.Fragment>
        );
    }

}

export default StoryDeck;