

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import LimiIcon from '../../assets/limi.png';
import useStyles from '../Layout/styles';
import './MenuBar.css';
import { Grid, Box } from '@material-ui/core';




const MenuBar = (props) => {
    const classes = useStyles();

    const authentication = (
    <Box display="flex" direction='row' className={classes.authentication}>
        <Typography component="h1" variant="h5" className={classes.authText} align="center">
            Sign in
        </Typography>
        <Avatar >
            <PersonIcon />
        </Avatar>
    </Box>);
    const search = null;
    return (
        <AppBar position="relative" className={classes.appBar} style={{ backgroundColor: '#c9340a' }} >
            <Toolbar>
                <Box display="flex" flexGrow={1}>
                    {/* <Box display="flex" direction='row'> */}
                        <img src={LimiIcon} alt="Icon" className={classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                            Limi
                    </Typography>
                    {authentication}
                    {search}

                </Box>
            </Toolbar>
        </AppBar>
    )
};

export default MenuBar;