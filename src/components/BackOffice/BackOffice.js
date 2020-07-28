import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Spinner from '../../containers/Layout/UI/Spinner/Spinner';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-stories';
import layoutClass from '../../containers/Layout/styles';
import * as actions from '../../store/actions';
import StoryCard from '../StoryCard/StoryCard';
import './BackOffice.css';
import { mediaUpload, newStoryForm } from './NewStory';



const styles = theme => ({
    card: {
        borderRadius: 0,
    }
});

class BackOffice extends Component {
    state = {
        selectedStory: null,
        storyAdded: false,
        edittingStory: false,
        newStoryOpen: false,
        newStory: null,
        nextCount: 0
    }

    componentDidMount() {
        if (!this.props.storiesLoaded || this.props.storiesModified) {
            this.props.onLoadStories();
        }
    }

    componentDidUpdate() {
        if (this.props.storiesModified) {
            this.props.onLoadStories();
        }
    }

    toggleNext = () => {
        this.setState((prevState, props) => ({
            nextCount: prevState.nextCount + 1
        }));

    }

    toggleBack = () => {

    }

    updateNewStoryMediaId = (mediaId) => {
        if (mediaId != this.state.newStory.mediaId) {
            const incompleteStory = { ...this.state.newStory };
            incompleteStory[mediaId] = mediaId;
            console.log('[Backoffice.updateNewStoryMediaId]', 'trying to set the mediaId', mediaId);
            this.setState({ newStory: incompleteStory });
        }
    }


    toggleNewStory = () => {
        const open = this.state.newStoryOpen;
        this.setState({ newStoryOpen: !open });
    }

    memoriseStory = (newStoryInput) => {
        if (this.state.nextCount == 0) {
            console.log('[Backoffice.memoriseStory]', newStoryInput);
            this.setState({ newStory: newStoryInput });
            this.toggleNext();
        } else {
            console.log('[Backoffice.memoriseStory]', 'trying to set the mediaId', newStoryInput);
            this.setState({ newStoryOpen: false, newStory: newStoryInput }, () => this.handleSubmitStory());
        }
        // return {newStoryOpen: false, newStory: {default: "sdfjlk"}};
    }

    handleSubmitStory = () => {
        const completeNewStory = { ...this.state.newStory };
        axios.post('stories.json', completeNewStory)
            .then(response => {
                this.props.onAddStory(completeNewStory);
                console.log('[Backoffice.handleSubmitStory]', response);
            })
            .catch(error => {
                console.log('[Backoffice.handleSubmitStory]Error, something went wrong trying to persist story.', error);
            })
    }

    storySelectedHandler = (storyId, mediaId) => {
        console.log('story selected=', storyId, " | ", mediaId);
    }

    render() {
        const { classes } = this.props;

        let newStoryInput = {};
        let newStoryCard = null;
        if (this.state.newStory) {
            newStoryCard = (<div style={{ textDecoration: 'none' }}>
                <StoryCard
                    id={this.state.newStory.id}
                    title={this.state.newStory.title}
                    synopsis={this.state.newStory.synopsis}
                    genre={this.state.newStory.genre}
                    readingTime={this.state.newStory.readingTime}
                    audioLanguage={this.state.newStory.audioLanguage}
                    primaryText={this.state.newStory.primaryText}
                    secondaryText={this.state.newStory.secondaryText}
                    author={this.state.newStory.author}
                    mediaId={this.state.newStory.mediaId}
                    clicked={() => this.storySelectedHandler(this.state.newStory.id, this.state.newStory.mediaId)}
                />
            </div>);
        }

        let storyCards = (
            <div style={{ width: '100%', height: '100%' }}>
                <Spinner />
            </div>
        );
        if (this.props.stories.length > 0) {
            storyCards = this.props.stories.map(story => (
                <Box p={1} key={story.id} style={{ textDecoration: 'none' }}>
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
                </Box>));
        }

        let newStoryEntry = null;
        switch (this.state.nextCount) {
            case 0: newStoryEntry = newStoryForm(newStoryInput, classes);
                break;
            case 1: newStoryEntry = mediaUpload(this.state.newStory.title,
                // (mediaIdInput) => this.updateNewStoryMediaId(mediaId));
                (mediaIdInput) => {
                    newStoryInput = { ...this.state.newStory };
                    newStoryInput['mediaId'] = mediaIdInput;
                })
        }

        return (
            <React.Fragment>
                <Box display="flex" flexWrap="wrap">

                    <div className={layoutClass.heroContent} >
                        <Container maxWidth="sm">
                            <div className={layoutClass.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <span>
                                            <Button variant="contained" onClick={this.toggleNewStory}>
                                                Add a new story
                                            </Button>
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Box>
                        {newStoryCard}
                    </Box>
                </Box>
                <hr />
                <Box display="flex" flexWrap="wrap">
                    {storyCards}
                </Box>

                <Dialog open={this.state.newStoryOpen} onClose={this.toggleNewStory} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Story</DialogTitle>
                    <DialogContent>
                        {newStoryEntry}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleNewStory} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.memoriseStory(newStoryInput)} color="primary">
                            {this.state.nextCount == 0 ? 'Next' : 'Submit'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

//stores a function
const mapStateToProps = (state) => {
    return {
        stories: state.stories,
        storiesLoaded: state.storiesLoaded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadStories: () => dispatch(actions.fetchStories()),
        onAddStory: (newStory) => dispatch(actions.addStory(newStory))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BackOffice));