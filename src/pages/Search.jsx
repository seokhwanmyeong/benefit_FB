import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from '../redux/modules/like';
import { CardSearch, Filter, Category, Spinner } from "../components/index";
import { Btn } from '../elements/index';

// import axios from 'axios';
const Search = (props) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.post.search_list);
    const cate_list = useSelector(state => state.post.cate);
    const order = useSelector(state => state.post.order);
    const options = useSelector(state => state.post.options);
    const paging = useSelector(state => state.post.paging);
    const loading = useSelector(state => state.post.is_loading);
    const user_folder = useSelector(state => state.user.user_folder);
    const [data, setData] = useState([]);

    let like_list = [];
    user_folder?.forEach(cur => {
        if(cur.postId_list){
            return like_list = [...like_list, ...cur.postId_list];
        }
    })

    const requestMoreList = () => {
        console.log(JSON.parse(localStorage.getItem('options')))
        console.log(order)
        console.log(paging)
        const localOptions = JSON.parse(localStorage.getItem('options'))

        dispatch(postActions.getMoreListFB(localOptions, cate_list))
    }

    useEffect(() => {
        dispatch(postActions.getCateListFB(options, cate_list))
    }, [])

    useEffect(() => {
        let middle = [];
        let _like_list = [];

        cate_list.map((cur, idx) => {
            if(cur === 'all') cur = 'c0'
            for(let y = 0; y < list[cur].length; y++){
                middle.push(list[cur][y]);
                if(list[cur][y]["Zzims.zzim_status"] === "true")
                    _like_list.push({postId: list[cur][y].postId})
            }
            return middle;
        })

        dispatch(likeActions.setMyLikeList(_like_list))
        setData(middle);
    }, [list,cate_list, order])

    if(loading){
        return <Spinner type='page'/>;
    }return (
        <React.Fragment>
            <Category/>
            <ResponseFilter>
                <Filter/>
                <CardSearch data={data} user_like_list={like_list}/>
            </ResponseFilter>
            <SearchMoreList>
                <Btn _onClick={requestMoreList} _type='large' _text='더 보기'/>
            </SearchMoreList>
        </React.Fragment>
    );
};
const ResponseFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 808px){
        padding: 0 1.6rem;
    }
`
const SearchMoreList = styled.div`
    padding: 2rem 28rem 4.8rem 0;
    width: 100%;
    @media screen and (max-width: 808px){
        padding: 2rem 1.6rem 8rem;
    }
`
export default Search;