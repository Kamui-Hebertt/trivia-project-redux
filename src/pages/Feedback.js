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

  render() {
    return (
      <div>
        <h1>Pagina de Feedback</h1>
        <Header />
        <p data-testid="feedback-text">{this.renderScoreFeedback()}</p>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
