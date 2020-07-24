import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StoryCard from '../../components/StoryCard/StoryCard';
import * as actions from '../../store/actions';
import useStyles from '../Layout/styles';
import './StoryDeck.css';
import coverImage from '../../assets/cover-wfd.jpg';


const StoryDeck = props => {

    useEffect(() => {
        props.onLoadStories();
    }, [props.storiesModified]);

    const storySelectedHandler = (id, mediaId) => {
        props.history.push({
            pathname: 'story-roll/' + id,
            search: '?mediaId=' + mediaId
        })
    }

    let storyCards = <CircularProgress color="secondary" />;
    if (props.stories.length > 1) {
        storyCards = props.stories.map(story => (
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
            </div>
        ));
    }

    const classes = useStyles();
    const supportedLanguages = ['Sotho', 'TSONGA', 'VENDA', 'ZULU'];

    return (
        <React.Fragment>
             <div className={classes.heroContent} >
                <Container maxWidth="sm">
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Pick a story and listen in a South African language
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
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {props.stories.map(story => (
                            <Grid item key={story.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={coverImage}
                                        title={story.title}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {story.title}
                                        </Typography>
                                        <Typography>
                                            {story.synopsis}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            View
                                        </Button>
                                        <Button size="small" color="primary">
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
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