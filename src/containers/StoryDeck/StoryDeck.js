import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../../components/FirebaseService/FirebaseService';
import Spinner from '../../ui/Spinner/Spinner';
import * as actions from '../../store/actions';
import useStyles from '../Layout/styles';
import './StoryDeck.css';
import defaultCoverImage from '../../assets/cover-wfd.jpg';


const StoryDeck = props => {

    useEffect(() => {
        props.onLoadStories();
    }, [props.storiesModified]);

    const retrieveCover = (coverImageId, imageUrl) => {
        if(coverImageId !== null){
            firebase.storage().ref().child(`media/${coverImageId}`).getDownloadURL().then(url => {
                imageUrl = url;
            });
        }
    };

    const storySelectedHandler = (id, mediaId) => {
        props.history.push({
            pathname: 'story-roll/' + id,
            search: '?mediaId=' + mediaId
        })
    }


    const classes = useStyles();
    const supportedLanguages = ['Sotho', 'TSONGA', 'VENDA', 'ZULU'];

    let storyCards = (
        <div style={{ width: '100%', height: '100%' }}>
            <Spinner />
        </div>
    );
    if (props.stories.length > 1) {
        storyCards = props.stories.map(story => (
            <Grid item key={story.id} xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={story.coverImageId != null ? retrieveCover(story.coverImageId) : defaultCoverImage}
                        title={story.title}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {story.title}
                        </Typography>
                        <Typography>
                            {story.synopsis}
                        </Typography>
                        <Typography variant='body2'>
                            <ScheduleIcon fontSize='small' />{story.readingTime}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Info
                        </Button>
                        <Button size="small" color="primary" onClick={() => storySelectedHandler(story.id, story.mediaId)}>
                            Play
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))
    }

    return (
        <React.Fragment >
            <div className={classes.heroContent} >
                <Container maxWidth="sm">
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Pick a story and listen in an indigenous South African language
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            {supportedLanguages.map(lang => (
                                <Grid item>
                                    <Button variant="contained" className={classes.languageButtons}>
                                        {lang}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Container>
            </div>
            <main>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={4}>
                        {storyCards}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}

            {/* End footer */}
        </React.Fragment>
    );
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