import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StoryDeck.css';
import MenuBar from '../MenuBar/MenuBar';
import StoryCard from '../../components/StoryCard/StoryCard';
import { Link } from 'react-router-dom';
import storyCard from '../../components/StoryCard/StoryCard';

class StoryDeck extends Component {

    state = {
        loadDeck: true,
    }

    componentDidMount() {
        // const stories = this.props.stories.slice(0, 6);
        // this.setState({ stories: stories });
    }

    storySelectedHandler = (id, mediaId) => {
        this.props.history.push({
            pathname: 'story-roll/' + id,
            search: '?mediaId=' + mediaId
        })
    }

    render() {
        let storyCards = this.props.stories.map(story => (
            // <Link to={"/story-roll/" + story.id} key={story.id} style={{ textDecoration: 'none' }}>
            //     <StoryCard
            //         id={story.id}
            //         title={story.title}
            //         synopsis={story.synopsis}
            //         genre={story.genre}
            //         readingTime={story.readingTime}
            //         audioLanguage={story.audioLanguage}
            //         primaryText={story.primaryText}
            //         secondaryText={story.secondaryText}
            //         author={story.author}
            //     // clicked={this.storySelectedHandler}
            //     />
            // </Link>
            <div key={story.id} style={{ textDecoration: 'none' }}>
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
                    clicked={() => this.storySelectedHandler(story.id, story.mediaId)}
                />
            </div>
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

const mapStateToProps = (state) => {
    return {
        stories: state.stories
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryDeck);