import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/api";
import { actionCreators as userActions } from "./user";
import { actionCreators as commentActions } from "./comment";

//Action
const GET_POST_MAIN = "GET_POST_MAIN";
const GET_CATE_LIST = "GET_CATE_LIST";
const GET_DETAIL = "GET_DETAIL";
const GET_CURATION = "GET_CURATION";
const GET_FOLDER = "GET_FOLDER";
const GET_FOLDER_CONT = "GET_FOLDER_CONT";
const GET_MORE_LIST = "GET_MORE_LIST";
const SET_OPTIONS = "SET_OPTIONS";
const SET_CATE = "SET_CATE";
const SET_STANDARD = "SET_STANDARD";
const SET_DETAIL_LIKE = "SET_DETAIL_LIKE";
const SET_LINK = "SET_LINK";
const SET_FOLDER = "SET_FOLDER";
const SET_FILTER_STATE = "SET_FILTER_STATE";
const DELETE_LINK = "DELETE_LINK";
const LOADING = "LOADING";
// const SET_UPDATE_FOLDER = "SET_UPDATE_FOLDER";
// const SET_DELETE_FOLDER = "SET_DELETE_FOLDER";

//Action Creators
const getPostMain = createAction(GET_POST_MAIN, (list, review_link) => ({ list, review_link }));
const getCateList = createAction(GET_CATE_LIST, (list) => ({ list }));
const getDetail = createAction(GET_DETAIL, (contents, review_link) => ({ contents, review_link }));
const getCuration = createAction(GET_CURATION, (list) => ({ list }));
const getFolder = createAction(GET_FOLDER, (list) => ({ list }));
const getFolderCont = createAction(GET_FOLDER_CONT, (contents) => ({ contents }));
const getMoreList = createAction(GET_MORE_LIST, (list) => ({ list }));
const setOptions = createAction(SET_OPTIONS, (options) => ({ options }));
const setCate = createAction(SET_CATE, (cate, reset) => ({ cate, reset }));
const setStandard = createAction(SET_STANDARD, (order) => ({ order }));
const setDetailLike = createAction(SET_DETAIL_LIKE, (status) => ({ status }));
const setLink = createAction(SET_LINK, (list) => ({ list }));
const setFolder = createAction(SET_FOLDER, (list) => ({list}));
const setFilterState = createAction(SET_FILTER_STATE, (state) => ({state}));
const deleteLink = createAction(DELETE_LINK, (list) => ({ list }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
// const setUpdateFolder = createAction(SET_UPDATE_FOLDER, (data) => ({data}));
// const setDeleteFolder = createAction(SET_DELETE_FOLDER, (folderId) => ({folderId}));

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
    count: []
  },
  cate: ['all'],
  options: {
    txt: "all",
    job_status : "all",
    education : "all",
    benefit : ["all"],
    apply_period : ["all"],
    location : ["all"],
    age: "all",
    major: "all",
    special_limit : "all",
  },
  order: "인기순",
  paging: 1,
  list_detail: {
    "Zzims.zzim_status": "false",
    age: "",
    apply_period: "",
    apply_site: "",
    benefit: "",
    benefit_desc: "",
    category: "",
    dday: "",
    do_period: "",
    education: "",
    etc: "",
    group: "",
    job_status: "",
    location: "",
    major: "",
    maker: "",
    operation: "",
    plus: "",
    postId: 0,
    process: "",
    reference_site1: "",
    reference_site2: "",
    residence: "",
    scale: "",
    special: "",
    submit: "",
    summary: "",
    title: "",
    view: 0
  },
  review_link: [],
  is_loading: false,
  folder_list: [],
  my_folder_list: [],
  folder_contents: {},
  filter_state: false
};

