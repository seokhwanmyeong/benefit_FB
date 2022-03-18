import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from "../shared/api"
import { actionCreators as userActions } from "../redux/modules/user"

import axios from 'axios';
const Auth = () => {
    const dispatch = useDispatch();
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(()=> {
        dispatch(userActions.loginFB(code));
    }, [])

    return (
        <div>로그인 중입니다  spiiner로 대체할 예정</div>
    )
};

export default Auth;


// 인가코드 => 백쪽에서 이걸로 카카오에 송신해서 access토큰 유저정보 => 백쪽 유저정보로 우리서버 jwt => 프론트에 전달 => 프론트는 local 및 state에 저장 => jwt로 로그인 유지