import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  pressToBeBackBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
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

Ranking.propTypes = { history: PropTypes.object }.isRequired;

export default Ranking;
