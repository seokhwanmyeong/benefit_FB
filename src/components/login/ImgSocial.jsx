import React from 'react';

import { SvgKakao, SvgNaver, SvgGoole } from "../../icons/ico_social"

const ImgSocial = (props) => {
    const { social } = props

    return (
        <React.Fragment>
            {{
                "kakao" : <SvgKakao/>,
                "naver" : <SvgNaver/>,
                "google": <SvgGoole/>,
                "": null,
            }[social]}
        </React.Fragment>
    );
};

export default ImgSocial;