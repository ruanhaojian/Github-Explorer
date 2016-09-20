// import { injectReducer } from '../../store/reducers'
//
// export default (store) => ({
//     // path : '/user/:username',
//     /*  Async getComponent is only invoked when route matches   */
//     getComponent (nextState, cb) {
//         /*  Webpack - use 'require.ensure' to create a split point
//          and embed an async module loader (jsonp) when bundling   */
//         require.ensure([], (require) => {
//             /*  Webpack - use require callback to define
//              dependencies for bundling   */
//             const UserPage = require('./containers/UserPageContainer').default
//             const reducer = require('./modules/UserPage').default
//
//
//             /*  Add the reducer to the store on key 'counter'  */
//             injectReducer(store, { key: 'UserPageReducer', reducer })
//
//             // const reducer2 = require('../CoreLayout/modules/LoadingBlock').default
//             // injectReducer(store, { key: 'loadingBlockReducer', reducer2 })
//
//
//             /*  Return getComponent   */
//             cb(null, UserPage)
//
//             /* Webpack named bundle   */
//         }, 'UserPageReducer')
//     }
// })

import UserPage from '../../components/UserPage'

// Sync route definition
export default {
  path      : '/user/:username',
  component : UserPage
}

