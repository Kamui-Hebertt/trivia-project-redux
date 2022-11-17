import getLocal from './getStorage';

const setLocal = (newPlayer) => {
  // Quando o jogador na página ranking, será criado um localStorage
  // caso não exista ao menos uma posição no array (localStorage !== true)
  if (!JSON.parse(localStorage.getItem('playersRank'))) {
    localStorage.setItem('playersRank', JSON.stringify([]));
  }

  const playersAlreadyInLocal = getLocal();
  localStorage.setItem('playersRank', JSON.stringify(
    [...playersAlreadyInLocal,
      newPlayer],
  ));
};

export default setLocal;
