import React from 'react';
import { SvgSaving, SvgCounsel } from '../icons/ico_components'

const ImgBenefit = (props) => {
    const { benefit } = props;
    
    return (
        <React.Fragment>
            {{
                "cash" : <SvgSaving/>,
                "clothes" : <SvgSaving/>,
                "consulting" : <SvgSaving/>,
                "counsel" : <SvgSaving/>,
                "edu" : <SvgSaving/>,
                "equipment" : <SvgSaving/>,
                "place" : <SvgSaving/>,
                "support" : <SvgSaving/>,
                "support,consulting" : <SvgSaving/>,
            }[benefit]}
        </React.Fragment>
    );
};

export default ImgBenefit;