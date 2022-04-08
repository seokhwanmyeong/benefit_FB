import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/api";

import { actionCreators as userActions } from "./user";
import { actionCreators as postActions } from "./post";

//Action
const SET_LIKE_LIST = "SET_LIKE_LIST";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

//Action Creators
const setMyLikeList = createAction(SET_LIKE_LIST, (list) => ({ list }));
const addLike = createAction(ADD_LIKE, (postId) => ({ postId }));
const deleteLike = createAction(DELETE_LIKE, (postId) => ({ postId }));

// initialState
const initialState = {
  my_like_folder: [],
};

//middlewares
const setMyLikeFB = () => {
    return function (dispatch, getState) {
        dispatch(postActions.loading(true))
        instance.get(`/user/pick`).then((res) => {
            dispatch(setMyLikeList(res.data.list));
        }).catch((error) => {
            console.log(error)
        })
        dispatch(postActions.loading(false))
    };
}
const setLikeFB = (folderId, postId, status) => {
  return function (dispatch, getState) {
    instance.post(`/detail/${postId}/zzim`, {
        folderId : folderId,
        zzim_status : status 
    }).then((res) => {
        let user_folder = getState().user.user_folder;
        let _user_folder = []
        if(status){
            _user_folder = user_folder.map(cur => {
                if(cur.folderId == folderId){
                    if(cur.postId_list){
                        return {...cur, postId_list: [...cur.postId_list, String(postId)]}
                    }else{
                        return {...cur, postId_list: [String(postId)]}
                    }
                }
                return cur
            })
        }else{
            _user_folder = user_folder.map(cur => {
                if(cur.folderId == folderId){
                    let new_arr = cur.postId_list.filter(list => {
                        return list != postId;
                    })
                    return {...cur, postId_list: [...new_arr]}
                }
                return cur;
            })
        }
        dispatch(postActions.setDetailLike(status))
        dispatch(userActions.setUserFolder(_user_folder))
        localStorage.setItem('user_folder', JSON.stringify(_user_folder))
    }).catch((error) => {
        console.log(error)
    })
  };
}

// reducer
export default handleActions(
  {
    [SET_LIKE_LIST]: (state, action) =>
    produce(state, (draft) => {
        draft.my_like_folder = action.payload.list;
    }),
    [ADD_LIKE]: (state, action) =>
    produce(state, (draft) => {
        draft.like_list.push({postId: action.payload.postId});
    }),
    [DELETE_LIKE]: (state, action) =>
    produce(state, (draft) => {
        draft.like_list = state.like_list.filter(cur => cur.postId !== action.payload.postId)
    }),
  },
  initialState
);

// action creator export
const actionCreators = {
    setMyLikeList,
    setMyLikeFB,
    setLikeFB,
};

export { actionCreators };