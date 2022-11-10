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
      question: null,
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;
    const tokenFromStorage = localStorage.getItem('token');
    await dispatch(requestTrivia(tokenFromStorage));
    const { erro, responseCode, questions } = this.props;
    this.setState({ erro, responseCode, isFetching: false, question: 0, questions });

    if (responseCode === 3) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const {
      questions,
      erro,
      responseCode,
      isFetching,
      question } = this.state;
    const answers = [questions[question]?.correct_answer,
      questions[question]?.incorrect_answers].flat().sort();
    // console.log(correct);
    return (

      <div>
        <h1>Tela do jogo</h1>
        <Header />
        {
          isFetching ? <p>Loading</p>
            : (
              <div>
                <h2 data-testid="question-category">{questions[question].category}</h2>
                <p data-testid="question-text">
                  {questions[question].question}
                </p>
                {' '}
                {
                  answers.map((elementQuestion, index) => (
                    <li key={ index }>
                      {elementQuestion}
                    </li>
                  ))
                }

              </div>
            )
        }
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
