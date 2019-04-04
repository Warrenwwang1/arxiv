import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NewArticles from './components/NewArticles/NewArticles';
import ArticleInfo from './components/ArticleInfo/ArticleInfo';
import AuthorPage from './components/AuthorPage/AuthorPage';
 import AuthorList from './components/AuthorList/AuthorList';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter><div className="App">
      <Switch>
        <Route exact path='/' component={NewArticles} />
        <Route exact path='/article-info' component={ArticleInfo} />
        <Route exact path='/author-page' component={AuthorPage} />
        <Route exact path='/all-authors' component={AuthorList} />

       </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
