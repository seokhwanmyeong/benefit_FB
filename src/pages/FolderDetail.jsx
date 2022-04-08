import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { actionCreators as postActions } from "../redux/modules/post";
import { ImgBenefit, CateBox, AnimateShare, DecoNew, ModalPop, FolderBg, Nonlayer } from '../components/index';
import { BtnCircle } from "../elements/index";
import { SvgLikeOn, SvgLikeOff, SvgShare, SvgEdit, SvgBack, SvgView } from '../icons/ico_components';
import { commonAni } from '../styles/Animation'

const FolderDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef();
    const editRef = useRef();
    const addRef = useRef();
    const deleteRef = useRef();
    const folder_contents = useSelector(state => state.post.folder_contents);
    const user_folder = useSelector(state => state.user.user_folder);
    const userId = useSelector(state => state.user.user.userId);
    const [postId, setPostId] = useState();
    const [folderId, setId] = useState();
    const [folderName, setName] = useState();
    const [folderCont, setContent] = useState();
    const [lockstatus, setLock] = useState();
    const token = localStorage.getItem("ybrn");
    const folder_main = folder_contents.maincuration?.[0];
    const post_list = folder_contents.postlist;

    let like_list = [];
    user_folder?.forEach(cur => {
        if(cur.postId_list){
            return like_list = [...like_list, ...cur.postId_list];
        }
    })

    const linkToDetail = (postId, cate) => {
        navigate(`/detail/${postId}`, {state: {cate: cate}})
    }

    const onShareEvent = () => {
        let text = window.location.href;
        ref.current.classList.add('active');
        // 흐름 1.
        if (navigator.clipboard) {
            // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
            navigator.clipboard
            .writeText(text)
            // .then(() => {
            //     alert("복사되었습니다.");
            // })
            // .catch(() => {
            //     alert("다시 시도해주세요.");
            // });
        } else {
            // 흐름 2.
            if (!document.queryCommandSupported("copy")) {
                return alert("복사하기가 지원되지 않는 브라우저입니다.");
            }
    
            // 흐름 3.
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.top = 0;
            textarea.style.left = 0;
            textarea.style.position = "fixed";
    
            // 흐름 4.
            document.body.appendChild(textarea);
            // focus() -> 사파리 브라우저 서포팅
            textarea.focus();
            // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
            textarea.select();
            // 흐름 5.
            document.execCommand("copy");
            // 흐름 6.
            document.body.removeChild(textarea);
            // alert("복사되었습니다.");
        }
        setTimeout(() => {
            ref.current.classList.remove('active');
        }, 700)

    };

    const simpleModalHandler = (e) => {
        e.stopPropagation();
        if(!token){
            alert("로그인해주세요");
            return;
        }

        if(e.currentTarget.nextSibling.classList.contains('active')){
            e.currentTarget.nextSibling.classList.remove('active');
        }else{
            e.currentTarget.nextSibling.classList.add('active');
        }
    }

    const addModalHandler = (e, postId) => {
        e.stopPropagation();
        console.log('1')
        let arr_class = document.getElementsByClassName('modal_simple');
        setPostId(postId)
        addRef.current.classList.contains("active")
        ? addRef.current.classList.remove("active")
        : addRef.current.classList.add("active")
        
        for(let x = 0; 0 < arr_class.length; x++){
            arr_class[x].classList.remove('active')
        }
    }

    const deleteModalHandler = (e, postId) => {
        e.stopPropagation();
        console.log('1')
        let arr_class = document.getElementsByClassName('modal_simple');
        setPostId(postId)
        deleteRef.current.classList.contains("active")
        ? deleteRef.current.classList.remove("active")
        : deleteRef.current.classList.add("active")

        for(let x = 0; 0 < arr_class.length; x++){
            arr_class[x].classList.remove('active')
        }
    }

    const editModalHandler = (e, id, name, content, status) => {
        e.stopPropagation();
        editRef.current.classList.contains("active")
        ? editRef.current.classList.remove("active")
        : editRef.current.classList.add("active")
        console.log(id, name)
        
        setId(id);
        setName(name);
        setContent(content);
        setLock(status);
    }
    
    useEffect(() => {
        dispatch(postActions.getFolderContFB(params?.id));
    }, [])
    
    return (
        <FolderWrap>
            <BtnBack onClick={() => navigate(-1)}>
                <SvgBack/>
                <span>Back</span>
            </BtnBack>
            <Nav>
                <Link to={'/curation'}>Curation</Link>
                <span>{folder_main?.folder_name}</span>
            </Nav>
            <FolderInfo>
                <FolderBg radius='17.0936px' cate={{c1: folder_main?.c1, c2: folder_main?.c2, c3: folder_main?.c3, c4: folder_main?.c4}}/>
                <InfoLeft>
                    {/* {userId === folder_main?.userId 
                    ? <span>{folder_main.nickname} 님의</span>
                    : null
                    } */}
                    <h4>{folder_main?.folder_name}</h4>
                    <p>{folder_main?.folder_content}</p>
                    <InfoView>
                        <SvgView/>
                        <span>{folder_main?.folder_view}</span>
                    </InfoView>
                    <InfoBtnGroup>
                        {userId === folder_main?.userId
                        ? <React.Fragment>
                            <BtnCircle _onClick={(e) => editModalHandler(e, params.id, folder_main.folder_name, folder_main.folder_content, folder_main.folder_status)}>
                                <SvgEdit/>
                            </BtnCircle>
                            <BtnCircle _onClick={onShareEvent}>
                                <SvgShare/>
                            </BtnCircle>
                        </React.Fragment>
                        : <React.Fragment>
                            <BtnCircle _onClick={onShareEvent}>
                                <SvgShare/>
                            </BtnCircle>
                        </React.Fragment>
                        }
                    </InfoBtnGroup>
                </InfoLeft>
                <InfoRight>
                    <ImgBenefit benefit={folder_main?.benefit}/>
                </InfoRight>
            </FolderInfo>
            <ListGroup>
                {post_list?.map(cur => {
                    if(!cur.category){
                        return null
                    }
                    return(
                        <List onClick={() => linkToDetail(cur.postId, cur.category)} key={cur.postId}>
                            <ListImg>
                                <DecoNew/>
                                <ImgBenefit benefit={cur.benefit}/>
                            </ListImg>
                            <ListCont>
                                <ListInfo>
                                    <div className="card-head">
                                        <CateBox category={cur.category}/>
                                        <h4 className="card-title">{cur.title}</h4>
                                    </div>
                                    <div className="card-foot">
                                        <p className="card-agency">{cur.location}</p>
                                        <p className="card-period">
                                            ~ {cur.apply_end?.replace(/(\\r\\n|\\n|\\r)/g, '\n')}
                                        </p>
                                    </div>
                                </ListInfo>
                                <ListLike>
                                    <BtnCircle _className={like_list.includes(String(cur.postId)) ? 'on' : ''} _onClick={(e) => simpleModalHandler(e, cur.postId)}>
                                        {like_list.includes(String(cur.postId)) ? <SvgLikeOn/> : <SvgLikeOff/>}
                                    </BtnCircle>
                                    <SimpleModal className='modal_simple'>
                                        {like_list.includes(String(cur.postId)) 
                                        ? <React.Fragment>
                                            <BtnSimpleModal onClick={(e) => addModalHandler(e, cur.postId)}>찜 추가</BtnSimpleModal>
                                            <BtnSimpleModal type="delete" onClick={(e) => deleteModalHandler(e, cur.postId)}>찜 삭제</BtnSimpleModal>
                                        </React.Fragment>
                                        : <BtnSimpleModal onClick={(e) => addModalHandler(e, cur.postId)}>찜 추가</BtnSimpleModal>
                                        }
                                    </SimpleModal>
                                </ListLike>
                            </ListCont>
                        </List>
                    )
                })}
                {(post_list?.length === 1 && post_list[0].postId === null) 
                ? <Nonlayer path='/folder'/>
                : null
                }
            </ListGroup>
            <AnimateShare ref={ref}/>
            <ModalPop ref={addRef} modalId={4} postId={postId}/>
            <ModalPop ref={deleteRef} modalId={5} postId={postId}/>
            <ModalPop ref={editRef} modalId={3} folderId={folderId} folder_name={folderName} folder_content={folderCont} lockstatus={lockstatus}/>
        </FolderWrap>
    );
};
const SimpleModal = styled.div`
    position: absolute;
    max-width: 37.8rem;
    top: 0;
    right: 6rem;
    height: auto;
    width: auto;
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.theme.color.w};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    &.active{
        display: flex;
    }
`
const BtnSimpleModal = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7.2rem;
    height: 3.5rem;
    background-color: ${props => props.theme.color.w};
    font: ${props => props.theme.font.text_small};
    color: ${props => props.type === 'delete' ? props.theme.color.w1 : props.theme.color.b1};
    &:hover{
        background-color: ${props => props.theme.color.p32};
    }
