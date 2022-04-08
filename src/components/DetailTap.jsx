import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { CardReview, BoxComment, ModalPop } from '../components/index';
import { BtnTap, BtnText } from '../elements';
import { commonAni } from '../styles/Animation'

const DetailTap = (props) => {
    const { review_link, comment } = props;
    const modalRef = useRef();
    const token = localStorage.getItem("ybrn");

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

    const ModalHandler = () => {
        if(!token){
            alert("로그인해주세요");
            return;
        }

        modalRef.current.classList.contains("active")
        ? modalRef.current.classList.remove("active")
        : modalRef.current.classList.add("active")
    }

    return (
        <Wrap>
            <DetailTapHead>
                <BtnTap
                    _id="tapReview"
                    _className={tabState.tapReview ? "active" : ""}
                    _onClick={tabHandler}
                    text="블로그 후기"
                    count={2}
                />
                <BtnTap
                    _id="tapComment"
                    _className={tabState.tapComment ? "active" : ""}
                    _onClick={tabHandler}
                    text="간단 후기"
                    count={2}
                />
            </DetailTapHead>
            <DetailTapContents>
                {tabState.tapReview 
                ? <React.Fragment>
                    <BtnText onClick={ModalHandler} text='SNS 후기 등록하기'/>
                    <CardReview _type='grid' _auto={true} _line={2} _view={3} data={review_link}/> 
                </React.Fragment>
                : <BoxComment data={comment}/>}
            </DetailTapContents>
            <ModalPop ref={modalRef}/>
        </Wrap>
    );
};
const Wrap = styled.div`
    @media screen and (max-width: 808px) {
        padding: 0 1.6rem 3.2rem
    } 
`
const DetailTapHead = styled.div`
    margin-bottom: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const DetailTapContents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    animation: 0.3s ${commonAni} ease-out;
`

export default DetailTap;