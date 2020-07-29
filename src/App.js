import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import BackOffice from './components/BackOffice/BackOffice';
import StoryRoll from './components/StoryRoll/StoryRoll';
import StoryDeck from './containers/StoryDeck/StoryDeck';
import Authentication from './components/Authentication/Authentication';
import Layout from './containers/Layout/Layout';
import useStyles from './containers/Layout/styles';

const App = (props) => {

  const routes = (
    <Switch>
      <Route path='/story-roll' component={StoryRoll} />
      <Route path='/story-deck' render={(props) => <StoryDeck {...props} />} />
      <Route path='/backoffice' render={(props) => <BackOffice {...props} />} />
      <Route path='/authentication' render={(props) => <Authentication {...props}/>}/>
      <Redirect from='/' exact to='/story-deck' />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Layout classes={useStyles()} >{routes}</Layout>
    </BrowserRouter>
  );
}

export default App;
