import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/playgame" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
