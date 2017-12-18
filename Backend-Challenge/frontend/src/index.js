import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './components/homepage';
import Profile from './components/profile';
import Login from './components/login';




ReactDOM.render(
  <Router>
  <div>
  <Route exact path='/' component={HomePage} />
  <Route path='/profile' component={Profile} />
  <Route path='/login' component={Login} />

  </div>
  </Router>,
  document.getElementById('root'));
