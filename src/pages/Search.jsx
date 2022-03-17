import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as postActions } from "../redux/modules/post"
import { Category } from "../components/index";
import { CardSearch, Filter } from '../components/index';
import { Btn } from '../elements';

// import axios from 'axios';
const Search = (props) => {
    const dispatch = useDispatch();
    const path = useLocation();
    const list = useSelector((state) => state.post.search_list);
    const cate_list = useSelector((state) => state.post.search_list.cate_list);
    const filter_list = useSelector((state) => state.post.search_list.filter_list);
    console.log(props)
    console.log(path)
    console.log(list)

    const basic_option = {
        txt: "empty",
        job_status: "empty",
        apply_period: [],
        education: "empty",
        category : [],
        benefit : "empty",
        location : [],
        limit : "empty",
        special_limit : "empty",
    }
        
    const [data, setData] = useState()
    // const path = useLocation()
    // const [data, setData] = useState([])
    // const getSearch = async () => {
    //     const response = await axios.get('http://localhost:4000/search');
    //     setData(response.data);
    //     console.log("통신실행", response.data)
    // };

    useEffect(() => {
        if(path.state.cate){
            dispatch(postActions.getCateListFB(path.state.cate))
        }else if(path.state.value){
            return;
        }else{
            dispatch(postActions.getFilterListFB(basic_option))
        }
    }, [])

    return (
        <React.Fragment>
            <Category data={""} _margin='3.2rem 0 2.4rem'/>
            <ResponseFilter>
                <Filter/>
                <CardSearch data={cate_list}/>
            </ResponseFilter>
            <Btn _onClick={() => {dispatch(postActions.getListMoreFB(path.state.cate))}} _text='더보기'/>
        </React.Fragment>
    );
};
const ResponseFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export default Search;