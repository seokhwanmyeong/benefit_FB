import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as likeActions } from '../redux/modules/like';
import { actionCreators as postActions } from '../redux/modules/post';
import { Input, Btn, BtnText } from "../elements/index"
import { SvgLockOn, SvgLockOff } from '../icons/ico_components'

const ModalPop = (props, ref) => {
    const { modalId, postId, folderId, folder_name, folder_content, lockstatus } = props;
    const dispatch = useDispatch();
    const params = useParams();
    const paramsId = params.id;
    const testref = useRef();
    const test2ref = useRef();
    const test3ref = useRef();
    const selectRef = useRef();

    const user_folder = useSelector(state => state.user.user_folder);
    let containList = user_folder.filter(cur => {
        return cur.postId_list?.includes(String(postId));
    })
    let existList = user_folder.filter(cur => {
        return !cur.postId_list?.includes(String(postId));
    })

    /* 모달 handler 관련*/
    const [depthState, setdepth] = useState({
        modal: true,
        modal_depth: false,
    });

    const depthHandler = (e) => {
        const newTabState = { ...depthState };
        const activeTab = e.currentTarget.classList.contains('modal')
        ? 'modal' : e.currentTarget.classList.contains('modal_depth')
        ? 'modal_depth' : '';

        for (let key in newTabState) {
            key === activeTab
            ? (newTabState[key] = true)
            : (newTabState[key] = false);
        }

        setdepth(newTabState);
    };
    const ModalHandler = (e) => {
        if(ref.current.classList.contains("active")){
            ref.current.classList.remove("active")
            depthHandler(e);
        }else{
            ref.current.classList.add("active")
        }
        setValue("");
        setHref("");
        setOption("");
        if(testref.current !== undefined) testref.current.value = "";
        if(test2ref.current !== undefined) test2ref.current.value = folder_name;
        if(test3ref.current !== undefined) test3ref.current.value = folder_content;
        if(selectRef.current !== undefined) selectRef.current.value = 'default';
    }

    /* 링크복사관련 */
    const [hrefState, setHref] = useState("");
    const hrefHandler = (e) => {
        setHref(e.currentTarget.value);
    }
    const reviewLinkHandler = (e) => {
        ref.current.classList.remove("active");
        depthHandler(e);
        setHref("");
        dispatch(postActions.setLinkFB(hrefState, paramsId))
    }

    /* Input value handler 관련 */
    const [valueState, setValue] = useState("");
    const inputHandler = (e) => {
        setValue(e.currentTarget.value);
    }
    const [contState, setCont] = useState("");
    const inputContHandler = (e) => {
        setCont(e.currentTarget.value);
    }

    /* 폴더이벤트 관련 */
    const [option, setOption] = useState("");
    const [lock, setLock] = useState(false);
    const makeFolderHandler = (e) => {
        if(valueState === ""){
            alert('폴더명을 입력해주세요');
            return;
        }
        ref.current.classList.remove("active");
        depthHandler(e);
        dispatch(postActions.setFolderFB(valueState))
        testref.current.value = '';
        setValue("");
    }

    const updateFolderHandler = (e) => {
        // console.log(option, valueState, lock)
        ref.current.classList.remove("active");
        depthHandler(e);
        dispatch(postActions.setUpdateFolderFB(option, valueState, contState, lock))
    }

    const deleteFolderHandler = (e) => {
        ref.current.classList.remove("active");
        depthHandler(e);
        dispatch(postActions.setDeleteFolderFB(option))
    }

    const lockFolderHandler = (e) => {
        if(e.currentTarget.classList.contains('on')){
            e.currentTarget.classList.remove('on')
            setLock(false)
        }else{
            e.currentTarget.classList.add('on')
            setLock(true)
        }
    }

    const likeListHandler = (e) => {
        if(selectRef.current.value === ''){
            alert('폴더를 선택해주세요');
            return;
        }
        dispatch(likeActions.setLikeFB(option, postId, true))
        ModalHandler(e);
        selectRef.current.value = 'default';
    }
    
    const unlikeListHandler = (e) => {
        if(selectRef.current.value === ''){
            alert('폴더를 선택해주세요');
            return;
        }
        dispatch(likeActions.setLikeFB(option, postId, false))
        ModalHandler(e);
        selectRef.current.value = 'default';
    }

    const selectHandler = (e) => {
        // console.log(e.currentTarget.value);
        setOption(e.currentTarget.value);
    }

    const fixSelectHandler = (e) => {
        // console.log(e.currentTarget.value)
        let folder = user_folder.filter(cur => {
            return cur.folderId == e.currentTarget.value
        })

        selectHandler(e);
        test2ref.current.value = folder[0].folder_name;
        test3ref.current.value = folder[0].folder_content;
        setValue(folder[0].folder_name);
        setCont(folder[0].folder_content)
    }

    React.useEffect(() => {
        // console.log(folderId, folder_name)
        setOption(folderId)
        setValue(folder_name)
        setCont(folder_content)
        setLock(lockstatus)
        
        if(test2ref.current?.value !== undefined){
            test2ref.current.value = folder_name !== undefined ? folder_name : ""
        }
        if(test3ref.current?.value !== undefined){
            test3ref.current.value = folder_content !== undefined ? folder_content : ""
        }
    },[folderId, folder_name, lockstatus])

    if(modalId === 2){
        return (
            <ModalWrap ref={ref}>
                <Modal>
                    <ModalTop>
                        <p>폴더만들기</p>
                    </ModalTop>
                    <ModalCont>
                        <p>
                            폴더명을 입력해주세요
                        </p>
                        <Input _ref={testref} _onChange={inputHandler} _type='text' intId='common' _placeholder='폴더명을 입력해주세요'/>
                    </ModalCont>
                    <ModalBot>
                        <Btn _className="modal"_onClick={ModalHandler} _type='small_off' _text='취소'/>
                        <Btn _className="modal_depth" _onClick={makeFolderHandler} _type='small' _text='확인'/>
                    </ModalBot>
                </Modal>
            </ModalWrap>
        );
    }else if(modalId === 3){
        return (
            <ModalWrap ref={ref}>
                <Modal>
                    <ModalTop>
                        <p>내 큐레이션을 수정합니다</p>
                    </ModalTop>
                    <ModalCont>
                        <p>
                            큐레이션을 공개하시면 다른 분들과 공유 할 수 있어요.
                            <br/>
                            소중한 정책리스트를 나눠주세요!
                        </p>
                        <Select defaultValue={folderId} key={folderId} onChange={fixSelectHandler} margin='0 auto 1.7rem'>
                            {/* <option value='' disabled="disabled">폴더를 선택해주세요</option> */}
                            {user_folder.map(cur => {
                                return(
                                    <option key={cur.folderId} value={cur.folderId}>{cur.folder_name}</option>
                                )
                            })}
                        </Select>
                        <CurationEdit>
                            <h5>폴더 제목</h5>
                            <Input defaultValue={valueState} _key={folder_name} _ref={test2ref} _onChange={inputHandler} intId='common' _type='text' _placeholder='폴더명을 입력해주세요'/>
                            <h5>폴더 설명</h5>
                            <Input defaultValue={contState} _key={folder_content} _ref={test3ref} _onChange={inputContHandler} intId='common' _type='text' _placeholder='설명을 입력해주세요'/>
                            <BtnText color='red' onClick={deleteFolderHandler} text='삭제하기'/>
                            {/* <BtnText onClick={lockFolderHandler} text='잠금'/> */}
                            <LockBtn className={lockstatus ? 'on' : ''}onClick={lockFolderHandler}>
                                <div className='cont-lock-on'>
                                    <SvgLockOn/>
                                    <span>공개중</span>
                                </div>
                                <div className='cont-lock-off'>
                                    <SvgLockOff/>
                                    <span>비공개</span>
                                </div>
                            </LockBtn>
                        </CurationEdit>
                    </ModalCont>
                    <ModalBot>
                        <Btn _className="modal"_onClick={ModalHandler} _type='small_off' _text='취소'/>
                        <Btn _className="modal_depth" _onClick={updateFolderHandler} _type='small' _text='확인'/>
                    </ModalBot>
                </Modal>
            </ModalWrap>
        );
    }else if(modalId === 4){
        return (
            <ModalWrap ref={ref}>
                <Modal>
                    <ModalTop>
                        <p>정책을 큐레이션에 추가할게요</p>
                    </ModalTop>
                    <ModalCont>
                        <p>
                            담은 정책은 마이페이지 &gt; 큐레이션 에서 보실 수 있어요.
                            <br/>
                            공개를 선택하셔서 친구들과 정보를 나눠보세요.
                        </p>
                        <Select ref={selectRef} onChange={selectHandler}>
                            <option value='default'>폴더를 선택해주세요.</option>
                            {existList.map(cur => {
                                // console.log(typeof(cur.folderId))
                                return(
                                    <option key={cur.folderId} value={cur.folderId}>{cur.folder_name}</option>
                                )
                            })}
                            {/* {user_folder.map(cur => {
                                // console.log(typeof(cur.folderId))
                                return(
                                    <option key={cur.folderId} value={cur.folderId}>{cur.folder_name}</option>
                                )
                            })} */}
                        </Select>
                    </ModalCont>
                    <ModalBot>
                        <Btn _className="modal"_onClick={ModalHandler} _type='small_off' _text='취소'/>
                        <Btn _className="modal_depth" _onClick={likeListHandler} _type='small' _text='확인'/>
                    </ModalBot>
                </Modal>
            </ModalWrap>
        );
    }else if(modalId === 5){
        return (
            <ModalWrap ref={ref}>
                <Modal>
                    <ModalTop>
                        <p>정책을 큐레이션폴더에서 삭제할게요</p>
                    </ModalTop>
                    <ModalCont>
                        <p>
                            폴더를 선택하시고 확인을 눌러주세요.
                        </p>
                        <Select ref={selectRef} onChange={selectHandler}>
                            <option value='default'>폴더를 선택해주세요</option>
                            {containList.map(cur => {
                                return(
                                    <option key={cur.folderId} value={cur.folderId}>{cur.folder_name}</option>
                                )
                            })}
                        </Select>
                    </ModalCont>
                    <ModalBot>
                        <Btn _className="modal"_onClick={ModalHandler} _type='small_off' _text='취소'/>
                        <Btn _className="modal_depth" _onClick={unlikeListHandler} _type='small' _text='확인'/>
                    </ModalBot>
                </Modal>
            </ModalWrap>
        );
    }else{
        return (
            <ModalWrap ref={ref}>
                {depthState.modal 
                ? <Modal>
                    <ModalTop>
                        <p>정책에 대한 내 블로그 후기 글을<br/>등록할 수 있어요</p>
                    </ModalTop>
                    <ModalCont>
                        <p>
                            홍보 또는 비방 목적의 게시글인 경우, 별도 고지없이 삭제될 수 있습니다.
                            네이버, 티스토리 등의 블로그 주소를 가져올 수 있습니다.
                        </p>
                        <Input _ref={testref} _onChange={hrefHandler} intId='common' _type='text' _placeholder='블로그 글 주소를 적어주세요'/>
                    </ModalCont>
                    <ModalBot>
                        <Btn _className="modal"_onClick={ModalHandler} _type='small_off' _text='취소'/>
                        <Btn _className="modal_depth" _onClick={depthHandler} _type='small' _text='확인'/>
                    </ModalBot>
                </Modal>
                :
                <ModalDepth>
                    <ModalCont>
                        <Preview 
                        url={hrefState} 
                        width='100%' 
                        imageHeight='100px'
                        borderRadius= '0'
                        borderColor= 'transparent'
                        />
                    </ModalCont>
                    <ModalBot>
                        <Btn _className="modal" _onClick={ModalHandler} _type='small_off' _text='취소'/>
                        <Btn _className="modal" _onClick={reviewLinkHandler} _type='small' _text='확인'/>
                    </ModalBot>
                </ModalDepth>
                }
            </ModalWrap>
        );
    }
};
const modalView = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;
const ModalWrap = styled.div`
    z-index: 9999;  
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    &.active{
        display: flex;
    }
`
const Modal = styled.div`
    padding: 4.6rem 2.1rem 3rem;
    max-width: 37.8rem;
    background-color: ${props => props.theme.color.w};
    animation: 0.5s ${modalView} ease-out;
`
const ModalDepth = styled.div`
    padding: 4.6rem 2.1rem 3rem;
    max-width: 31rem;
    background-color: ${props => props.theme.color.w};
    animation: 0.1s ${modalView} ease-out;
`
const ModalTop = styled.div`
    margin: 0 0 1.7rem;
    p{
        text-align: center;
        font: ${props => props.theme.font.option_title};
        color: ${props => props.theme.color.b0};
    }
`
const ModalCont = styled.div`
    margin: 0 0 1.7rem;
    p{
        margin: 0 0 1rem;
        text-align: center;
        font: ${props => props.theme.font.text_small};
        color: ${props => props.theme.color.g1};
    }
`
const ModalBot = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    button+button{
        margin-left: 1.2rem;
    }
