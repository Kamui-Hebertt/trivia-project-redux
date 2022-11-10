import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src="" alt="perfil" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">
          Pontuação :
          {' '}
          {score}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  // email: stte.player.userEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
