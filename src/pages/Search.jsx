import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Category } from "../components/index";
import { CardSearch, Filter } from '../components/index';
import { Btn } from '../elements';

// import axios from 'axios';
const Search = (props) => {
    const dispatch = useDispatch();
    const path = useLocation();
    console.log("패뜨",path)

    const basic_option = {
        txt: "all",
        job_status : "all",
        apply_period : ["all"],
        education : "all",
        benefit : ["all"],
        location : ["all"],
        limit : "all",
        special_limit : "all",
    }


    return (
        <React.Fragment>
            <Category cate={""} _margin='3.2rem 0 2.4rem'/>
            <ResponseFilter>
                <Filter/>
                <CardSearch option={basic_option}/>
            </ResponseFilter>
            {/* <Btn _onClick={() => {dispatch(postActions.getListMoreFB(path.state.cate))}} _text='더보기'/> */}
        </React.Fragment>
    );
};
const ResponseFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export default Search;