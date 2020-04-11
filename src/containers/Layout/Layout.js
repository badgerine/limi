import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import StoryDeck from '../StoryDeck/StoryDeck';
import StoryRoll from '../../components/StoryRoll/StoryRoll';
import MenuBar from '../MenuBar/MenuBar';
import Footer from '../Footer/Footer';
import './Layout.css';

class Layout extends Component {
    render() {
        return (
            <div className="Layout">
                <MenuBar/>
                <Switch>
                    <Route path='/story-roll' component={StoryRoll} />
                    <Route path='/story-deck' component={StoryDeck} />
                    <Redirect from='/' exact to='/story-deck' />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Layout;