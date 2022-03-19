import React from 'react';
import styled from 'styled-components';
import {  useSelector } from 'react-redux';

import { Category } from "../components/index";
import { CardSearch, Filter } from '../components/index';
import { Btn } from '../elements';

// import axios from 'axios';
const Search = (props) => {
    const options = useSelector((state) => state.post.options)

    // const basic_option = {
    //     txt: "all",
    //     job_status : "all",
    //     apply_period : ["all"],
    //     education : "all",
    //     benefit : ["all"],
    //     location : ["all"],
    //     limit : "all",
    //     special_limit : "all",
    // }

    return (
        <React.Fragment>
            <Category/>
            <ResponseFilter>
                <Filter/>
                <CardSearch option={options}/>
            </ResponseFilter>
            {/* <Btn _onClick={() => {dispatch(postActions.getListMoreFB(path.state.cate))}} _text='더보기'/> */}
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
export default Search;