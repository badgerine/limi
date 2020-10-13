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
import { CaptureDetailsForm, CaptureImageForm, CaptureVideoForm, ConfirmMedia, UploadStatus } from './NewStory';

const styles = theme => ({
  card: {
    borderRadius: 0,
  }
});

const BackOffice = (props) => {
  const [isNewStoryOpen, setNewStoryOpen] = useState(false);
  const [newStory, setNewStory] = useState();
  const [newStoryCover, setNewStoryCover] = useState(null);
  const [newStoryMedia, setNewStoryMedia] = useState(null);
  const [nextCount, setNextCount] = useState(0);
  const [storyDetailsUploaded, setStoryDetailsUploaded] = useState(false);
  const [storyImageUploaded, setStoryImageUploaded] = useState(false);
  const [storyVideoUploaded, setStoryVideoUploaded] = useState(false);

  const { storiesModified, storiesLoaded } = props;

  useEffect(() => {
    if (!storiesLoaded || storiesModified) {
      props.onLoadStories();
    }
  }, []);

  useEffect(() => {
    if (storiesModified) {
      props.onLoadStories();
    }
  }, [storiesModified]);

  useEffect(() => {
    if (nextCount == 4) {
      handleSubmitStory();
    }
  }, [newStory, nextCount]);

  useEffect(() => {
    if (nextCount >= 4) {
      setStoryDetailsUploaded(props.detailsUplaodComplete);
    }
  }, [props.detailsUplaodComplete]);

  useEffect(() => {
    if (nextCount >= 4) {
      setStoryImageUploaded(props.imageUploadComplete);
    }
  }, [props.imageUploadComplete]);

  useEffect(() => {
    if (nextCount >= 4) {
      setStoryVideoUploaded(props.contentUploadComplete);
    }
  }, [props.contentUploadComplete]);

  //debugging - delete when ui is working
  useEffect(() => {
    if (newStoryCover !== null || newStoryMedia !== null) {
      console.log('[Backoffice.useEffect]newStoryCover:', newStoryCover, 'newStoryMedia:', newStoryMedia);
      console.log('[Backoffice.useEffect]coverId:', newStory.coverId, 'mediaId:', newStory.mediaId);
    }
  }, [newStoryCover, newStoryMedia]);

  const toggleNext = () => {
    setNextCount(nextCount + 1);
    console.log('[Backoffice.toggleNext():nextCount=', nextCount);

  }

  const toggleBack = () => {
    setNextCount(nextCount - 1);
    console.log('[Backoffice.toggleBack():nextCount=', nextCount);
  }

  const toggleNewStory = () => {
    setNewStoryOpen(!isNewStoryOpen);
  }

  const captureStory = (newStoryInput, coverImage, mediaContent) => {
    if (nextCount == 0) {
      console.log('[Backoffice.captureStory] count==0', newStoryInput);
      setNewStory(newStoryInput);
      toggleNext();
    }
    else if (nextCount == 1) {
      console.log('[Backoffice.captureStory] count==1', newStoryInput);
      setNewStory(newStoryInput);
      setNewStoryCover(coverImage)
      toggleNext();
    }
    else if (nextCount == 2) {
      console.log('[Backoffice.captureStory] count==2', newStoryInput);
      setNewStory(newStoryInput);
      setNewStoryMedia(mediaContent);
      toggleNext();
    }
    else if (nextCount == 3) {
      console.log('[Backoffice.captureStory] count==3', newStoryInput);
      toggleNext();
    }
    else {
      console.log('[Backoffice.captureStory] count==4', nextCount);
      setNewStoryOpen(false);
    }
  }

  const handleSubmitStory = () => {
    props.uploadStoryDetails(newStory);
  }



  const storySelectedHandler = (storyId, mediaId) => {
    console.log('story selected=', storyId, " | ", mediaId);
  }

  const { classes } = props;
  const layoutClass = useStyles();

  let newStoryInput = {};
  let coverImage = null;
  let mediaContent = null;
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
    case 0: newStoryEntry = CaptureDetailsForm(newStoryInput, classes);
      break;
    case 1:
      newStoryInput = { ...newStory };
      newStoryEntry = <CaptureImageForm
        title={newStory.title + ' | Cover Image'}
        returnMediaId={
          (coverIdInput) => {
            newStoryInput['coverId'] = coverIdInput;
          }}
        returnMediaObject={
          (coverObject) => {
            coverImage = coverObject;
          }
        } />
      break;
    case 2: 
    newStoryInput = { ...newStory };
    newStoryEntry = <CaptureVideoForm
      title={newStory.title + ' | Story Content|Video'}
      returnMediaId={
        (mediaIdInput) => {
          newStoryInput['mediaId'] = mediaIdInput;
          console.log('given that the mediaId is', mediaIdInput, ', the story details are now:', newStoryInput)
        }}
      returnMediaObject={
        (mediaObject) => {
          mediaContent = mediaObject;
        }
      } />
      break;
    case 3: newStoryEntry = <ConfirmMedia
      coverId={newStory.coverId}
      coverObject={newStoryCover}
      mediaId={newStory.mediaId}
      mediaObject={newStoryMedia} />
      break;
    case 4:
      newStoryEntry = <UploadStatus
        title={newStory.title + ' | Uploading... Do not close or navigate away!'}
        storyDetailsUploaded={storyDetailsUploaded}
        storyImageUploaded={storyImageUploaded}
        storyVideoUploaded={storyVideoUploaded}
      />;

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
        <DialogActions show={nextCount == 4 && storyDetailsUploaded && storyImageUploaded && storyVideoUploaded}>
          <Button onClick={() => { if (nextCount == 0) { toggleNewStory() } else { toggleBack() } }} color="primary" hidden={nextCount == 4}>
            {(() => {
              switch (nextCount) {
                case 0: return 'Cancel';
                  break;
                default: return 'Back'
              }
            })()}
          </Button>
          <Button onClick={() => captureStory(newStoryInput, coverImage, mediaContent)} color="primary" >
            {(() => {
              switch (nextCount) {
                case 0: case 1: case 2: return 'Next';
                case 3: return 'Submit';
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
    storiesModified: state.storiesModified,
    detailsUplaodComplete: state.detailsUplaodComplete,
    imageUploadComplete: state.imageUploadComplete,
    contentUploadComplete: state.contentUploadComplete
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadStories: () => dispatch(actions.fetchStories()),
    onAddStory: (newStory) => dispatch(actions.addStory(newStory)),
    uploadStoryDetails: (newStory) => dispatch(actions.uploadStoryDetails(newStory))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BackOffice));