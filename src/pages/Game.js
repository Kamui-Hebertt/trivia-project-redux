import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { requestTrivia } from '../redux/action/fetch';

class Game extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    const tokenFromStorage = localStorage.getItem('token');
    dispatch(requestTrivia(tokenFromStorage));
  }

  render() {
    return (

      <div>
        <h1>Tela do jogo</h1>
        <Header />
      </div>
    );
  }
}

export default connect()(Game);
