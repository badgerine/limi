import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import BackOffice from './components/BackOffice/BackOffice';
import StoryRoll from './components/StoryRoll/StoryRoll';
import StoryDeck from './containers/StoryDeck/StoryDeck';
import Authentication from './components/Authentication/Authentication';
import Layout from './containers/Layout/Layout';
import useStyles from './containers/Layout/styles';
import theme from './ui/Theme';
import { ThemeProvider } from '@material-ui/core';

const App = (props) => {

  const routes = (
    <Switch>
      <Route path='/story-roll' component={StoryRoll} />
      <Route path='/story-deck' render={(props) => <StoryDeck {...props} />} />
      <Route path='/backoffice' render={(props) => <BackOffice {...props} />} />
      <Route path='/authentication' render={(props) => <Authentication {...props} />} />
      <Redirect from='/' exact to='/story-deck' />
    </Switch>
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout classes={useStyles()} >{routes}</Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
