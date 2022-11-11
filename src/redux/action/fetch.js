export const SUCESS_REQUEST = 'SUCESS_REQUEST';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const fetchAPI = () => ({
  type: 'FETCHING_API',
});

export const sucessRequest = (payload) => ({
  type: SUCESS_REQUEST,
  payload,
});

export const failedRequest = (payload) => ({
  type: FAILED_REQUEST,
  payload,
});

export const requestTrivia = (token) => async (dispatch) => {
  dispatch(fetchAPI());
  try {
    // const tokenEndpoint = `https://odb.com/api.php?amount=5&token=${token}`;
    // const tokenEndpoint = 'https://opentdb.com/api.php?amount=5&token=f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';
    // const tokenEndpoint = 'https://opentdb.com/api.php?amount=5&token=INVALID_TOKEN';

    const tokenEndpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(tokenEndpoint);
    const response = await request.json();
    dispatch(sucessRequest(response));
  } catch (error) {
    dispatch(failedRequest(`Desculpe, algo errado não está certo! ${error}`));
  }
};

// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
