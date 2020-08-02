import { useEffect, useReducer } from 'react';
import axios from 'axios';

const ACTIONS = {
  LOADING: 'loading',
  GET_DATA: 'get_data',
  ERROR: 'error',
  UPDATE_NEXT_PAGE: 'update_next_page'
};

const BASE_URL =
  'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADING:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: []
      };
    case ACTIONS.UPDATE_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
};

const useFetchJobs = (params, page) => {
  const initState = { jobs: [], loading: true };
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.LOADING });
    console.log('hook params', params);
    axios
      .get(BASE_URL, {
        params: { ...params, markdown: true, page: page },
        cancelToken: cancelToken1.token
      })
      .then(res => {
        console.log('res', res);
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch(error => {
        if (axios.isCancel(error)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      });

    // const cancelToken2 = axios.CancelToken.source();
    // dispatch({ type: ACTIONS.LOADING });
    // axios
    //   .get(BASE_URL, {
    //     cancelToken: cancelToken2.token,
    //     params: { ...params, markdown: true, page: page + 1 }
    //   })
    //   .then(res =>
    //     dispatch({
    //       type: ACTIONS.GET_DATA,
    //       payload: { hasNextPage: res.data.length !== 0 }
    //     })
    //   )
    //   .catch(e => {
    //     if (axios.isCancel(e)) return;
    //     dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
    //   });

    return () => {
      cancelToken1.cancel();
      // cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
};

export default useFetchJobs;
