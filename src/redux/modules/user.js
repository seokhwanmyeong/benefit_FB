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
    return function (dispatch) {
        /* 카카오 인가코드 전달 */
        instance.get(`/auth/kakao/callback?code=${user_code}`)
        .then((res) => {
            const token = res.data.user.token;
            const _user_folder = res.data.result2.map(cur => {
                cur.postId_list = cur.postId_list?.split(',')
                return cur;
            })
            const user_info = {
                nickname : res.data.user.nickname,
                userId : res.data.user.userId,
            };

            /* 토큰과 각정보들을 localstorage에 저장 */
            localStorage.setItem("ybrn", token);
            localStorage.setItem("user", JSON.stringify(user_info));
            localStorage.setItem("user_folder", JSON.stringify(_user_folder));

            /* 해당정보들 store 저장을 위한 dispatch */
            dispatch(setUserFolder(_user_folder))
            dispatch(setUser(user_info));
            history.push("/");
        }).catch((error) => {
            console.log("실패", error);
            history.replace("/login");
        })
    };
};

const loginCheckFB = () => {
    return function (dispatch) {
        /* local 저장정보 user info dispatch구간 */
        let user_info = JSON.parse(localStorage.getItem("user"));
        let _user_folder = JSON.parse(localStorage.getItem("user_folder"));
        dispatch(setUserFolder(_user_folder))
        dispatch(setUser(user_info));
    };
};

const logoutFB = () => {
    return function (dispatch) {
        /* localstorage data reset */
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
            draft.user_folder = [...action.payload.user_folder];
        }),
    [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            /* user info reset */
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