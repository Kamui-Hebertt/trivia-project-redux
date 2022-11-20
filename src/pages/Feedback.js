import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const TRES = 3;

class Feedback extends Component {
  renderScoreFeedback = () => {
    const { assertions } = this.props;
    if (assertions >= TRES) {
      return 'Well Done!';
    }

    return 'Could be better...';
  };

  handleClick = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div className="feed">
        {/* <h1>Pagina de Feedback</h1>
        <Header /> */}
        <h2>Resultados da partida:</h2>
        <p>
          Questões respondidas corretamente:
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>

        <p>
          Pontuação final:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p data-testid="feedback-text">{this.renderScoreFeedback()}</p>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.handleClick('/') }
        >
          Play Again
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.handleClick('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
