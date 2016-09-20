import * as types from './types'
import api from '../api'
import { Base64 } from 'js-base64';


const REPO_PER_PAGE = 10;

export function getRandomUser() {
    return (dispatch,getState)=>{

        // dispatch({type: types.TRIGGER_LOAD_ANIMATION})

        return api.getRandomUser()
    }
}

export function getUserProfile(username) {
    return (dispatch,getState)=>{

        return api.getUserProfile(username)
            .then(profile => dispatch({type: types.USER_PROFILE_RECEIVED, data: profile }))

    }
}

export function getUserProfileRepos(username) {
    return (dispatch,getState)=>{
        
        return api.getUserProfileRepos(username)
            .then(data => dispatch({type: types.USER_PROFILE_REPOS_RECEIVED, data: data.items }))
            .then(()=>{
                
                dispatch({type: types.TRIGGER_LOAD_ANIMATION_DONE})
                setTimeout(function () {
                    dispatch({type: types.TRIGGER_LOAD_ANIMATION_HIDE})
                }, 600)
                
            }).catch(() => {
                dispatch({type: types.TRIGGER_LOAD_ANIMATION_FAILED})
            })
        
    }
}

export function getUsers(keyword) {
    return (dispatch,getState)=>{

        dispatch({type: types.USERS_REQUEST})
        
        return api.getUsers(keyword)
            .then(data => data.users.slice(0, 15))
            .then(users => {
                dispatch({type: types.USERS_RECEIVED, data: users})
            })
        
    }
}

export function searchUserRepos(user, keyword, page) {
    return (dispatch,getState)=>{

        dispatch({type: types.TRIGGER_LOAD_ANIMATION})
        dispatch({type: types.USER_REPOS_REQUEST, page: page})


        return api.searchUserRepos(user, keyword, page)
            .then(data => {
                if (+page > 1) {
                    dispatch({
                        type: types.USER_REPOS_NEXT_PAGE_RECEIVED,
                        data: { page, repos: data.items }
                    })

                } else {
                    dispatch({
                        type: types.USER_REPOS_RECEIVED,
                        data: data.items
                    })
                }
                if (data.items.length < REPO_PER_PAGE) {
                    dispatch({
                        type: types.USER_REPOS_COMPLETE
                    })
                    
                }

                dispatch({type: types.TRIGGER_LOAD_ANIMATION_DONE})
                setTimeout(() => {dispatch({type: types.TRIGGER_LOAD_ANIMATION_HIDE})}, 600)
            })

    }
}

Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => { throw reason }, 0);
        });
};

export function getRepoPageDetail(username, repoName) {
    return (dispatch,getState)=>{

        dispatch({type: types.TRIGGER_LOAD_ANIMATION})

        return Promise.all([
            api.getRepoDetail(username, repoName),
            api.getRepoReadme(username, repoName),
            api.getRepoContents(username, repoName),
            api.getRepoContribs(username, repoName),
            api.getRepoLanguages(username, repoName)
        ]).then(([ repo, readmeData, contents, contris, languages ]) => {

            var readme = readmeData.content || '';
            readme = Base64.decode(readme.replace(/\s/g, ''))

            contents.sort((a, b) => a.type.localeCompare(b.type));

            const newLanguages = Object.keys(languages)
                .map(key => ({ name: key, value: languages[key] }));

            let total = 0;
            if (newLanguages.length === 0) {
                total = 0;
            } else if (newLanguages.length === 1) {
                total = newLanguages[0].value;
            } else {
                total = newLanguages.reduce((a, b) => ({ value: a.value + b.value })).value;
            }

            var nl = newLanguages.map(a => ({
                name: a.name,
                value: Math.round(1000 * a.value / total) / 10,
            }));
            
            dispatch({
                type: types.REPO_DETAIL_RECEIVED_ALL,
                data:{
                    repo,
                    readme: readme,
                    contents,
                    contris,
                    languages: nl,
                }
            })
        }).then(() => {
            dispatch({type: types.TRIGGER_LOAD_ANIMATION_DONE})
            setTimeout(function () {
                dispatch({type: types.TRIGGER_LOAD_ANIMATION_HIDE})
            }, 600)
        }).catch(error => {
            dispatch({type: types.REPO_DETAIL_REQUEST_PAGE_FAILED})
        })

    }
}


// export function getRandomUser() {
//     return (dispatch,getState)=>{
//
//         dispatch({type: types.TRIGGER_LOAD_ANIMATION})
//
//         return api.getRandomUser()
//             .then(data => {
//                 // alert(JSON.stringify(data))
//                 const user = data.items[0]
//                 api.getUserProfile(user.login)
//                     .then(profile => dispatch({type: types.USER_PROFILE_RECEIVED, data: profile }))
//                     .then(()=>{
//
//                         dispatch({type: types.TRIGGER_LOAD_ANIMATION_DONE})
//                         setTimeout(function () {
//                             dispatch({type: types.TRIGGER_LOAD_ANIMATION_HIDE})
//                         }, 600)
//
//                     })
//
//                 return data
//             })
//     }
// }



