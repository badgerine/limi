import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Spinner from '../../ui/Spinner/Spinner';
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
import { captureMediaForm, captureDetailsForm } from './NewStory';

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

    useEffect(() => {
        if (nextCount == 3) {
            handleSubmitStory();
        }
    }, [newStory, nextCount])

    const toggleNext = () => {
        setNextCount(nextCount + 1);
        console.log('[Backoffice.toggleNext():nextCount=', nextCount);

    }

    const toggleBack = () => {

    }

    const toggleNewStory = () => {
        setNewStoryOpen(!isNewStoryOpen);
    }

    const captureStory = (newStoryInput) => {
        if (nextCount == 0) {
            console.log('[Backoffice.captureStory] count==0', newStoryInput);
            setNewStory(newStoryInput);
            toggleNext();
        } else if (nextCount == 1) {
            console.log('[Backoffice.captureStory] count==1', newStoryInput);
            setNewStory(newStoryInput);
            toggleNext();
        }
        else if (nextCount == 2) {
            console.log('[Backoffice.captureStory] count==1', newStoryInput);
            setNewStory(newStoryInput);
        }
        else {
            setNewStoryOpen(false);
        }
    }

    const handleSubmitStory = () => {
        props.onAddStory(newStory);
        axios.post('stories.json', newStory)
            .then(response => {
                props.uploadStory();
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
                coverId={newStory.coverId}
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
        case 0: newStoryEntry = captureDetailsForm(newStoryInput, classes);
            break;
        case 1: newStoryEntry = captureMediaForm(newStory.title,
            (coverIdInput) => {
                newStoryInput = { ...newStory };
                newStoryInput['coverId'] = coverIdInput;
            })
            break;
        case 2: case 3: newStoryEntry = captureMediaForm(newStory.title,
            (mediaIdInput) => {
                newStoryInput = { ...newStory };
                newStoryInput['mediaId'] = mediaIdInput;
            })
            break;
    }

    return (
        <React.Fragment>

            <div className={layoutClass.heroContent} >
                <Container maxWidth="lg">
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
            <main className={layoutClass.backofficeBackground}>
                <Container className={layoutClass.cardGrid} maxWidth="lg">
                    <Grid container spacing={4} >
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
                    <Button onClick={() => captureStory(newStoryInput)} color="primary">
                        {(() => {
                            switch (nextCount) {
                                case 0: case 1: return 'Next';
                                case 2: return 'Submit';
                                default: return 'Okay'
                            }
                        })()}
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
        storiesLoaded: state.storiesLoaded,
        storiesModified: state.storiesModified
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadStories: () => dispatch(actions.fetchStories()),
        onAddStory: (newStory) => dispatch(actions.addStory(newStory)),
        uploadStory: () => dispatch(actions.uploadStory())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BackOffice));