//middlewares
const getMainFB = () => {
  return function (dispatch) {
    dispatch(loading(true));
    instance.get("/main").then((res) => {
      dispatch(getPostMain(res.data));
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getCateListFB = (option, cate) => {
  return function (dispatch, getState) {
    dispatch(loading(true));
    const order = getState().post.order;
    const paging = getState().post.paging;

    /* 지역무관을 전국data로 통신하기위한 변환 */
    let trans_locate = option.location.map((cur, idx, arr) => {
      if(cur === "지역무관") cur = "전국"

      return cur;
    })

    /* 검색란이 비어있을 경우 'all' data 통신하기로 약속 */
    if(option.txt === "") option.txt = "all"
  
    //category포함 / 모두면 "all"
    instance.post(
      "/search",
      {
        category: cate,
        txt: option.txt,
        job_status : option.job_status,
        apply_period : [...option.apply_period],
        education : option.education,
        benefit : option.benefit,
        location : [...trans_locate],
        age: option.age,
        major: option.major,
        special_limit : option.special_limit,
        order: order,
        paging: paging
      }
    )
    .then((res) => {
      let localOption = {
        txt: option.txt,
        job_status : option.job_status,
        apply_period : [...option.apply_period],
        education : option.education,
        benefit : option.benefit,
        location : [...trans_locate],
        age: option.age,
        major: option.major,
        special_limit : option.special_limit,
        order: order,
        paging: paging
      }
      localStorage.setItem('options', JSON.stringify(localOption));
      dispatch(getCateList(res.data));
      dispatch(setStandard(order))
      const reset_options = {
        txt: "all",
        job_status : "all",
        education : "all",
        benefit : ["all"],
        apply_period : ["all"],
        location : ["all"],
        age: "all",
        major: "all",
        special_limit : "all",
      }
      dispatch(setOptions(reset_options))
    })
    .catch((error) => {
      console.log(error)
    });
  };
};

const getMoreListFB = (option, cate) => {
  return function (dispatch, getState) {
    const order = getState().post.order;

    /* 지역무관을 전국data로 통신하기위한 변환 */
    let trans_locate = option.location.map((cur, idx, arr) => {
      if(cur === "지역무관") cur = "전국"

      return cur;
    })
    /* 검색란이 비어있을 경우 'all' data 통신하기로 약속 */
    if(option.txt === "") option.txt = "all"
    // category포함 / 모두면 "all"

    instance.post(
      "/search",
      {
        category: cate,
        txt: option.txt,
        job_status : option.job_status,
        apply_period : [...option.apply_period],
        education : option.education,
        benefit : option.benefit,
        location : [...trans_locate],
        age: option.age,
        major: option.major,
        special_limit : option.special_limit,
        order: order,
        paging: option.paging + 1
      }
    )
    .then((res) => {
      let localOption = {
        txt: option.txt,
        job_status : option.job_status,
        apply_period : [...option.apply_period],
        education : option.education,
        benefit : option.benefit,
        location : [...trans_locate],
        age: option.age,
        major: option.major,
        special_limit : option.special_limit,
        order: order,
        paging: option.paging + 1
      }
      localStorage.setItem('options', JSON.stringify(localOption));
      dispatch(getMoreList(res.data));
    })
    .catch((error) => {
      console.log(error)
    });
  };
}

const getOnePostFB = (post_id) => {
  return function (dispatch) {
    dispatch(loading(true));
    instance.get(`/detail/${post_id}`).then((res) => {
      dispatch(getDetail(res.data));
      dispatch(commentActions.setMyComment(res.data.comment));
    })
    .catch((error) => {
      console.log(error)
    })
  };
};

const getCurationFB = (standard) => {
  return function (dispatch) {
    dispatch(loading(true));
    instance.get(`/curation/main/${standard}`).then((res) => {
      dispatch(getCuration(res.data.curationlist));
    })
    .catch((error) => {
      console.log(error)
    })
  };
}

const getFolderFB = () => {
  return function (dispatch) {
    dispatch(loading(true));
    instance.get(`/user/pick`).then((res) => {
      dispatch(getFolder(res.data.list[0]));
    })
    .catch((error) => {
      console.log(error)
    })
  };
}

const getFolderContFB = (folderId) => {
  return function (dispatch) {
    dispatch(loading(true));
    instance.get(`/curation/${folderId}`).then((res) => {
      dispatch(getFolderCont(res.data));
    })
    .catch((error) => {
      console.log(error)
    })
    dispatch(loading(false));
  };
}

const setLinkFB = (link, postId) => {
  return function (dispatch) {
    /*블로그 후기 리뷰 저장(link) */
    instance.post(`/detail/${postId}/link`, {
      review_link: link
    }).then((res) => {
      let list = {reviewId: res.data.reviewId, review_link: link, review_status: true}
      dispatch(setLink(list));
    })
    .catch((error) => {
      console.log(error)
    })
  };
};

const deleteLinkFB = (reviewId) => {
  return function (dispatch, getState) {
    instance.delete(`/review/delete`, {
      data: {
        reviewId: reviewId
      }
    }).then((res) => {
      /* 링크 삭제후 store의 data에서 제외 */
      let new_arr = getState().post.review_link.filter(cur => {
        return cur.reviewId !== reviewId
      })
      dispatch(deleteLink(new_arr));
    })
    .catch((error) => {
      console.log(error)
    })
  };
};

const setFolderFB = (folder_name) => {
  return function (dispatch, getState) {
    instance.post(`/folder/create`, {
      folder_name: folder_name
    }).then((res) => {
      let user_folder = getState().user.user_folder;
      let my_folder = getState().post.my_folder_list

      /* localstorage 기본유저리스트 저장을 위한 object */
      user_folder = [
        ...user_folder, 
        {
          folder_name: folder_name,
          folder_content: '',
          folderId: res.data.folderId,
          folder_status: false,
          postId_list: []
        }
      ]

      /* storage data저장을 위한 object */
      my_folder = [
        ...my_folder,
        {
          folder_name: folder_name,
          folder_content: '',
          folderId: res.data.folderId,
          folder_status: false,
          postId_list: [],
          c1: null,
          c2: null,
          c3: null,
          c4: null,
          benefit: null,
        }
      ]

      localStorage.setItem("user_folder", JSON.stringify(user_folder));
      dispatch(userActions.setUserFolder(user_folder));
      dispatch(setFolder(my_folder))
    })
    .catch((error) => {
      console.log(error)
    })
  };
};

const setUpdateFolderFB = (folderId, folder_name, folder_content, status) => {
  return function (dispatch, getState, {history}) {
    instance.put(`/folder/update`, {
      folderId : folderId,
      folder_name: folder_name,
      folder_content: folder_content,
      folder_status : status
    }).then((res) => {
      if(res.data.ok){
        let user_folder = getState().user.user_folder;
        let _user_folder = user_folder.map(cur => {
          if(cur.folderId == folderId){
            return {...cur, folder_name: folder_name, folder_content: folder_content, folder_status: Number(status)}
          }
          return cur
        })
        localStorage.setItem("user_folder", JSON.stringify(_user_folder));
        dispatch(userActions.setUserFolder(_user_folder))

        if(history.location.pathname === '/mypage'){
          let my_folder = getState().post.my_folder_list;
          let _my_folder = my_folder.map(cur => {
            if(cur.folderId == folderId){
              return {...cur, folder_name: folder_name, folder_content: folder_content, folder_status: Number(status)}
            }
            return cur
          })
          dispatch(getFolder(_my_folder));
        }else if(history.location.pathname.includes('/folder')){
          let folder_contents = getState().post.folder_contents;
          let folder_main = [{...folder_contents.maincuration[0], folder_name: folder_name, folder_content: folder_content, folder_status: Number(status)}]
          let new_arr = {...folder_contents, maincuration: folder_main}

          dispatch(getFolderCont(new_arr));
        }else if(history.location.pathname.includes('/curation')){
          let _folder_list = getState().post.folder_list;
          let folder_list = _folder_list.map(cur => {
            if(cur.folderId == folderId){
              return {...cur, folder_name: folder_name, folder_content: folder_content, folder_status: Number(status)}
            }
            return cur
          })
          dispatch(getCuration(folder_list));
        }
        
      }
    })
    .catch((error) => {
      console.log(error)
    })
  };
}

const setDeleteFolderFB = (folderId) => {
  return function (dispatch, getState, {history}) {
    instance.delete(`/folder/delete`, {
      data:{
        folderId: folderId
      }
    }).then((res) => {
      if(res.data.ok){
        let user_folder = getState().user.user_folder;
        let _user_folder = user_folder.filter(cur => {
          return cur.folderId != folderId
        })
        localStorage.setItem("user_folder", JSON.stringify(_user_folder));
        dispatch(userActions.setUserFolder(_user_folder))

        if(history.location.pathname === '/mypage'){
          let my_folder = getState().post.my_folder_list;
          let _my_folder = my_folder.filter(cur => {
            return cur.folderId != folderId
          })
          dispatch(getFolder(_my_folder));
        }else if(history.location.pathname === '/curation'){
          let folder_list = getState().post.folder_list;
          let _folder_list = folder_list.filter(cur => {
            return cur.folderId != folderId
          })
          dispatch(getCuration(_folder_list));
        }else if(history.location.pathname.includes('/folder')){
          history.replace('/mypage')
        }
      }else{
        alert('폴더가 하나일때는 지우실수 없습니다')
      }
    })
    .catch((error) => {
      console.log(error)
    })
  };
}

// reducer
export default handleActions(
  {
    [GET_POST_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.main_list.todayBest = action.payload.list.todayBest;
        draft.main_list.categoryBest = action.payload.list.categoryBest;
        draft.main_list.review_link = action.payload.list.mainReview;
        draft.is_loading = false;
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
        draft.search_list.count = action.payload.list.count;
        draft.is_loading = false;
      }),
    [GET_MORE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list.c0 = action.payload.list.c0;
        draft.search_list.c1 = action.payload.list.c1;
        draft.search_list.c2 = action.payload.list.c2;
        draft.search_list.c3 = action.payload.list.c3;
        draft.search_list.c4 = action.payload.list.c4;
        draft.search_list.c5 = action.payload.list.c5;
        draft.search_list.c6 = action.payload.list.c6;
        draft.search_list.count = action.payload.list.count;
        // draft.is_loading = false;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.list_detail = action.payload.contents.post;
        draft.review_link = action.payload.contents.review;
        draft.is_loading = false;
      }),
    [GET_CURATION]: (state, action) =>
      produce(state, (draft) => {
        draft.folder_list = action.payload.list;
        draft.is_loading = false;
      }),
    [GET_FOLDER]: (state, action) =>
      produce(state, (draft) => {
        draft.my_folder_list = action.payload.list;
        draft.is_loading = false;
      }),
    [GET_FOLDER_CONT]: (state, action) =>
      produce(state, (draft) => {
        draft.folder_contents = action.payload.contents;
        draft.is_loading = false;
      }),
    [SET_OPTIONS]: (state, action) =>
      produce(state, (draft) => {
        draft.options = {...action.payload.options};
      }),
    [SET_CATE]: (state, action) =>
      produce(state, (draft) => {
        draft.cate = [action.payload.cate]
        // if(draft.cate.includes(action.payload.cate) & draft.cate.length > 1){
        //   let arr = draft.cate.filter(cur => {
        //     return cur !== action.payload.cate
        //   })
        //   draft.cate = arr;
        // }else if(!draft.cate.includes(action.payload.cate)){
        //   if(action.payload.cate === 'all'){
        //     draft.cate = ["all"];
        //   }else if(draft.cate.length === 5){
        //     draft.cate = ["all"];
        //   }else if(action.payload.reset){
        //     draft.cate = [action.payload.cate]
        //   }else {
        //     draft.cate.push(action.payload.cate);
        //     let arr = draft.cate.filter(cur => {
        //       return cur !== "all"
        //     })
        //     draft.cate = arr;
        //   }
        // }
      }),
    [SET_STANDARD]: (state, action) =>
      produce(state, (draft) => {
        draft.order = action.payload.order;
      }),
    [SET_FILTER_STATE]: (state, action) =>
      produce(state, (draft) => {
        draft.filter_state = action.payload.state;
      }),
    [SET_DETAIL_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list_detail["Zzims.zzim_status"] = action.payload.status;
      }),
    [SET_LINK]: (state, action) =>
      produce(state, (draft) => {
        draft.review_link = [...state.review_link, action.payload.list]
      }),
    [DELETE_LINK]: (state, action) =>
      produce(state, (draft) => {
        draft.review_link = action.payload.list
      }),
    [SET_FOLDER]: (state, action) =>
      produce(state, (draft) => {
        draft.my_folder_list = action.payload.list
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
  getOnePostFB,
  getCurationFB,
  getFolderFB,
  getFolderContFB,
  getMoreListFB,
  setOptions,
  setStandard,
  setCate,
  setDetailLike,
  setLinkFB,
  deleteLinkFB,
  setFolderFB,
  setUpdateFolderFB,
  setDeleteFolderFB,
  setFilterState,
  loading,
};

export { actionCreators };