

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import { Button, InputBase } from '@material-ui/core';
import { Person as PersonIcon, Search as SearchIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import LimiIcon from '../../assets/limi.png';
import useStyles from '../Layout/styles';
import { useScrollTrigger } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useInlineStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar
    },
}));

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

const MenuBar = (props) => {
    const classes = useStyles();
    const inlineClasses = useInlineStyles();
    const [toolbarMargin, setToolbarMargin] = useState(null);
    const [menuBarPosition, setMenuBarPosition] = useState('fixed');

    const { pathname } = props.history.location;
    useEffect(() => {
        adjustToolbar();
    },[pathname]);

    const authenticationHandler = () => {
        props.history.push({
            pathname: '/authentication'
        })
    }

    const backofficeHandler = () => {
        props.history.push({
            pathname: '/backoffice'
        })
    }

    const adjustToolbar = () => {
        if (pathname.includes('story-roll')) {
            setMenuBarPosition('relative');
            setToolbarMargin(null);
        } else {
            setMenuBarPosition('fixed');
            setToolbarMargin(<div className={inlineClasses.toolbarMargin}/>);
        }

    }

    const homeHandler = () => {
        props.history.push({
            pathname: '/'
        })
    }


    const backOffice = <Button color="inherit" variant='body1' onClick={backofficeHandler}>Back Office</Button>;
    const authenticated = (
        <Toolbar className={classes.authentication}>
            {backOffice}
            <IconButton color="inherit" variant='outlined' onClick={authenticationHandler}>
                <PersonIcon />
            </IconButton>
        </Toolbar>
    );

    const search = (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position={menuBarPosition} >
                    <Toolbar>
                        <IconButton color="inherit" variant='outlined' onClick={homeHandler}>
                            <img src={LimiIcon} alt="Icon" className={classes.icon} />
                        </IconButton>
                        <Typography variant="h5" color="inherit" noWrap className={classes.title}>
                            Limi
                    </Typography>
                        {authenticated}
                        {/* {search} */}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {toolbarMargin}
        </React.Fragment>
    )
};

export default withRouter(MenuBar);