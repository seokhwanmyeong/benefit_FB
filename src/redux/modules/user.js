import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import axios from "axios";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  is_login: false,
  list: [],
};
// const logInDB = (userEmail, password) => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .login(userEmail, password)
//       .then((res) => {
//         console.log(res);
//         if (!res.data.ok) {
//           window.alert(res.data.errorMessage);

//           return;
//         }

//         dispatch(setUser(res.data));
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("userNickname", res.data.userNickname);
//         history.replace("/");
//       })
//       .catch((err) => {
//         alert(err.response);
//         console.log(err.response);
//       });
//   };
// };

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  logOut,
  setUser,
  logInDB,
};

export { actionCreators };
