import React from "react";
import { Link } from "react-router-dom";

import { Card } from "../components/index";
import { Btn } from "../elements";

const Main = () => {
  return (
    <div>
      <section>
        <div>
          <h3>오늘의 베스트</h3>
        </div>
        <Card />
      </section>
      <section>
        <div>
          <h3>카테고리별 베스트</h3>
        </div>
        <Card />
        <Card />
        <Link to='/search'>카테고리 더보기</Link>
      </section>
      <section>
        <div>
          <h3>내 정책은 어디에?</h3>
        </div>
        <Link to='/search'>검색페이지 링크버튼</Link>
      </section>
    </div>
  );
};

export default Main;
