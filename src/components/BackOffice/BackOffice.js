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
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-stories';
import useStyles from '../../containers/Layout/styles';
import * as actions from '../../store/actions';
import StoryCard from '../StoryCard/StoryCard';
import { mediaUpload, newStoryForm } from './NewStory';



const styles = theme => ({
    card: {
        borderRadius: 0,
    }
});

const BackOffice = (props) => {
    const [selectedStory, setSelectedStory] = useState(null);
    const [isStoryAdded, setStoryAdded] = useState(false);
    const [isEdittingStory, setEdittingStory] = useState(false);
    const [isNewStoryOpen, setNewStoryOpen] = useState(false);
    const [newStory, setNewStory] = useState(null);
    const [nextCount, setNextCount] = useState(0);

    const { storiesModified } = props;

    useEffect(() => {
        if (!props.storiesLoaded || storiesModified) {
            props.onLoadStories();
        }
    }, []);

    useEffect(() => {
        if (storiesModified) {
            props.onLoadStories();
        }
    }, [storiesModified]);

    const toggleNext = () => {
        setNextCount(nextCount + 1);

    }

    const toggleBack = () => {

    }

    const updateNewStoryMediaId = (mediaId) => {
        if (mediaId != newStory.mediaId) {
            const incompleteStory = { ...newStory };
            incompleteStory[mediaId] = mediaId;
            console.log('[Backoffice.updateNewStoryMediaId]', 'trying to set the mediaId', mediaId);
            setNewStory(incompleteStory);
        }
    }


    const toggleNewStory = () => {
        setNewStoryOpen(!isNewStoryOpen);
    }

    const memoriseStory = (newStoryInput) => {
        if (nextCount == 0) {
            console.log('[Backoffice.memoriseStory]', newStoryInput);
            setNewStory(newStoryInput);
            toggleNext();
        } else {
            console.log('[Backoffice.memoriseStory]', 'trying to set the mediaId', newStoryInput);
            // setState({ isNewStoryOpen: false, newStory: newStoryInput }, () => handleSubmitStory());
            setNewStoryOpen(false);
            setNewStory(newStoryInput);
            handleSubmitStory(); //#TODO handle synchronising this call after state update

        }
    }

    const handleSubmitStory = () => {
        const completeNewStory = { ...newStory };
        axios.post('stories.json', completeNewStory)
            .then(response => {
                props.onAddStory(completeNewStory);
                console.log('[Backoffice.handleSubmitStory]', response);
            })
            .catch(error => {
                console.log('[Backoffice.handleSubmitStory]Error, something went wrong trying to persist story.', error);
            })
    }

    const storySelectedHandler = (storyId, mediaId) => {
        console.log('story selected=', storyId, " | ", mediaId);
    }

    const { classes } = props;
    const layoutClass = useStyles();

    let newStoryInput = {};
    let newStoryCard = null;
    if (newStory) {
        newStoryCard = (<div style={{ textDecoration: 'none' }}>
            <StoryCard
                id={newStory.id}
                title={newStory.title}
                synopsis={newStory.synopsis}
                genre={newStory.genre}
                readingTime={newStory.readingTime}
                audioLanguage={newStory.audioLanguage}
                primaryText={newStory.primaryText}
                secondaryText={newStory.secondaryText}
                author={newStory.author}
                mediaId={newStory.mediaId}
                clicked={() => storySelectedHandler(newStory.id, newStory.mediaId)}
            />
        </div>);
    }

    let storyCards = (
        <div style={{ width: '100%', height: '100%' }}>
            <Spinner />
        </div>
    );
    if (props.stories.length > 0) {
        storyCards = props.stories.map(story => (
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
                    clicked={() => storySelectedHandler(story.id, story.mediaId)}
                />
            </Box>));
    }

    let newStoryEntry = null;
    switch (nextCount) {
        case 0: newStoryEntry = newStoryForm(newStoryInput, classes);
            break;
        case 1: newStoryEntry = mediaUpload(newStory.title,
            // (mediaIdInput) => updateNewStoryMediaId(mediaId));
            (mediaIdInput) => {
                newStoryInput = { ...newStory };
                newStoryInput['mediaId'] = mediaIdInput;
            })
    }

    return (
        <React.Fragment>

                <div className={layoutClass.heroContent} >
                    <Container maxWidth="md">
                        <div className={layoutClass.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <span>
                                        <Button variant="contained" onClick={toggleNewStory} className={layoutClass.languageButtons}>
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
            <main>
                <Container className={layoutClass.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {storyCards}
                    </Grid>
                </Container>
            </main>

            <Dialog open={isNewStoryOpen} onClose={toggleNewStory} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Story</DialogTitle>
                <DialogContent>
                    {newStoryEntry}
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleNewStory} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={() => memoriseStory(newStoryInput)} color="primary">
                        {nextCount == 0 ? 'Next' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

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