`
const FolderWrap = styled.div`
    padding: 2.4rem 16.8rem;
    animation: 0.3s ${commonAni} ease-out;
    @media screen and (max-width: 808px) {
        padding: 1.6rem 1.6rem;
    }
`
const ListGroup = styled.ul`
    flex-grow: 1;
    width: 100%;
    cursor: pointer;
    li+li{
        margin: 8px 0 0;
    }
    @media screen and (max-width: 808px) {
        li+li{
            margin: 12px 0 0;
        }
    }
`
const List = styled.li`
    z-index: 2;
    position: relative;
    padding: 2.8rem 1.6rem 2rem; 
    display: flex;
    width: 100%;
    border: 1px solid ${props => props.theme.color.p5};
    border-radius: 8px;
    &:hover{
        background-color: ${props => props.theme.color.p5};
        transition: 0.3s;
    }
    @media screen and (max-width: 808px) {
        padding: 1.6rem; 
        border: 0;
        background-color: ${props => props.theme.color.g3};
    }
`
const ListImg = styled.div`
    position: relative;
    margin: 0 1.8rem 0 0;
    svg{
        width: 7.2rem;
        height: 7.2rem;
        background-color: ${props => props.theme.color.p5};
        border-radius: 50%;
    }
    @media screen and (max-width: 808px) {
        margin: 0 1rem 0 0;
        display: flex;
        align-items: center;
        svg{
            width: 6.4rem;
            height: 6.4rem;
        }
    }
