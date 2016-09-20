import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : '/user/:username/repos/:repoName',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const RepoDetail = require('../../components/RepoDetail').default
            const reducer = require('../CoreLayout/modules/RepoDetail').default
            
            
            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'repoDetailReducer', reducer })
            
            // const reducer2 = require('../CoreLayout/modules/LoadingBlock').default
            // injectReducer(store, { key: 'loadingBlockReducer', reducer2 })
            
            
            /*  Return getComponent   */
            cb(null, RepoDetail)
            
            /* Webpack named bundle   */
        }, 'repoDetailReducer')
    }
})