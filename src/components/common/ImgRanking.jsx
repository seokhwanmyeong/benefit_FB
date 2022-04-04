import React from 'react';
import { SvgRank1, SvgRank2, SvgRank3, SvgRank4, SvgRank5, } from '../../icons/ico_ranking'

const ImgRanking = (props) => {
    const { rank } = props;

    return (
        <React.Fragment>
            {{
                "1" : <SvgRank1/>,
                "2" : <SvgRank2/>,
                "3" : <SvgRank3/>,
                "4" : <SvgRank4/>,
                "5" : <SvgRank5/>,
            }[rank]}
        </React.Fragment>
    );
};

export default ImgRanking;