import { createContext, useReducer, useState } from "react";
import githubReducer from "./GitHubReducer";

const GitHubContext = createContext();

export const GitHubProvider = ({ children }) => {

  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos: [],
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  /*//테스트용 유저 조회
   const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    // setUsers(data);
    // setLoading(false); //데이터 로딩 완료 false
    dispatch({
      type: 'GET_USERS',
      payload: data,
      loading: false
    })
  };*/

  /* //로딩 상태를 true로 업데이트하기 위한 dispatch
  const setLoading = () => dispatch({
    type: 'SET_LOADING'
  })

  const clearUsers = () => dispatch({
    type: 'CLEAR_USERS'
  })*/

  return (
    <GitHubContext.Provider value={{
      ...state,
      dispatch
    }}>
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext