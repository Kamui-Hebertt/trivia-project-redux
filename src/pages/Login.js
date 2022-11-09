import React, { Component } from 'react';

class Login extends Component {
  state = {
    userEmail: '',
    userName: '',
    isDisabled: true,
  };

  enableButton = () => {
    const { userName, userEmail } = this.state;
    const isValid = !!userName && !!userEmail;
    console.log(isValid);

    this.setState({ isDisabled: !isValid });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.enableButton());
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
          >
            Play
          </button>

        </form>
      </div>
    );
  }
}

export default Login;
