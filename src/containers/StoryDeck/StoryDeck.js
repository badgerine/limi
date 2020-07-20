import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StoryDeck.css';
import StoryCard from '../../components/StoryCard/StoryCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../store/actions';

class StoryDeck extends Component {

    componentDidMount() {
        if (!this.props.storiesLoaded) {
            this.props.onLoadStories();
        }
    }

    componentDidUpdate(){
        if(this.props.storiesModified){
            this.props.onLoadStories();
        }
    }

    storySelectedHandler = (id, mediaId) => {
        this.props.history.push({
            pathname: 'story-roll/' + id,
            search: '?mediaId=' + mediaId
        })
    }

    render() {
        let storyCards = <CircularProgress color="secondary" />;
        if(this.props.stories.length > 1) {
            storyCards = this.props.stories.map(story => (
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
        }
        
        return (
            <div>
                <section className="StoryDeck">
                    {storyCards}
                </section>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        stories: state.stories,
        storiesLoaded: state.storiesLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadStories: () => dispatch(actions.fetchStories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryDeck);