import React from 'react';

const size = {
    mobile: "500px",
    tablet: "808px",
};

const Theme = {
    /* 공통 폰트 */
    fontFamily: {
        primary: 'Noto Sans, "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        Ohneuleun : 'Ohneuleun'
    },

    /* 디자인 지정 폰트 */
    font : {
        styleh1 : 'normal 600 3.6rem/1.3 Noto sans, sans-serif',
        styleh2 : 'normal 600 3.2rem/1.3 Noto sans, sans-serif',
        styleh3 : 'normal 600 2.4rem/1.3 Noto sans, sans-serif',
        styleh4 : 'normal 600 2rem/1.3 Noto sans, sans-serif',
        styleh5 : 'normal 600 1.4rem/1.3 Noto sans, sans-serif',
        styleh6 : 'normal 600 1.6rem/1.3 Noto sans, sans-serif',
        cat_tags : 'normal 400 1.8rem/1.3 Noto sans, sans-serif',
        options : 'normal 400 1.6rem/1.3 Noto sans, sans-serif',
        p : 'normal 400 1.2rem/1.45 Noto sans, sans-serif',
        body : 'normal 400 1.4rem/1.45 Work sans, sans-serif',
        small_number : 'normal 400 1.2rem/1.45 Noto sans, sans-serif',
        option_title : 'normal 600 1.6rem/1.3 Noto sans, sans-serif',
        option_selected: 'normal 400 1.2rem/1.3 Noto sans, sans-serif',
        btn_medium : 'normal 400 1.8rem/1.3 Noto sans, sans-serif',
        btn_small : 'normal 400 1.2rem/1.3 Noto sans, sans-serif',
        social_login_label: 'normal 600 1.6rem/1.3 Noto sans, sans-serif',
        tap: 'normal 600 1.6rem/1.3 Noto sans, sans-serif',
        text_small: 'normal 400 1.3rem/1.45 Noto sans, sans-serif',
        pc_list_title: 'normal 600 2rem/1.2 Noto sans, sans-serif',
        pc_list_cate: 'normal 400 1.2rem/1.25 Noto sans, sans-serif',
        pc_list_info: 'normal 400 1.3rem/1.45 Noto sans, sans-serif',
        m_list_title: 'normal 600 1.6rem/1.5 Noto sans, sans-serif',
        m_list_cate: 'normal 400 1rem/2 Noto sans, sans-serif',
        m_list_bottom_info: 'normal 400 1rem/1.45 Noto sans, sans-serif',
        title_m: 'normal 600 1.8rem/1.3 Noto sans, sans-serif',
        tags_cate_tab: 'normal 600 1.4rem/1.3 Noto sans, sans-serif',
        tab_category_number: 'normal 400 1rem/1.45 Noto sans, sans-serif',
        align_tab: 'normal 600 1.2rem/1.5 Noto sans, sans-serif',
        align_default: 'normal 400 1.2rem/1.5 Noto sans, sans-serif',
        curation_title: 'normal 600 1.8rem/1.3 Noto sans, sans-serif',
        curation_author: 'normal 600 1.2rem/1.3 Noto sans, sans-serif',
        social_rv_author: 'normal 400 1rem/1.3 Noto sans, sans-serif',
    },

    /* p = primary, s = secondary, o = other, b = black, g = gray, w = white, w1 = warning */
    color: {
        p1: '#183E6C',
        p2: '#3B74B9',
        p3: '#AAC4E4',
        p31: '#89BCF0',
        p32: '#AAC4E4',
        p4: '#495057',
        p5: '#E4ECF6',
        s1: '#4CA575',
        s2: '#8FD8B1',
        o1: '#FFCC00',
        b0: '#000000',
        b1: '#231F20',
        b2: '#333333',
        b3: '#303037',
        g1: '#C4C4C4',
        g2: '#E5E5E5',
        g3: '#F8F8F8',
        w: '#ffffff',
        w1: '#D14F33',
        filter_pc_color: 'rgba(170, 196, 228, 1)',
        google: `rgb(35 31 32 / 54%)`
    },

    /* 카테고리별 디자인 color */
    cate_color:{
        finance: 'rgba(24, 160, 251, 1)',
        covid: 'rgba(239, 51, 51, 1)',
        startup: 'rgba(255, 129, 13, 1)',
        policy: 'rgba(111, 186, 44, 1)',
        recruit: 'rgba(162, 89, 255, 1)',
        welfare: 'rgba(245, 192, 1, 1)'
    },

    /* social 가이라인 color */
    social_login: {
        kakao: '#FEE500',
        naver: '#03C75A',
        google: '#F8F8F8'
    },
    radius : {
        round: '24px',
        card: '32px'
    },
    device : {
        mobile: `@media only screen and (max-width: ${size.mobile})`,
        tablet: `@media only screen and (max-width: ${size.tablet})`,
    }
    
};

export default Theme;