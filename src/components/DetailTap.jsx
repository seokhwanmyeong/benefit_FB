import React, { useState } from 'react';
import styled from 'styled-components';

import { CardReview, CardComment } from '../components/index';
import { Btn } from '../elements';

const DetailTap = (props) => {
    const { data } = props;
    console.log(data)

    const [tabState, setTabState] = useState({
        tapReview: true,
        tapComment: false,
    });
    const tabHandler = (event) => {
        const newTabState = { ...tabState };
        const activeTab = event.currentTarget.id;
        for (let key in newTabState) {
            key === activeTab
            ? (newTabState[key] = true)
            : (newTabState[key] = false);
        }
        setTabState(newTabState);
    };

    return (
        <div>
            <DetailTapHead>
                <Btn
                    _id="tapReview"
                    _onClick={tabHandler}
                    _text="블로그 후기"
                    _className={tabState.tapReview ? "active" : ""}
                />
                <Btn
                    _id="tapComment"
                    _onClick={tabHandler}
                    _text="간단 후기"
                    _className={tabState.tapComment ? "active" : ""}
                />
            </DetailTapHead>
            <div>
                {
                    tabState.tapReview ? <CardReview _type='grid' _line={2} _view={3} data={data}/> : <CardComment/>
                }
            </div>
        </div>
    );
};
const DetailTapHead = styled.div`
    margin-bottom: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
        width: 50%;
        height: 6.7rem;
        font: normal 500 1.6rem/1.3 Noto sans, sans-serif;
        color: ${props => props.theme.color.b0};
        box-shadow: inset 0 -1px 0 ${props => props.theme.color.p1};
        &.active{
            font-weight: 600;
            box-shadow: inset 0 -5px 0 ${props => props.theme.color.p1};
        }
    }
`

export default DetailTap;