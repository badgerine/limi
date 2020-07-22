import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import BackOffice from './components/BackOffice/BackOffice';
import StoryRoll from './components/StoryRoll/StoryRoll';
import StoryDeck from './containers/StoryDeck/StoryDeck';
import './App.css';
import Layout from './containers/Layout/Layout';

const App = (props) => {

  const routes = (
    <Switch>
      <Route path='/story-roll' component={StoryRoll} />
      <Route path='/story-deck' component={StoryDeck} />
      <Route path='/backoffice' component={BackOffice} />
      <Redirect from='/' exact to='/story-deck' />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Layout>{routes}</Layout>
    </BrowserRouter>
  );
}

export default App;
