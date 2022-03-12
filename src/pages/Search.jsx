import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Category } from "../components/index";
import { CardSearch, Filter } from '../components/index';

import axios from 'axios';
const Search = () => {
    const path = useLocation()
    const [data, setData] = useState([])
    const getSearch = async () => {
        const response = await axios.get('http://localhost:4000/search');
        setData(response.data);
        console.log("통신실행", response.data)
    };

    useEffect(() => {
        getSearch();
    }, [])

    return (
        <React.Fragment>
            <Category _path={path.pathname} _margin='2rem 0'/>
            <ResponseFilter>
                <Filter/>
                <CardSearch data={data}/>
            </ResponseFilter>
        </React.Fragment>
    );
};
const ResponseFilter = styled.div`
    // display: flex;
    // flex-direction: row-reverse;
`
export default Search;