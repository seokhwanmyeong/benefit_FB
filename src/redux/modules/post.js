import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/api";
// import { getCookie } from "../../shared/Cookie";
import { actionCreators as userActions } from "./user";
import axios from "axios";

//Action
const SET_POST_MAIN = "SET_POST_MAIN";
const GET_CATE_LIST = "GET_CATE_LIST";
const GET_DETAIL = "GET_DETAIL";
const SET_OPTIONS = "SET_OPTIONS";
const SET_CATE = "SET_CATE";
const SET_STANDARD = "SET_STANDARD";
const LOADING = "LOADING";

//Action Creators
const setPostMain = createAction(SET_POST_MAIN, (list, review_link) => ({ list, review_link }));
const getCateList = createAction(GET_CATE_LIST, (list) => ({ list }));
const getDetail = createAction(GET_DETAIL, (contents, review_link) => ({ contents, review_link }));
const setOptions = createAction(SET_OPTIONS, (options) => ({ options }));
const setCate = createAction(SET_CATE, (cate, reset) => ({ cate, reset }));
const setStandard = createAction(SET_STANDARD, (standard) => ({ standard }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState
const initialState = {
  main_list: {
    todayBest: [],
    categoryBest: [],
    review_link: []
  },
  search_list: {
    c0 : [],
    c1 : [],
    c2 : [],
    c3 : [],
    c4 : [],
    c5 : [],
    c6 : [],
  },
  cate: ['c0'],
  options: {
    txt: "all",
    job_status : "all",
    education : "all",
    limit : "all",
    special_limit : "all",
    benefit : ["all"],
    apply_period : ["all"],
    location : ["all"],
  },
  standard: "popul",
  list_detail: {},
  review_link: [],
  is_loading: false,
  // paging: { start: null, next: null, size: 3 },
};

//middlewares
const setMainFB = () => {
  return function (dispatch, getState, { history }) {
    instance.get("/main").then((res) => {
      // console.log("axios", res.data);
      dispatch(loading(true));
      axios.get('http://localhost:4000/main').then((_res) => {
        console.log(_res.data.review_link);
        dispatch(setPostMain(res.data , _res.data.review_link));
      })
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getCateListFB = (option) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    let trans_locate = option.location.map((cur, idx, arr) => {
      if(cur === "지역무관"){
        cur = "전국"
      }
      return cur;
    })
    // console.log(trans_locate)

    if(option.txt === "") option.txt = "all"
    // console.log(option)
    instance.post(
      "/search",
      {
        txt: option.txt,
        job_status : option.job_status,
        apply_period : [...option.apply_period],
        education : option.education,
        benefit : option.benefit,
        location : [...trans_locate],
        limit : option.limit,
        special_limit : option.special_limit,
      }
    )
    .then((res) => {
      console.log(res.data);
      dispatch(getCateList(res.data));
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getOnePostFB = (post_id) => {
  return function (dispatch, getState) {
    instance.get(`/detail/${post_id}`).then((res) => {
      console.log(res.data);
      axios.get('http://localhost:4000/main').then((_res) => {
        console.log(_res.data.review_link);
        dispatch(getDetail(res.data.post, _res.data.review_link));
      })
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
        draft.main_list.todayBest = action.payload.list.todayBest;
        draft.main_list.categoryBest = action.payload.list.categoryBest;
        draft.main_list.review_link = action.payload.review_link;
    }),
    [GET_CATE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list.c0 = action.payload.list.c0;
        draft.search_list.c1 = action.payload.list.c1;
        draft.search_list.c2 = action.payload.list.c2;
        draft.search_list.c3 = action.payload.list.c3;
        draft.search_list.c4 = action.payload.list.c4;
        draft.search_list.c5 = action.payload.list.c5;
        draft.search_list.c6 = action.payload.list.c6;
    }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.list_detail = action.payload.contents;
        draft.review_link = action.payload.review_link;
    }),
    [SET_OPTIONS]: (state, action) =>
      produce(state, (draft) => {
        draft.options = {...action.payload.options};
    }),
    [SET_CATE]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload)
        if(draft.cate.includes(action.payload.cate) & draft.cate.length > 1){
          let arr = draft.cate.filter(cur => {
            return cur !== action.payload.cate
          })
          draft.cate = arr;
        }else if(!draft.cate.includes(action.payload.cate)){
          if(action.payload.cate === 'c0'){
            draft.cate = ["c0"];
          }else if(draft.cate.length === 5){
            draft.cate = ["c0"];
          }else if(action.payload.reset){
            draft.cate = [action.payload.cate]
          }else {
            draft.cate.push(action.payload.cate);
            let arr = draft.cate.filter(cur => {
              return cur !== "c0"
            })
            draft.cate = arr;
          }
        }
    }),
    [SET_STANDARD]: (state, action) =>
      produce(state, (draft) => {
        draft.standard = action.payload.standard;
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
  setMainFB,
  getCateListFB,
  getOnePostFB,
  setOptions,
  setStandard,
  setCate,
};

export { actionCreators };