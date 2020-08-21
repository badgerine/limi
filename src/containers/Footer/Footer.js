import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import useStyles from '../Layout/styles';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '} Limi
            {/* <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link> */}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = (props) => {
    const classes = useStyles();
    return (
        <footer className={classes.footer} >
            <Typography variant="body1" align="center" color="textPrimary" gutterBottom>
                Language carries identity through time. Story-telling brings it to life.
            </Typography>
            <Copyright />
        </footer>
    )
};

export default Footer;