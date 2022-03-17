import React from 'react';
import { SvgSaving, SvgCounsel } from '../icons/ico_components'

const ImgLocation = (props) => {
    const { location } = props
    return (
        <React.Fragment>
            {{
                "돈" : <SvgSaving/>,
                "상담" : <SvgCounsel/>,
                "대여" : <SvgSaving/>,
                "기타" : <SvgSaving/>
            }[location]}
        </React.Fragment>
    );
};

export default ImgLocation;