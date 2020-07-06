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

import { newStoryForm, mediaUpload } from './NewStory';
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
        newStory: null,
        nextCount: 0
    }

    toggleNext = () => {
        this.setState((prevState, props) => ({
            nextCount: prevState.nextCount + 1
        }));

    }

    toggleBack = () => {

    }


    toggleNewStory = () => {
        const open = this.state.newStoryOpen;
        this.setState({ newStoryOpen: !open });
    }

    memmoriseStory = (newStoryInput) => {

        console.log(newStoryInput);
        this.setState({ newStory: newStoryInput});
        console.log(this.state.newStory);
        this.toggleNext();
        // return {newStoryOpen: false, newStory: {default: "sdfjlk"}};
    }

    handleSubmitStory = () => {

    }

    storySelectedHandler = (story) => {
        console.log('story selected');
    }

    render() {
        const { classes } = this.props;

        const newStoryInput = {};
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

        let newStoryEntry = null;
        switch (this.state.nextCount) {
            case 0: newStoryEntry = newStoryForm(newStoryInput, classes);
            break;
            case 1: newStoryEntry = mediaUpload();
            
        }

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
                        {newStoryEntry}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleNewStory} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.memmoriseStory(newStoryInput)} color="primary">
                            Next
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