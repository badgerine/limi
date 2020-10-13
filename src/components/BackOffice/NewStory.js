import { FormLabel, TextField } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import React, { useRef, useState, Fragment, useEffect } from "react";
import ReactPlayer from 'react-player';
import Spinner from '../../ui/Spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonBase } from '@material-ui/core';

export const CaptureDetailsForm = (newStoryInput, classes) => {
  return (
    <Fragment>
      <DialogContentText>Complete the new Story details.</DialogContentText>
      <FormControl className={classes.formControl}>
        <Grid container spacing={2}>
          <Grid item xs={6} >
            <FormLabel id="title">Title</FormLabel>
          </Grid>
          <Grid item xs={6} >
            <TextField
              id="story-title-tf"
              onChange={event => newStoryInput.title = event.target.value}
              defaultValue={newStoryInput.title}
              value={newStoryInput.title}
            />
          </Grid>
          <Grid item xs={6} >
            <FormLabel id="story-synopsis-lbl">Synopsis</FormLabel>
          </Grid>
          <Grid item xs={6} >
            <TextField
              id="story-synopsis-tf"
              onChange={event => newStoryInput.synopsis = event.target.value}
              defaultValue={newStoryInput.synopsis}
              value={newStoryInput.synopsis}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={6} >
            <FormLabel id="story-genre-lbl">Genre</FormLabel>
          </Grid>
          <Grid item xs={6} >
            <TextField
              id="story-genre-tf"
              onChange={event => newStoryInput.genre = event.target.value}
              defaultValue={newStoryInput.genre}
              value={newStoryInput.genre}
            />
          </Grid>
          <Grid item xs={6} >
            <FormLabel id="story-readingTime-lbl">Reading Time</FormLabel>
          </Grid>
          <Grid item xs={6} >
            <TextField
              id="story-readingTime-tf"
              onChange={event => newStoryInput.readingTime = event.target.value}
              defaultValue={newStoryInput.genre}
              value={newStoryInput.genre}
            />
          </Grid>
          <Grid item xs={6} >
            <FormLabel id="story-audioLanguage-lbl">Audio Language</FormLabel>
          </Grid>
          <Grid item xs={6} >
            <TextField
              id="story-audioLanguage-tf"
              onChange={event => newStoryInput.audioLanguage = event.target.value}
              defaultValue={newStoryInput.audioLanguage}
              value={newStoryInput.audioLanguage}
            />
          </Grid>
          <Grid item xs={6} >
            <FormLabel id="story-primaryText-lbl">Text Language</FormLabel>
          </Grid>
          <Grid item xs={6} >
            <TextField
              id="story-primaryText-tf"
              onChange={event => newStoryInput.primaryText = event.target.value}
              defaultValue={newStoryInput.primaryText}
              value={newStoryInput.primaryText}
            />
          </Grid>
          <Grid item xs={6} >
            <FormLabel id="story-primaryText-lbl">Text Language Alt</FormLabel>
          </Grid>
          <Grid item xs={6} >
            <TextField
              id="story-primaryText-tf"
              onChange={event => newStoryInput.secondaryText = event.target.value}
              defaultValue={newStoryInput.secondaryText}
              value={newStoryInput.secondaryText}
            />
          </Grid>
          <Grid item xs={6} >
            <FormLabel id="story-author-lbl">Author</FormLabel>
          </Grid>
          <Grid item xs={6} >
            <TextField
              id="story-author-tf"
              onChange={event => newStoryInput.author = event.target.value}
              defaultValue={newStoryInput.author}
              value={newStoryInput.author}
            />
          </Grid>
        </Grid>
      </FormControl>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fileSelector: {
    width: '100%',
    height: '100%',
  },
  img: {
    maxHeight: '21rem',
    maxWidth: '100%',
    margin: 'auto',
  },
}));

export const CaptureImageForm = (props) => {
  const [mediaUrl, setMediaUrl] = useState(null);
  const hiddenFileInput = useRef();
  const classes = useStyles();
  const { title } = props;

  useEffect(() => {
    setMediaUrl(null);
  }, [title]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  }

  const handleMediaAsFile = (e) => {
    const media = e.target.files[0];
    e.preventDefault();
    setMediaUrl(URL.createObjectURL(media));
    props.returnMediaId(media.name);
    props.returnMediaObject(URL.createObjectURL(media));
  }

  return (<Grid containter direction='column'>
    <Grid item>
      <h3>{props.title}</h3>
    </Grid>
    <Grid item justify='center'>
      {mediaUrl ? <img className={classes.img} src={mediaUrl} alt="Cover Image Visualisation" /> : 'Nothing selected'}
    </Grid>
    <Grid item>
      <ButtonBase className={classes.fileSelector}>
        <Button onClick={() => handleClick()} variant='contained' color='primary'>
          Browse...
        <input ref={hiddenFileInput} type="file" onChange={handleMediaAsFile} hidden />
        </Button>
      </ButtonBase>
    </Grid>
  </Grid>)
}

export const CaptureVideoForm = (props) => {
  const [mediaUrl, setMediaUrl] = useState(null);
  const hiddenFileInput = useRef();
  const classes = useStyles();
  const { title } = props;

  useEffect(() => {
    setMediaUrl(null);
  }, [title]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  }

  const handleMediaAsFile = (e) => {
    const media = e.target.files[0];
    e.preventDefault();
    setMediaUrl(URL.createObjectURL(media));
    props.returnMediaId(media.name);
    props.returnMediaObject(URL.createObjectURL(media));
  }

  return (<Grid containter direction='column'>
    <Grid item>
      <h3>{props.title}</h3>
    </Grid>
    <Grid item justify='center'>
      {mediaUrl ? <ReactPlayer url={mediaUrl} light alt="Video Visualisation" /> : 'Nothing selected'}
    </Grid>
    <Grid item>
      <ButtonBase className={classes.fileSelector}>
        <Button onClick={() => handleClick()} variant='contained' color='primary'>
          Browse...
        <input ref={hiddenFileInput} type="file" onChange={handleMediaAsFile} hidden />
        </Button>
      </ButtonBase>
    </Grid>
  </Grid>)
}

export const ConfirmMedia = (props) => {
  const classes = useStyles();
  return (
    <Grid container direction='row' justify='center'>
      <Grid item direction='column'>
        <p style={{justify: 'center'}}>{props.coverId}</p>
        <img className={classes.img} src={props.coverObject} alt="Media Visualisation" />
      </Grid>
      <Grid item direction='column'>
        <p style={{justify: 'center'}}>{props.mediaId}</p>
        {props.mediaObject ? <ReactPlayer url={props.mediaObject} light alt="Video Visualisation" /> : 'Nothing selected'}
      </Grid>
    </Grid>
  );
}

export const UploadStatus = (props) => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <h3>{props.title}</h3>
      </Grid>
      <Grid item xs='6'>
        <Spinner />
      </Grid>
      <Grid item xs='6'>
        {props.storyDetailsUploaded ? 'Story Details uploaded': null}
        {props.storyImageUploaded ? 'Story Cover Image uploaded': null}
        {props.storyVideoUploaded ? 'Story Content Video uploaded': null}
      </Grid>
    </Grid>


  )
}