import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  }
});

//특정 단어로 유저 찾기
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text
  });
  const response = await github.get(`${GITHUB_URL}/search/users?${params}`);
  return response.data.items;
};

//아이디로 유저&repo 검색
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);
  if ([user, repos].status === 404) {
    window.location = '/notfound'
  } else {
    return { user: user.data, repos: repos.data };
  }
};