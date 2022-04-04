import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configureStore";
import instance from "../../shared/api";

const SET_USER = "SET_USER";
const SET_USER_FOLDER = "SET_USER_FOLDER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({ user }));
const setUserFolder = createAction(SET_USER_FOLDER, (user_folder) => ({ user_folder }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
    user : {
        nickname: "",
        userId: "",
    },
    user_folder: [],
    is_login: false,
};

const loginFB = (user_code) => {
    return function (dispatch, getState) {
        instance.get(`/auth/kakao/callback?code=${user_code}`)
        .then((res) => {
            console.log(res.data)
            let token = res.data.user.token;
            let _user_folder = res.data.result2.map(cur => {
                cur.postId_list = cur.postId_list?.split(',')
                return cur;
            })
            let user_info = {
                nickname : res.data.user.nickname,
                userId : res.data.user.userId,
            };

            localStorage.setItem("ybrn", token);
            localStorage.setItem("user", JSON.stringify(user_info));
            localStorage.setItem("user_folder", JSON.stringify(_user_folder));
            dispatch(setUserFolder(_user_folder))
            dispatch(setUser(user_info));
            history.push("/");
        }).catch((error) => {
            console.log("실패다!", error);
            history.replace("/login");
        })
    };
};

const loginCheckFB = () => {
    return function (dispatch, getState, { history }) {
        // console.log("넘어옴")
        let user_info = JSON.parse(localStorage.getItem("user"));
        let _user_folder = JSON.parse(localStorage.getItem("user_folder"));
        dispatch(setUserFolder(_user_folder))
        dispatch(setUser(user_info));
        // instance.get("/users/me")
        // .then((res) => {
        //     console.log("로그인 유지 데이터", res);
        //     return;
        //     if (res.data.ok) {
        //         console.log("로그인 유지중", res.data.message);
        //         dispatch(setUser(id));
        //     } else {
        //         dispatch(logoutFB());
        //         console.log("로그아웃 되었어요");
        //     }
        // })
        // .catch((error) => {
        //     console.log("로그유지 axios통신 과정중 에러발생");
        //     console.log(error.code, error.message);
        // });
    };
};

const logoutFB = () => {
    return function (dispatch) {
        localStorage.removeItem("user");
        localStorage.removeItem("ybrn");
        localStorage.removeItem("user_folder");
        localStorage.removeItem("is_login");
        dispatch(logOut());
        history.replace("/");
    };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
        produce(state, (draft) => {
            draft.user = {...action.payload.user};
            draft.is_login = true;
        }),
    [SET_USER_FOLDER]: (state, action) =>
        produce(state, (draft) => {
            console.log(action.payload.user_folder)
            draft.user_folder = [...action.payload.user_folder];
        }),
    [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            draft.user = {
                nickname: "",
                userId: "",
            };
            draft.user_folder = [];
            draft.is_login = false;
        }),
  },
  initialState
);

const actionCreators = {
  setUser,
  setUserFolder,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };