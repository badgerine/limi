

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import { Button, InputBase } from '@material-ui/core';
import { Person as PersonIcon, Search as SearchIcon, Autorenew } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, fade } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import LimiIcon from '../../assets/limi.png';
import { useScrollTrigger } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useLocalStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar
    },
    actionItems: {
        width: '100%'
    },
    authentication: {
        marginLeft: 'auto',
    },
    icon: {
        // marginRight: theme.spacing(2),
        height: "50px",
        width: "55px",
        borderRadius: "5px"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        // marginLeft: '100px',
        // marginLeft: 0,
        // marginLeft: 'auto',
        // width: '100%',
        // [theme.breakpoints.down('sm')]: {
        //     marginLeft: theme.spacing(3),
        //     width: 'auto',
        // },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('md')]: {
        //     width: '20ch',
        // },
    }
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
    const classes = useLocalStyles();
    const [toolbarMargin, setToolbarMargin] = useState(null);
    const [menuBarPosition, setMenuBarPosition] = useState('fixed');

    const { pathname } = props.history.location;
    useEffect(() => {
        adjustToolbar();
    }, [pathname]);

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
            setToolbarMargin(<div className={classes.toolbarMargin} />);
        }

    }

    const homeHandler = () => {
        props.history.push({
            pathname: '/'
        })
    }

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

    const actions = (
        <Toolbar className={classes.actionItems}>
            {search}
            <div className={classes.authentication}>
                <Button color="inherit" variant='body1' onClick={backofficeHandler}>Back Office</Button>
                <IconButton color="inherit" variant='outlined' onClick={authenticationHandler}>
                    <PersonIcon />
                </IconButton>
            </div>
        </Toolbar>
    );

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position={menuBarPosition} >
                    <Toolbar>
                        <IconButton color="inherit" variant='outlined' onClick={homeHandler}>
                            <img src={LimiIcon} alt="Icon" className={classes.icon} />
                        </IconButton>
                        <Typography variant="h5" color="inherit">
                            Limi
                        </Typography>
                        {actions}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {toolbarMargin}
        </React.Fragment>
    )
};

export default withRouter(MenuBar);