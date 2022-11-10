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
    const tokenEndpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(tokenEndpoint);
    const response = await request.json();
    dispatch(sucessRequest(response));
  } catch (error) {
    dispatch(failedRequest(`Desculpe, algo errado não está certo! ${error}`));
  }
};

// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
