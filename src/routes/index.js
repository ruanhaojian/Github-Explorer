// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
// import HomeRoute from './Home'
// import UserPage from './UserPage'
// import CounterRoute from './Counter'
import UserPage from '../components/UserPage'
// import RepoList from '../components/RepoList'
// import RepoDetail from '../components/RepoDetail'
import RepoListRoute from './RepoList'
import RepoDetailRoute from './RepoDetail'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : {component: UserPage},
  childRoutes : [
    {
      path: '/user/:username',
      component:UserPage
    },
    RepoListRoute(store),
    RepoDetailRoute(store)
  ]
})

// export const createRoutes = (store) => ({
//   path        : '/',
//   component   : CoreLayout,
//   indexRoute  : {component: UserPage},
//   childRoutes : [
//     {
//       path: '/user/:username',
//       component:UserPage
//     },
//     {
//       path: '/user/:username/repos',
//       component:RepoList
//     },
//     {
//       path: '/user/:username/repos/:repoName',
//       component:RepoDetail
//     },
//   ]
// })


/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
