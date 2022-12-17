/* eslint-disable max-lines */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getLocal from '../helpers/getStorage';
import setLocal from '../helpers/setStorage';
import { newGame, updateScore } from '../redux/action';
import logoImage from '../assets/trybe.png';

const DIFFICULTY_BONUS_SCORE = { hard: 3, medium: 2, easy: 1 };
const UM_SEGUNDO = 1000;
const CINCO_SEGUNDOS = 5000;
const TRINTA_UM_SEGUNDOS = 31000;
const PONTUCAO_ACERTO = 10;
const six = 6;
let [startTime, countdown5seg, countdown30seg] = [null, null, null];

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: {},
      isFetching: true,
      questionNumber: null,
      countdownTimer: 30,
      shuffledAnswers: [],
      isDisabled: false,
      showAnswers: false,
    };
  }

  async componentDidMount() {
    const { history, dispatch, level } = this.props;
    const tokenFromStorage = localStorage.getItem('token');
    let endpoint = `https://opentdb.com/api.php?amount=5&token=${tokenFromStorage}`;
    if (level) {
      endpoint = `https://opentdb.com/api.php?amount=5&difficulty=${level}&token=${tokenFromStorage}`;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    const errorCode = 3;
    if (data.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState(
      {
        questions: data.results,
        isFetching: false,
        questionNumber: 0,
      },
      this.shuffleAnswers,
    );

    dispatch(newGame());
  }

  stopTimer = () => {
    clearInterval(startTime);
    clearTimeout(countdown5seg);
    clearTimeout(countdown30seg);
  };

  gettingReady = () => {
    this.setState({ showAnswers: false });
    this.stopTimer();
    countdown5seg = setTimeout(() => {
      this.setState({ showAnswers: true });
      this.countDown();
    }, CINCO_SEGUNDOS);
  };

  disableAnswers = () => {
    this.setState({ isDisabled: true });
  };

  timer = () => {
    this.setState((prev) => ({
      countdownTimer: prev.countdownTimer - 1,
    }));
  };

  countDown = () => {
    const { isDisabled } = this.state;

    if (!isDisabled) {
      startTime = setInterval(this.timer, UM_SEGUNDO);

      countdown30seg = setTimeout(() => {
        this.stopTimer();
        this.disableAnswers();
      }, TRINTA_UM_SEGUNDOS);
    }
  };

  shuffleAnswers = () => {
    const { questions, questionNumber, shuffledAnswers } = this.state;

    if (!shuffledAnswers[0]) {
      const shufflingAnswers = [];
      const answers = [
        questions[questionNumber]?.correct_answer,
        questions[questionNumber]?.incorrect_answers,
      ].flat();

      do {
        shufflingAnswers.push(
          ...answers.splice([Math.floor(Math.random() * answers.length)], 1),
        );
      } while (answers.length > 0);

      this.setState({ shuffledAnswers: shufflingAnswers }, () => this.gettingReady());
    }
  };

  calcScore = (answer) => {
    const { countdownTimer, questions, questionNumber } = this.state;
    const { dispatch } = this.props;
    const { correct_answer: correctAnswer, difficulty } = questions[questionNumber];

    if (answer === decodeURIComponent(correctAnswer)) {
      const pointsScored = PONTUCAO_ACERTO
      + countdownTimer
      * DIFFICULTY_BONUS_SCORE[difficulty];

      dispatch(updateScore(pointsScored));
    }
  };

  handleAnswer = ({ target }) => {
    const { questions, questionNumber } = this.state;
    const parent1 = target.parentElement.childNodes;
    parent1.forEach((item) => {
      if (
        item.textContent
        === decodeURIComponent(questions[questionNumber].correct_answer)
      ) {
        item.style.border = '3px solid rgb(52, 193, 143)';
        item.style.backgroundColor = 'rgb(52, 193, 143)';
        item.style.color = 'white';
        item.style.fontWeight = '700';
      } else {
        item.style.border = '3px solid rgb(255, 110, 110)';
        item.style.backgroundColor = 'rgb(255, 110, 110)';
        item.style.color = 'white';
        item.style.fontWeight = '700';
      }
    });

    this.stopTimer();
    this.disableAnswers();
    this.calcScore(target.textContent);
  };

  deletePlayerPreviousData = () => {
    const playersAlreadyInLocal = getLocal();
    playersAlreadyInLocal.pop();

    localStorage.setItem('playersRank', JSON.stringify(playersAlreadyInLocal));
  };

  updateCurrentPlayerScoreInLocalStorage = () => {
    const { name, gravatarEmail, score } = this.props;
    const newPlayerDataToSave = { name, gravatarEmail, score };
    this.deletePlayerPreviousData();

    setLocal(newPlayerDataToSave);
  };

  handleNextQuestion = () => {
    const { questionNumber, questions } = this.state;
    const { history } = this.props;

    this.updateCurrentPlayerScoreInLocalStorage();

    if (questionNumber === questions.length - 1) {
      const playersAlreadyInLocal = getLocal();
      const sortedRank = playersAlreadyInLocal.sort(
        (a, b) => b.score > a.score,
      );
      localStorage.setItem('playersRank', JSON.stringify(sortedRank));
      console.log(getLocal());
      history.push('/feedback');
    }
    this.setState(
      (prev) => ({
        questionNumber: prev.questionNumber + 1,
        shuffledAnswers: [],
        countdownTimer: 30,
        isDisabled: false,
      }),
      () => this.shuffleAnswers(),
    );
  };

  render() {
    const {
      questions,
      isDisabled,
      isFetching,
      questionNumber,
      shuffledAnswers,
      countdownTimer,
      showAnswers,
    } = this.state;
    return (
      <div>
        <Header countdownTimer={ countdownTimer } />
        {isFetching ? (
          <p>Loading</p>
        )
          : (
            <div className="wrap">
              <div className="questions">
                <h2 data-testid="question-category" id="questionTitle">
                  {decodeURIComponent(questions[questionNumber].category)}
                </h2>
                <p data-testid="question-text">
                  {decodeURIComponent(questions[questionNumber].question)}
                </p>
                {' '}
              </div>
              <div data-testid="answer-options" className="answer">
                {shuffledAnswers.map((it, index) => (
                  <button
                    className={
                      it === questions[questionNumber]?.correct_answer
                        ? 'correct testbtn'
                        : 'wrong testbtn'
                    }
                    onClick={ this.handleAnswer }
                    disabled={ isDisabled }
                    key={ index }
                    type="button"
                    data-testid={
                      it === questions[questionNumber]?.correct_answer
                        ? 'correct-answer'
                        : `wrong-answer-${index}`
                    }
                    style={ showAnswers
                      ? { color: 'black', transition: 'ease-out .3s' }
                      : { color: 'transparent',
                        textShadow: '0 0 8px #000' } }
                  >
                    {decodeURIComponent(it)}
                  </button>
                ))}
              </div>
            </div>
          )}
        <div className="cotainerFooter">
          <div className="footer">
            <img src={ logoImage } alt="logo" />
          </div>
          <div className="btnFooter">
            {isDisabled
              ? (
                <div className="next">
                  <button
                    type="button"
                    // eslint-disable-next-line max-lines
                    data-testid="btn-next"
                    onClick={ this.handleNextQuestion }
                  >
                    Next
                  </button>
                </div>
              )
              : (
                <p
                  style={ countdownTimer >= six
                    ? { color: 'white', fontSize: '30px' }
                    : { color: 'red', fontSize: '30px', transition: 'ease-in .2s' } }
                >
                  {countdownTimer}
                </p>
              ) }
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  score: store.player.score,
  name: store.player.name,
  gravatarEmail: store.player.gravatarEmail,
  level: store.trivia.level,
});

Game.propTypes = {}.isRequired;
export default connect(mapStateToProps)(Game);
