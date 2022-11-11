import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { requestTrivia } from '../redux/action/fetch';

// const TRES = 3;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
      // erro: '',
      // responseCode: 0,
      // isFetching: true,
      questionNumber: null,
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const tokenFromStorage = localStorage.getItem('token');
    // await dispatch(requestTrivia(tokenFromStorage));

    // const { erro, responseCode, questions } = this.props;
    // this.setState(() => ({
    //   erro,
    //   responseCode,
    //   isFetching: false,
    //   questionNumber: 0,
    //   questions }));

    // if (responseCode === TRES || erro) {
    //   localStorage.removeItem('token');
    //   history.push('/');
    // }

    const URL = `https://opentdb.com/api.php?amount=5&token=${tokenFromStorage}`;
    const response = await fetch(URL);
    const data = await response.json();
    const errorCode = 3;
    if (data.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: data.results,
      // isFetching: false,
      questionNumber: 0,
    });
  }

  render() {
    const {
      questions,
      // question,
      // erro,
      // responseCode,
      // isFetching,
      questionNumber } = this.state;

    const answers = [questions[questionNumber]?.correct_answer,
      questions[questionNumber]?.incorrect_answers].flat().sort();

    const shuffledAnswers = [];

    do {
      shuffledAnswers
        .push(...answers.splice([Math.floor(Math.random() * answers.length)], 1));
    } while (answers.length > 0);

    return (

      <div>
        <h1>Tela do jogo</h1>
        <Header />
        {
          !shuffledAnswers[0] ? <p>Loading</p>
            : (
              <div>
                <h2
                  data-testid="question-category"
                >
                  {questions[questionNumber].category}

                </h2>
                <p data-testid="question-text">
                  {questions[questionNumber].question}
                </p>
                {' '}
                <div data-testid="answer-options">
                  {
                    shuffledAnswers.map((it, index) => (
                      <button
                        key={ index }
                        type="button"
                        data-testid={ it === questions[questionNumber]
                          ?.correct_answer ? 'correct-answer'
                          : `wrong-answer-${index}` }
                      >
                        {it}
                      </button>
                    ))
                  }
                </div>

              </div>
            )
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  erro: state.trivia.erro,
  responseCode: state.trivia.responseCode,
});

export default connect(mapStateToProps)(Game);
