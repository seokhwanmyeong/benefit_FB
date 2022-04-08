import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/api";
import { actionCreators as postActions } from "./post";

//Action
const SET_MY_COMMENT = "SET_MY_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

//Action Creators
const setMyComment = createAction(SET_MY_COMMENT, (list) => ({ list }));
const addComment = createAction(ADD_COMMENT, (list) => ({ list }));
const updateComment = createAction(UPDATE_COMMENT, (commentId, content) => ({ commentId, content }));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({ commentId }));

// initialState
const initialState = {
  comment_list: [],
};

//middlewares
const setMyCommentFB = () => {
    return function (dispatch) {
        dispatch(postActions.loading(true))
        instance.get(`/user/review`).then((res) => {
            // console.log(res.data);
            dispatch(setMyComment(res.data.comments));
        }).catch((error) => {
            console.log(error)
        })
        dispatch(postActions.loading(false))
    };
} 
const addCommentFB = (postId, nickname, userId, content) => {
    return function (dispatch) {
        instance.post(`/comment`, {
            postId: postId,
            content: content
        }).then((res) => {
            let today = new Date();   
            let year = today.getFullYear(); 
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let date = ('0' + today.getDate()).slice(-2);
            let hours = ('0' + today.getHours()).slice(-2); 
            let minutes = ('0' + today.getMinutes()).slice(-2);
            let seconds = ('0' + today.getSeconds()).slice(-2);
            let time = year + '.' + month + '.' + date + ' ' + hours + ':' + minutes + ':' + seconds
            let new_list = {
                commentId: res.data.commentId.CommentId,
                nickname: nickname[0] + '****',
                content: content,
                insert_time: time,
                userId: userId
            }
            dispatch(addComment(new_list))
        }).catch((error) => {
            console.log(error)
        })
    };
}

const updateCommentFB = (commentId, content) => {
    return function (dispatch) {
        instance.put(`/comment/update`, {
            commentId: commentId,
            content: content
        }).then((res) => {
            dispatch(updateComment(commentId, content))
            // alert("다시 시도해주세요")
        }).catch((error) => {
            console.log(error)
        })
    };
  }

const deleteCommentFB = (commentId) => {
  return function (dispatch) {
    instance.delete(`/comment/delete`, {
        data:{
            commentId: commentId
        }
    }).then((res) => {
        dispatch(deleteComment(commentId))
        // : alert("다시 시도해주세요")
    }).catch((error) => {
        console.log(error)
    })
  };
}

// reducer
export default handleActions(
  {
    [SET_MY_COMMENT]: (state, action) =>
    produce(state, (draft) => {
        draft.comment_list = action.payload.list;
    }),
    [ADD_COMMENT]: (state, action) =>
    produce(state, (draft) => {
        draft.comment_list.push(action.payload.list);
    }),
    [UPDATE_COMMENT]: (state, action) =>
    produce(state, (draft) => {
        draft.comment_list = state.comment_list.map((cur, idx, arr) => {
            if(cur.commentId == action.payload.commentId)
                cur = {...cur, content: action.payload.content};
            return cur;
        })
    }),
    [DELETE_COMMENT]: (state, action) =>
    produce(state, (draft) => {
        let new_arr = state.comment_list.filter(cur => cur.commentId != action.payload.commentId)
        draft.comment_list = new_arr
    }),
  },
  initialState
);

// action creator export
const actionCreators = {
    setMyComment,
    setMyCommentFB,
    addCommentFB,
    updateCommentFB,
    deleteCommentFB
};

export { actionCreators };