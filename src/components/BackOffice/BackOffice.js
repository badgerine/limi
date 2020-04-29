import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoryCard from '../StoryCard/StoryCard';
// import './BackOffice.css';

class BackOffice extends Component {
    state = {
        newStory: null,
        selectedStory: null,
        addingStory: false,
        edittingStory: false
    }

    render() {

        let storyCards = this.props.stories.map(story => (
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
            </div>));

        return (
            <React.Fragment>
                <h1>Story Admin</h1>
                <div>
                    <span><input type="text" /> <button>Search</button></span>
                </div>
                <br />
                <div>
                    <span>New Story <button>Add</button></span>
                </div>
                <br />
                <div>
                    <span> Remove Stories <button>Go</button></span>
                </div>
                <br />
                <hr/>
                {storyCards}

            </React.Fragment>
        );
    }
}

//stores a function
const mapStateToProps = (state) => {
    return {
       stories: state.stories
    };
};

export default connect(mapStateToProps)(BackOffice);