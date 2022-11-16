const setLocal = (player) => {
  localStorage.setItem('players', JSON.stringify(player));
};

export default setLocal;
