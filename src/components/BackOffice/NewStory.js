import { FormLabel, TextField } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from "react";
import {MediaUploader} from './MediaUploader';

export const captureDetailsForm = (newStoryInput, classes) => {
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

export const captureMediaForm = (title, returnMediaId, uploadFunction) => {
    return (
        <MediaUploader storyTitle={title} getMediaId={(mediaId) => returnMediaId(mediaId)} />
       )
}