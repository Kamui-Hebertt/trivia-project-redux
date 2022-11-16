import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setLocal from '../helpers/setStorage';

// import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      allPlayers: [],
    };
  }

  componentDidMount() {
    this.set();
  }

  set = () => {
    const { name, gravatarEmail, score } = this.props;
    const player1 = { name, gravatarEmail, score };
    const get = JSON.parse(localStorage.getItem('players'));
    
    const { allPlayers } = this.state;
     
    this.setState(
      (prev) => ({ allPlayers: [...prev.allPlayers, player1] }),
      () => setLocal([...get, this.state.allPlayers]),
   // ()=> console.log(this.state)
    );
    
  };

  pressToBeBackBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    // const { name, gravatarEmail, score } = this.props;
    //  console.log(localStorage.getItem(('playerKey')));
    // const hash1 = md5(gravatarEmail).toString();
    // const hash2 = md5(localStorage.getItem('player')[2]);
    // console.log(localStorage.getItem('score'));
    return (
      <div>
        <h1 data-testid="ranking-title">
          Página de Ranking
        </h1>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.pressToBeBackBtn }
        >
          Voltar para a página inicial
        </button>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Ranking.propTypes = { history: PropTypes.object }.isRequired;

export default connect(mapStateToProps)(Ranking);
