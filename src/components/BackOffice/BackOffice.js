import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { TextField, FormLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import StoryCard from '../StoryCard/StoryCard';
import { withStyles } from '@material-ui/styles';
// import './BackOffice.css';


const styles = theme => ({
    card: {
        borderRadius: 0
    }
});

class BackOffice extends Component {
    state = {
        selectedStory: null,
        storyAdded: false,
        edittingStory: false,
        newStoryOpen: false,
        newStory: null
    }

    toggleNewStory = () => {
        const open = this.state.newStoryOpen;
        this.setState({ newStoryOpen: !open });
    }

    handleSubmitStory = (newStoryInput) => {
        console.log(newStoryInput);
        this.setState({ newStory: newStoryInput, newStoryOpen: false });
        console.log(this.state.newStory);
        // return {newStoryOpen: false, newStory: {default: "sdfjlk"}};
    }

    storySelectedHandler = (story) => {
        console.log('story selected');
    }

    render() {
        const { classes } = this.props;

        const newStoryInput = {};
        let newStoryCard = null;
        if(this.state.newStory){
            newStoryCard = ( <div style={{ textDecoration: 'none' }}>
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
                clicked={() => this.storySelectedHandler(this.state.newStory.id, this.state.newStory.mediaId)}
            />
        </div>);
        }

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
                    <span>New Story <button onClick={this.toggleNewStory}>Add</button></span>
                </div>
                <br />
                <div>
                    <span> Remove Stories <button>Go</button></span>
                </div>
                <br />
                {newStoryCard}
                <hr />
                {storyCards}
                <Dialog open={this.state.newStoryOpen} onClose={this.toggleNewStory} onSubmit={() => this.handleSubmitStory(newStoryInput)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Story</DialogTitle>
                    <DialogContent>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleNewStory} color="primary">
                            Cancel
                </Button>
                        <Button onClick={() => this.handleSubmitStory(newStoryInput)} color="primary">
                            Submit
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
        stories: state.stories
    };
};

export default withStyles(styles)(connect(mapStateToProps)(BackOffice));