import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

/* Module */
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from '../redux/modules/like';

/* Components, elements, etc */
import { CardSearch, Filter, Category, Spinner } from "../components/index";
import { Btn } from '../elements/index';
import { commonAni } from '../styles/Animation'

// import axios from 'axios';
const Search = (props) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.post.search_list);
    const cate_list = useSelector(state => state.post.cate);
    const order = useSelector(state => state.post.order);
    const basic_options = useSelector(state => state.post.options);
    const user_options = JSON.parse(localStorage.getItem('options'));
    const loading = useSelector(state => state.post.is_loading);
    const user_folder = useSelector(state => state.user.user_folder);
    const [data, setData] = useState([]);
    // const options = user_options ? user_options : basic_options 
    const options = basic_options 

    /* 초기 각 폴더의 찜한 리스트들 */
    let like_list = [];
    user_folder?.forEach(cur => {
        if(cur.postId_list){
            return like_list = [...like_list, ...cur.postId_list];
        }
    })

    /* 더보기 관련 */
    const requestMoreList = () => {
        // console.log(JSON.parse(localStorage.getItem('options')))
        // console.log(order)
        // console.log(paging)
        const localOptions = JSON.parse(localStorage.getItem('options'))
        dispatch(postActions.getMoreListFB(localOptions, cate_list))
    }

    useEffect(() => {
        dispatch(postActions.getCateListFB(options, cate_list))
    }, [])

    useEffect(() => {
        let middle = [];
        let _like_list = [];
        
        /* cate선택별 데이터들을 합치는 구간 */
        cate_list.map((cur, idx) => {
            if(cur === 'all') cur = 'c0'
            for(let y = 0; y < list[cur].length; y++){
                middle.push(list[cur][y]);

                /* cate선택별 데이터와 유저의 찜한 리스트들 대조구간 */
                if(list[cur][y]["Zzims.zzim_status"] === "true")
                    _like_list.push({postId: list[cur][y].postId})
            }
            return middle;
        })

        dispatch(likeActions.setMyLikeList(_like_list))
        setData(middle);
    }, [list, cate_list, order])

    if(loading){
        return <Spinner type='page'/>;
    }return (
        <React.Fragment>
            <Category/>
            <ResponseFilter>
                <Filter/>
                <CardSearch data={data} user_like_list={like_list}/>
            </ResponseFilter>
            {data.length > 0
            ?<SearchMoreList>
                <Btn _onClick={requestMoreList} _type='large' _text='더 보기'/>
            </SearchMoreList>
            : null
            }
        </React.Fragment>
    );
};
const ResponseFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
    animation: 0.3s ${commonAni} ease-out;
    @media screen and (max-width: 808px){
        padding: 0 1.6rem;
    }
`
const SearchMoreList = styled.div`
    padding: 2rem 28rem 4.8rem 0;
    width: 100%;
    animation: 0.3s ${commonAni} ease-out;
    @media screen and (max-width: 808px){
        padding: 2rem 1.6rem 8rem;
    }
`
export default Search;