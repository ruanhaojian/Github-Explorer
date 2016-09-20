import 'whatwg-fetch'

const TOKEN = '48d499e1bbc2e206d1e4f720f101af12a5918806'
const REPO_PER_PAGE = 10

const api = (url) =>
    fetch(url, {
      headers : {
        Authorization : `token ${TOKEN}`
      }
    })
        .then(response => response.json())
        .then(data => {
          if (data.errors) {
            // action.onNext({ name: ACTION_TYPES.REQUEST_FAILED, data });
            return Promise.reject(data)
          }
          return data
        })
        .catch((...args) => {
          // action.onNext({ name: ACTION_TYPES.REQUEST_FAILED, data: [...args] });
          return Promise.reject(...args)
        })

export const apiFactory = {
  getRandomUser : () =>
      api('https://api.github.com/search/users?q=type:user&page=1&per_page=1'),
  getUserProfile : (username) =>
        api(`https://api.github.com/users/${username}`),
  getUserProfileRepos : (username) =>
        api('https://api.github.com/search/repositories' +
            `?q=user:${username}&sort=stars&page=1&per_page=${REPO_PER_PAGE}`),
  getUsers : (keyword) =>
        api('https://api.github.com/legacy/user/search/' +
            `${keyword || Math.random().toString(36).split('')[2]}%20sort:followers`),
  searchUserRepos : (user, keyword, page) =>
        api('https://api.github.com/search/repositories' +
            `?q=${keyword}%20user:${user}&sort=updated&page=${page}&per_page=${REPO_PER_PAGE}`),
  getRepoDetail : (username, repoName) =>
        api(`https://api.github.com/repos/${username}/${repoName}`),
  getRepoReadme : (username, repoName) =>
        api(`https://api.github.com/repos/${username}/${repoName}/readme`),
  getRepoContents : (username, repoName) =>
        api(`https://api.github.com/repos/${username}/${repoName}/contents`),
  getRepoContribs : (username, repoName) =>
        api(`https://api.github.com/repos/${username}/${repoName}/contributors`),
  getRepoLanguages : (username, repoName) =>
        api(`https://api.github.com/repos/${username}/${repoName}/languages`)

}

