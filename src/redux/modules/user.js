import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configureStore";
import instance from "../../shared/api";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (token, user) => ({ token, user }));
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
            console.log("성공이다", res)
            console.log(res.data)
            let token = res.data.user.token;
            let user_info = {
                nickname : res.data.user.nickname,
                userId : res.data.user.userId,
            };

            dispatch(setUser(token, user_info));
            history.push("/");
        }).catch((error) => {
            console.log("실패다!", error);
            history.replace("/login");
        })
    };
};

const loginCheckFB = () => {
    return function (dispatch, getState, { history }) {
        console.log("넘어옴")
        // instance.get("/users/me", {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // })
        instance.get("/users/me")
        .then((res) => {
            console.log("로그인 유지 데이터", res);
            return;
            // if (res.data.ok) {
            //     console.log("로그인 유지중", res.data.message);
            //     dispatch(setUser(id));
            // } else {
            //     dispatch(logoutFB());
            //     console.log("로그아웃 되었어요");
            // }
        })
        .catch((error) => {
            console.log("로그유지 axios통신 과정중 에러발생");
            console.log(error.code, error.message);
        });
    };
};

const logoutFB = () => {
    return function (dispatch) {
        dispatch(logOut());
        history.replace("/");
    };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
        produce(state => {
            localStorage.setItem("ybrn", ...action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payloaduser_info));
            localStorage.setItem("is_login", true)
            // state.user = {...action.payload.user};
            // state.is_login = true;
        }),
        // produce(state, (draft) => {
        //     state.user = {...action.payload.user};
        //     state.is_login = true;
        // }),
    [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            localStorage.removeItem("user");
            localStorage.removeItem("ybrn");
            localStorage.removeItem("is_login");
            // state.user = {
            //     nickname: "",
            //     userId: "",
            // };
            // state.is_login = false;
        }),
  },
  initialState
);

const actionCreators = {
  setUser,
  loginFB,
  loginCheckFB,
  logoutFB,
//   logInDB,
};

export { actionCreators };