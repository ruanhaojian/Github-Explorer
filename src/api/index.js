import { apiFactory } from './resources'

export default {
  getRandomUser: function () {
    return apiFactory.getRandomUser()
  },
  getUserProfile: function (username) {
    return apiFactory.getUserProfile(username)
  },
  getUserProfileRepos: function (username) {
    return apiFactory.getUserProfileRepos(username)
  },
  getUsers: function (keyword) {
    return apiFactory.getUsers(keyword)
  },
  searchUserRepos: function (user, keyword, page) {
    return apiFactory.searchUserRepos(user, keyword, page)
  },
  getRepoDetail: function (username, repoName) {
    return apiFactory.getRepoDetail(username, repoName)
  },
  getRepoReadme: function (username, repoName) {
    return apiFactory.getRepoReadme(username, repoName)
  },
  getRepoContents: function (username, repoName) {
    return apiFactory.getRepoContents(username, repoName)
  },
  getRepoContribs: function (username, repoName) {
    return apiFactory.getRepoContribs(username, repoName)
  },
  getRepoLanguages: function (username, repoName) {
    return apiFactory.getRepoLanguages(username, repoName)
  },
}