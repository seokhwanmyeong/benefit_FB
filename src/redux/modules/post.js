import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/api";
// import { getCookie } from "../../shared/Cookie";
import { actionCreators as userActions } from "./user";

//Action
const SET_POST_MAIN = "SET_POST_MAIN";
const GET_CATE_LIST = "GET_CATE_LIST";
const GET_MORE_LIST = "GET_MORE_LIST";
const GET_FILTER_LIST = "GET_FILTER_LIST";
const GET_DETAIL = "GET_DETAIL";
const SET_OPTIONS = "SET_OPTIONS";
const SET_CATE = "SET_CATE";
const LOADING = "LOADING";

//Action Creators
const setPostMain = createAction(SET_POST_MAIN, (list) => ({ list }));
const getCateList = createAction(GET_CATE_LIST, (list) => ({ list }));
const getFilterList = createAction(GET_FILTER_LIST, (list) => ({ list }));
const getDetail = createAction(GET_DETAIL, (contents) => ({ contents }));
const setOptions = createAction(SET_OPTIONS, (options) => ({ options }))
const setCate = createAction(SET_CATE, (cate, reset) => ({ cate, reset }))
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
    benefit : "all",
    limit : "false",
    special_limit : "false",
    apply_period : ["all"],
    location : ["all"],
  },
  list_detail: {},
  is_loading: false,
  // paging: { start: null, next: null, size: 3 },
};

//middlewares
const setMainFB = () => {
  return function (dispatch, getState, { history }) {
    instance.get("/main").then((res) => {
      // console.log("axios", res.data);
      dispatch(setPostMain(res.data));
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getCateListFB = (option) => {
  return function (dispatch, getState, { history }) {
    console.log(option)
    let trans_locate = option.location.map((cur, idx, arr) => {
      if(cur === "지역무관"){
        cur = "전국"
      }
      return cur;
    })
    // console.log(trans_locate)

    instance.post(
      "/search",
      {
        data: {
          txt: option.txt,
          job_status : option.job_status,
          apply_period : [...option.apply_period],
          education : option.education,
          benefit : option.benefit,
          location : [...trans_locate],
          limit : option.limit,
          special_limit : option.special_limit,
        }
      }
    )
    .then((res) => {
      console.log(res.data.cZip);
      dispatch(getCateList(res.data.cZip));
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

// const getFilterListFB = (option) => {
//   return function (dispatch, getState, { history }) {
//     console.log(option)
//     instance.post(
//       "/search",
//       {
//         data: {
//           txt: option.txt,
//           job_status : option.job_status,
//           apply_period : option.apply_period,
//           education : option.education,
//           category : option.category, 
//           benefit : option.benefit,
//           location : option.location,
//           limit : option.limit,
//           special_limit : option.special_limit,
//         }
//       }
//     )
//     .then((res) => {
//       console.log(res.data);
//       // res.data.forEach((list) => {
//       //   let post = Object.keys(list).reduce((acc, cur) => {
//       //     return { ...acc, [cur]: list[cur] };
//       //   }, {});
//       //   all_list.push(post);
//       // });
//       dispatch(getFilterList(res.data));
//     });
//   };
// };

const getOnePostFB = (post_id) => {
  return function (dispatch, getState) {
    instance.get(`/detail/${post_id}`).then((res) => {
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
        draft.main_list.todayBest = action.payload.list.todayBest;
        draft.main_list.categoryBest = action.payload.list.categoryBest;
        draft.main_list.review_link = action.payload.list.review_link;
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
    }),
    [SET_OPTIONS]: (state, action) =>
      produce(state, (draft) => {
        draft.options = {...action.payload.options};
    }),
    [SET_CATE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload)
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
  // getFilterListFB,
  getOnePostFB,
  setOptions,
  setCate,
};

export { actionCreators };