import React from 'react';
import { SvgSaving, SvgCounsel } from '../icons/ico_components'

const ImgBenefit = (props) => {
    const { benefit } = props;
    
    return (
        <React.Fragment>
            {{
                "돈" : <SvgSaving/>,
                "상담" : <SvgCounsel/>,
                "대여" : <SvgSaving/>,
                "기타" : <SvgSaving/>
            }[benefit]}
        </React.Fragment>
    );
};

export default ImgBenefit;