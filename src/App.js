import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/playgame" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
