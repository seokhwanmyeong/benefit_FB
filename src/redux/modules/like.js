import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/api";

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
  like_list: [],
};

//middlewares
const setMyLikeFB = () => {
    return function (dispatch, getState) {
        instance.get(`/user/pick`).then((res) => {
            console.log(res.data.ZzimList);
            dispatch(setMyLikeList(res.data.ZzimList));
        }).catch((error) => {
            console.log(error)
        })
    };
} 
const setLikeFB = (postId, result) => {
  return function (dispatch, getState) {
    console.log("찜시작")
    console.log(postId, result);
    instance.post(`/detail/${postId}/zzim`, {
        zzim_status: result
    }).then((res) => {
        res.data.ok ? dispatch(addLike(postId)) : dispatch(deleteLike(postId))
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
        draft.like_list = action.payload.list;
    }),
    [ADD_LIKE]: (state, action) =>
    produce(state, (draft) => {
        draft.like_list.push(action.payload.postId);
    }),
    [DELETE_LIKE]: (state, action) =>
    produce(state, (draft) => {
        console.log(state.like_list)
        draft.like_list = state.like_list.filter(cur => cur.postId !== action.payload.postId)
    }),
  },
  initialState
);

// action creator export
const actionCreators = {
    setMyLikeFB,
    setLikeFB,
    addLike,
    deleteLike
};

export { actionCreators };