`
const ListCont = styled.div`
    display: flex;
    width: 100%;
`
const ListInfo = styled.div`
    width: 100%;
    .card-head {
        margin: 0 0 4px;
        display: flex;
        flex-wrap: wrap;
    }
    .card-title {
        margin: 4px 0 0;
        flex-grow: 1;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font: ${props => props.theme.font.pc_list_title};
        color: ${props => props.theme.color.b1};
    }
    .card-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font: ${props => props.theme.font.pc_list_info};
        color: ${props => props.theme.color.b1};
    }
    .card-agency {
        margin: 0 1.5rem 0 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        min-width: 5rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .card-period {
        flex-grow: 1;
        min-width: 18rem;
    }
    @media screen and (max-width: 808px) {
        .card-head {
            margin: 0;
        }
        .card-title {
            margin: 1px 0 0;
            font: ${props => props.theme.font.m_list_title};
        }
        .card-foot {
            font: ${props => props.theme.font.m_list_info};
        }
    }
    @media screen and (max-width: 500px) {
        .card-agency {
            display: none;
        }
        .card-period {
            width: 100%;
        }
    }
`
const ListLike = styled.div`
    display: flex;
    align-items: center;
    svg{
        path{
            fill: ${props => props.theme.color.p1};
        }
    }
`
const FolderInfo = styled.div`
    position: relative;
    margin: 0 0 3.6rem;
    padding: 3.5rem 2.5rem;
    display: flex;
    justify-content: space-between;
    border-radius: 17.0936px;
`
const InfoLeft = styled.div`
    z-index: 1;
    color: ${props => props.theme.color.w};
    span{
        margin: 0 0 8px;
        font: ${props => props.theme.font.styleh5};
    }
    h4{
        margin: 0 0 8px;
        font: ${props => props.theme.font.styleh3};
    }
    p{
        margin: 0 0 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        font: ${props => props.theme.font.body};
    }
`
const InfoRight = styled.div`
    z-index: 1;
    display: flex;
    align-items: flex-start;
    svg{
        width: 14rem;
        height: 14rem;
        path{
            fill: ${props => props.theme.color.w};
        }
    }
    @media screen and (max-width: 500px) {
        width: 10rem;
        height: 10rem;
    }
`
const InfoView = styled.div`
    display: flex;
    align-items: center;
    svg{
        path{
            fill: ${props => props.theme.color.w};
        }
    }
    span{
        margin: 0 0 0 0.4rem;
        transform: translateY(1px);
    }
`
const InfoBtnGroup = styled.div`
    position: absolute;
    bottom: -24px;
    margin: 13px 0 0;
    display: flex;
    button+button{
        margin: 0 0 0 8px;
    }
    svg{
        width: 2.4rem;
        height: 2.4rem;
        path{
            fill: ${props => props.theme.color.p1};
        }
    }
`
const BtnBack = styled.button`
    margin: 0 0 0.8rem;
    display: flex;
    align-items: center;
    font: ${props => props.theme.font.styleh6};
    color: ${props => props.theme.color.b0};
    span{
        margin-left: 1.6rem;
    }
    @media screen and (max-width: 808px) {
        display:none;
    }
`
const Nav = styled.nav`
    margin: 0 0 1.2rem;
    display:none;
    align-items: center;
    font: ${props => props.theme.font.styleh5};
    color: ${props => props.theme.color.b0};
    a{
        display: flex;
        font: ${props => props.theme.font.styleh5};
        color: ${props => props.theme.color.b0};
        &:hover{
            text-decoration: underline;
        }
    }
    span{
        display: flex;
    }
    a+span{
        &:before{
            content: ">";
            margin: 0 0.5rem;
            display: flex;
            font: ${props => props.theme.font.styleh5};
            color: ${props => props.theme.color.b0};
        }
    }
    @media screen and (max-width: 808px) {
        display: flex;
    }
`


export default FolderDetail;