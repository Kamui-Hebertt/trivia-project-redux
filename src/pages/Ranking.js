import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
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
