import React from 'react';
import styled from 'styled-components';

import Theme from '../styles/Theme';

const CateBox = (props) => {
    const { category } = props;
    const cate = {
        "주거·금융" : {
            color: Theme.cate_color.finance,
            text: "주거·금융"
        },
        "코로나19" : {
            color: Theme.cate_color.covid,
            text: "코로나19"
        },
        "창업지원" : {
            color: Theme.cate_color.startup,
            text: "창업지원"
        },
        "취업지원" : {
            color: Theme.cate_color.recruit,
            text: "취업지원"
        },
        "생활·복지" : {
            color: Theme.cate_color.welfare,
            text: "생활·복지"
        },
        "정책참여" : {
            color: Theme.cate_color.policy,
            text: "정책참여"
        },
    }[category]
    
    return (
        <React.Fragment>
            <Cate color={cate?.color}>
                {cate?.text}
            </Cate>
        </React.Fragment>
    );
};
const Cate = styled.div`
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2.3rem;
    background-color: ${props => props.theme.color.w};
    border-radius: 4px;
    border: 1px solid ${props => props.color};
    font: ${props => props.theme.font.pc_list_cate};
    color: ${props => props.color};
`
export default CateBox;