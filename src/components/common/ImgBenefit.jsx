import React from 'react';
import { 
    SvgSaving,
    SvgClothes,
    SvgConsult,
    SvgCounsel,
    SvgEdu,
    SvgEquipment,
    SvgPlace,
    SvgSupport,
    SvgHealth,
    SvgHouse,
    SvgIntership,
    SvgLife,
    SvgDefalut
} from '../../icons/ico_benefit'

const ImgBenefit = (props) => {
    const { benefit } = props;
    /* Data benefit property 
    "cash" : 돈
    "clothes" : 옷
    "consulting" : 컨설팅
    "counsel" : 상담
    "edu" : 교육
    "equipment" : 장비 
    "place" : 공간
    "support" : 기타
    "health" : 건강
    "life" : 문화생활
    "house" : 주거
    "internship" : 스펙
    */
    return (
        <React.Fragment>
            {{
                "돈" : <SvgSaving/>,
                "옷" : <SvgClothes/>,
                "컨설팅" : <SvgConsult/>,
                "상담" : <SvgCounsel/>,
                "교육" : <SvgEdu/>,
                "장비" : <SvgEquipment/>,
                "공간" : <SvgPlace/>,
                "기타" : <SvgSupport/>,
                "건강" : <SvgHealth/>,
                "주거" : <SvgHouse/>,
                "스펙" : <SvgIntership/>,
                "문화생활" : <SvgLife/>,
                null : <SvgDefalut/>,
            }[benefit]}
        </React.Fragment>
    );
};

export default ImgBenefit;