import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/api";
// import "moment";
// import moment from "moment";
// import { getCookie } from "../../shared/Cookie";


//Action
const SET_POST_MAIN = "SET_POST_MAIN";
const GET_CATE_LIST = "GET_CATE_LIST";
const GET_MORE_LIST = "GET_MORE_LIST";
const GET_FILTER_LIST = "GET_FILTER_LIST";
const GET_DETAIL = "GET_DETAIL"
const LOADING = "LOADING";

//Action Creators
const setPostMain = createAction(SET_POST_MAIN, (list) => ({ list }));
const getCateList = createAction(GET_CATE_LIST, (list) => ({ list }));
const getMoreList = createAction(GET_MORE_LIST, (list) => ({ list }));
const getFilterList = createAction(GET_FILTER_LIST, (list) => ({ list }));
const getDetail = createAction(GET_DETAIL, (contents) => ({ contents }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState
const initialState = {
  main_list: {
    todayBest: [],
    categoryBest: [],
    review_link: []
  },
  search_list: {
    cate_list: [],
    filter_list: []
  },
  list_detail: {},
  is_loading: false,
  // paging: { start: null, next: null, size: 3 },
};

//middlewares
const setMainFB = () => {
  return function (dispatch, getState, { history }) {
    instance.get("/main").then((res) => {
      console.log("axios", res.data);
      dispatch(setPostMain(res.data));
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getCateListFB = (cate) => {
  return function (dispatch, getState, { history }) {
    // instance.get(`/seacrh/${cate}`).then((res) => {
    //   console.log(res.data);
    //   dispatch(getCateList(res.data));
    // });
    console.log(cate)
    instance.get(`/search`).then((res) => {
      console.log("axios", res.data);
      dispatch(getCateList(res.data));
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getCateListFBtest = (cate) => {
  return function (dispatch, getState, { history }) {
    // instance.get(`/seacrh/${cate}`).then((res) => {
    //   console.log(res.data);
    //   dispatch(getCateList(res.data));
    // });
    console.log(cate)
    instance.get(`/search1`).then((res) => {
      console.log("axios", res.data);
      dispatch(getCateList(res.data));
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getMoreListFBtest = (cate) => {
  return function (dispatch, getState, { history }) {
    // instance.get(`/seacrh/${cate}`).then((res) => {
    //   console.log(res.data);
    //   dispatch(getCateList(res.data));
    // });
    console.log(cate)
    instance.get(`/search1`).then((res) => {
      console.log("axios", res.data);
      dispatch(getMoreList(res.data));
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getFilterListFB = (option) => {
  return function (dispatch, getState, { history }) {
    console.log(option)
    instance.post(
      "/search",
      {
        data: {
          txt: option.txt,
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
    instance.get(`/detail`).then((res) => {
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
        draft.main_list.review_link.push(...action.payload.list.review_link);
    }),
    [GET_CATE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list.cate_list = action.payload.list;
    }),
    [GET_MORE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list.cate_list.push(...action.payload.list);
    }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.list_detail = action.payload.contents;
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
  getFilterListFB,
  getOnePostFB,
  getCateListFBtest
};

export { actionCreators };
