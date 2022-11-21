import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import getLocal from '../helpers/getStorage';

class Ranking extends Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    const playersToRank = getLocal();
    this.setState({ rank: [...playersToRank] });
  }

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
    const { rank } = this.state;
    const sortAlreadySortedRank = rank.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 className="title" data-testid="ranking-title">
          Ranking
        </h1>

        <div className="container__ranking">
          {sortAlreadySortedRank?.map((player, index) => (
            <div className="card__player" key={ index }>
              <img src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` } alt={ `Jogador ${player.name}` } />

              <div>
                <p
                  className="player__name"
                  data-testid={ `player-name-${index}` }
                >
                  {player.name}
                </p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="footer__button">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.pressToBeBackBtn }
          >
            Voltar para a página inicial
          </button>
        </div>

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