`
const Preview = styled(LinkPreview)`
  .LowerContainer{
    padding: 1rem 0.6rem 2.2rem 0;
    .Title{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      font: ${props => props.theme.font.styleh6}
    }
    .Description{
        display: none;
      }
    .SiteDetails{
        display: flex;
        flex-wrap: wrap;
        span{
          font: ${props => props.theme.font.social_rv_author};
          color: ${props => props.theme.color.p2}; 
        }
      }
  }
`

const CurationEdit = styled.div`
    padding: 1.5rem 3.5rem 2.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: ${props => props.theme.color.g3};
    input{
        margin: 0 0 0.8rem;
    }
`

const Select = styled.select`
    position: relative;
    margin: ${props => props.margin? props.margin : '0 auto'};
    padding: 1.5rem 1.6rem;
    display: flex;
    width: 26rem;
    border: 0;
    // -webkit-appearance:none; /* 크롬 화살표 없애기 */
    // -moz-appearance:none; /* 파이어폭스 화살표 없애기 */
    // appearance:none /* 화살표 없애기 */
    &:before{
        content: "";
        position: absolute;
        right: 5px;
        top: 50%;
        transform: rotate(45deg) translateY(-50%);
        display: inline-block;
        width: 10px;
        height: 1.5px;
        background-color: ${props => props.theme.color.b0};
    }
    &:after{
        content: "";
        position: absolute;
        right: 5px;
        top: 50%;
        transform: rotate(-45deg) translateY(-50%);
        display: inline-block;
        width: 10px;
        height: 1.5px;
        background-color: ${props => props.theme.color.b0};
    }
`
const LockBtn = styled.button`
    display: flex;
    align-items: center;
    svg{
        width: 1.067rem;
        height: 1.067rem;
    }
    font: ${props => props.theme.font.p};
    color ${props => props.color === 'white' ? props.theme.color.w : props.theme.color.p2};
    svg+span{
        margin: 0 0 0 2px;
    }
    .cont-lock-on{
        display: none;
        align-items: center;
    }
    .cont-lock-off{
        display: flex;
        align-items: center;
    }
    &.on{
        .cont-lock-on{
            display: flex;
        }
        .cont-lock-off{
            display: none;
        }
    }
`

export default forwardRef(ModalPop);