import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user"

import { Spinner } from '../components/index';

/* 
인가코드 => 백쪽에서 이걸로 카카오에 송신해서 access토큰 유저정보 
=> 백쪽 유저정보로 우리서버 jwt => 프론트에 전달
=> 프론트는 local 및 state에 저장 => jwt로 로그인 유지 
*/
const Auth = () => {
    const dispatch = useDispatch();
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(()=> {
        dispatch(userActions.loginFB(code));
    }, [])

    return (
        <Spinner type='page'/>
    )
};

export default Auth;
