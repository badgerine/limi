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
        newStory: {},
        selectedStory: null,
        addingStory: false,
        edittingStory: false,
        newStoryOpen: false
    }

    toggleNewStory = () => {
        const open = this.state.newStoryOpen;
        this.setState({newStoryOpen: !open})
    }

    handleSubmitStory = () => {

    }

    render() {
        const { classes } = this.props;

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
                <hr />
                {storyCards}
                <Dialog open={this.state.newStoryOpen} onClose={this.toggleNewStory} aria-labelledby="form-dialog-title">
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
                                        id="guardian-firstname-tf"
                                        onChange={event => this.state.newStory.title = event.target.value}
                                        defaultValue=''
                                        value={this.state.newStory.title}
                                    />
                                </Grid>
                                {/* <Grid item xs={6} >
                                    <FormLabel id="guardian-lastName-label">Guardian Last Name</FormLabel>
                                </Grid>
                                <Grid item xs={6} >
                                    <TextField
                                        id="guardian-lastName-tf"
                                        onChange={event => contact.lastName = event.target.value}
                                        defaultValue={this.props.guardian.lastName}
                                        value={contact.lastName}
                                    />
                                </Grid> */}
                            </Grid>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleNewStory} color="primary">
                            Cancel
                </Button>
                        <Button onClick={this.handleSubmitStory} color="primary">
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