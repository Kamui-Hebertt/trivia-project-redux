import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userInfo } from '../redux/action';

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
    this.setState({ [target.name]: target.value }, () => this.enableButton());
  };

  redirectTo = () => {
    const { history, userData } = this.props;
    userData(this.state);
    history.push('/playgame');
  };

  redirectToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  fetchToken = async () => {
    const tokenEndpoint = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(tokenEndpoint);
    const response = await request.json();
    localStorage.setItem('token', response.token);

    this.redirectTo();
  };

  render() {
    const { isDisabled, userName, userEmail } = this.state;
    return (
      <div>
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
              type="nome"
              id="nome"
              name="userName"
              value={ userName }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ this.fetchToken }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirectToSettings }
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
});

Login.propTypes = { history: PropTypes.object }.isRequired;

export default connect(null, mapDispatchToProps)(Login);
