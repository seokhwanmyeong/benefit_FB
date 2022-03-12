import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";

import instance from "../../shared/api";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// import Like from "../../components/Like";

const SET_POST_MAIN = "SET_POST_MAIN";
const GET_CATE_LIST = "GET_CATE_LIST";
const GET_DETAIL = "GET_DETAIL"
const GET_FILTER_LIST = "GET_FILTER_LIST";
const LOADING = "LOADING";

//Action Creators

//Call NormalList
const setPostMain = createAction(SET_POST_MAIN, (list) => ({ list }));
const getCateList = createAction(GET_CATE_LIST, (list) => ({ list }));
const getDetail = createAction(GET_DETAIL, (contents) => ({ contents }));
const getFilterList = createAction(GET_FILTER_LIST, (list) => ({ list }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));


const initialState = {
  main_list: {
    todayBest: [],
    categoryBest: []
  },
  search_list: [],
  list_detail: {},
  is_loading: false,
  // paging: { start: null, next: null, size: 3 },
};


//middlewares
const getMainFB = () => {
  return function (dispatch, getState, { history }) {
    let all_list = [];
    // let best_list = [];
    // let normal_list = [];

    instance.get("/main").then((res) => {
      console.log(res.data);
      // res.data.forEach((list) => {
      //   let post = Object.keys(list).reduce((acc, cur) => {
      //     return { ...acc, [cur]: list[cur] };
      //   }, {});
      //   all_list.push(post);
      // });
      dispatch(setPostMain(res.data));
    });
  };
};

const getCateListFB = (cate) => {
  return function (dispatch, getState, { history }) {
    let all_list = [];
    // let best_list = [];
    // let normal_list = [];

    instance.get(`/main/${cate}`).then((res) => {
      console.log(res.data);
      // res.data.forEach((list) => {
      //   let post = Object.keys(list).reduce((acc, cur) => {
      //     return { ...acc, [cur]: list[cur] };
      //   }, {});
      //   all_list.push(post);
      // });
      dispatch(getCateList(res.data));
    });
  };
};

const getFilterListFB = (option) => {
  return function (dispatch, getState, { history }) {

    instance.post(
      "/search",
      {
        data: {
          job_status : option.job_status,
          apply_period : option.apply_period,
          education : option.education,
          category : option.category, 
          benefit : option.benefit,
          location : option.location,
          limit : option.limit,
          special_limit : option.special_limit,
        }
      }
    )
    .then((res) => {
      console.log(res.data);
      // res.data.forEach((list) => {
      //   let post = Object.keys(list).reduce((acc, cur) => {
      //     return { ...acc, [cur]: list[cur] };
      //   }, {});
      //   all_list.push(post);
      // });
      dispatch(getFilterList(res.data));
    });
  };
};


const getOnePostFB = (post_id) => {
  return function (dispatch, getState) {
    console.log("getOnePostFB 실행")
    const cookie = getCookie("is_login");
    const session_id = localStorage.getItem("user");

    // const postDB = firestore.collection("post");
    // const postDB = instance;
    // postDB.get(`/user/post/${id}`).then((res) => {
    instance.get(`/main/${post_id}`).then((res) => {
      console.log(res.data);
      dispatch(getDetail(res.data));
    })
    .catch((error) => {
      console.log(error)
    })
  };
};

// reducer
export default handleActions(
  {
    [SET_POST_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.main_list.todayBest.push(...action.payload.list.todayBest);
        draft.main_list.categoryBest.push(...action.payload.list.categoryBest);
    }),
    [GET_CATE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.main_list.search_list.push(...action.payload.list);
    }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.list_detail.push(...action.payload.contents);
    }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  getMainFB,
  getCateListFB,
  getFilterListFB,
  getOnePostFB,
};

export { actionCreators };
