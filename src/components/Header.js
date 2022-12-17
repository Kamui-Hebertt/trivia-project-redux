import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score, email } = this.props;
    const hash1 = md5(email).toString();
    return (
      <div className="header">
        <div />
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash1}` }
          alt={ name }

        />
        <p data-testid="header-player-name">{name}</p>
        <p>
          <span data-testid="header-score">{`(${score} pontos)`}</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
