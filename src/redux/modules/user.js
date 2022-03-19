import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configureStore";
import instance from "../../shared/api";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
    user : {
        nickname: "",
        userId: "",
    },
    is_login: false,
};

const loginFB = (user_code) => {
    return function (dispatch, getState) {
        instance.get(`/auth/kakao/callback?code=${user_code}`)
        .then((res) => {
            // console.log("성공이다", res)
            // console.log(res.data)
            let token = res.data.user.token;
            let user_info = {
                nickname : res.data.user.nickname,
                userId : res.data.user.userId,
            };
            localStorage.setItem("ybrn", token);
            localStorage.setItem("user", JSON.stringify(user_info));
            localStorage.setItem("is_login", true)

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
        let user_info = localStorage.getItem("ybrn");
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
    [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            draft.user = {
                nickname: "",
                userId: "",
            };
            draft.is_login = false;
        }),
  },
  initialState
);

const actionCreators = {
  setUser,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };