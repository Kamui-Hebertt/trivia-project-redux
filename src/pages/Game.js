import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { requestTrivia } from '../redux/action/fetch';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
      erro: '',
      responseCode: 0,
      isFetching: true,
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;
    const tokenFromStorage = localStorage.getItem('token');
    await dispatch(requestTrivia(tokenFromStorage));

    const { erro, responseCode } = this.props;
    this.setState({ erro, responseCode, isFetching: false });

    if (responseCode === 3) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { isFetching } = this.state;
    return (

      <div>
        <h1>Tela do jogo</h1>
        <Header />
        {isFetching ? <p>Loading</p> : 'Perguntas'}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  erro: state.trivia.erro,
  responseCode: state.trivia.responseCode,
});

export default connect(mapStateToProps)(Game);
