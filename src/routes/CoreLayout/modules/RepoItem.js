import {
    DETAIL_TRANSITION_DATA,
} from '../../../actions/types'


export function detailTransitionData(startPosition, repoData) {
    return (dispatch,getState)=>{

        return dispatch({
            type: DETAIL_TRANSITION_DATA,
            startPosition,
            repoData
        });

    }
}