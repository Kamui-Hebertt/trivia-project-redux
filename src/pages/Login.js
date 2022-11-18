import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setGameDifficulty, userInfo } from '../redux/action';
import setLocal from '../helpers/setStorage';

class Login extends Component {
  state = {
    userEmail: '',
    userName: '',
    isDisabled: true,
  };

  enableButton = () => {
    const { userName, userEmail } = this.state;
    const isValid = !!userName && !!userEmail;

    this.setState({ isDisabled: !isValid });
  };

  handleChange = ({ target }) => {
    const { changeLevel } = this.props;
    if (target.name === 'difficultyLevel') {
      changeLevel(target.value);
    } else {
      this.setState({ [target.name]: target.value }, () => this.enableButton());
    }
  };

  redirectTo = (str) => {
    const { history, userData } = this.props;
    userData(this.state);
    history.push(str);
  };

  fetchToken = async () => {
    const tokenEndpoint = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(tokenEndpoint);
    const response = await request.json();
    localStorage.setItem('token', response.token);
  };

  newGame = async () => {
    const { userName, userEmail } = this.state;
    await this.fetchToken();

    setLocal({
      name: userName,
      gravatarEmail: userEmail,
      score: 0 });

    this.redirectTo('/playgame');
  };

  render() {
    const { isDisabled, userName, userEmail } = this.state;
    return (
      <div className="loginForm">
        <form action="">
          <label htmlFor="email">
            Insira seu email:
            <input
              type="email"
              id="email"
              name="userEmail"
              value={ userEmail }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="nome">
            Insira seu nome:
            <input
              placeholder="Digite seu nome"
              type="text"
              id="nome"
              name="userName"
              value={ userName }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          <select
            data-testid="difficulty"
            name="difficultyLevel"
            id="level"
            onChange={ this.handleChange }
          >
            <option value="" hidden>Dificuldade</option>
            <option value="">Aleatória</option>
            <option data-testid="easy" value="easy">Fácil</option>
            <option value="medium">Normal</option>
            <option value="hard" name="hard">Díficil</option>
          </select>

          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ this.newGame }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.redirectTo('/settings') }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  userData: (state) => dispatch(userInfo(state)),
  changeLevel: (payload) => dispatch(setGameDifficulty(payload)),
});

Login.propTypes = { history: PropTypes.object }.isRequired;

export default connect(null, mapDispatchToProps)(Login);
