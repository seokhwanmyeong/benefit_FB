import axios from "axios";

// 사용자 정의 인스턴스 기본 설정 참고 (https://yamoo9.github.io/axios/guide/config-defaults.html#%EA%B8%80%EB%A1%9C%EB%B2%8C-axios-%EA%B8%B0%EB%B3%B8-defaults-%EC%84%A4%EC%A0%95)
const instance = axios.create({

  // 우리가 바라볼 서버의 주소
  baseURL: "https://keilykim.shop/",

  // 자바스크립트는 json형태로 데이터 receive.
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});
// Tip. html form 태그를 사용하여 post 방식으로 요청하거나, jQuery의 ajax 등의 요철을 할때
// default Content-Type은 'application/json,'이 아니라 'application/x-www-form-urlencoded'다.

// interceptors의 역할 => then이나 catch로 처리되기 전
// 요청(request)이나 응답(response)을 가로채 어떠한 작업을 수행할 수 있게 한다. 참고 (https://yamoo9.github.io/axios/guide/interceptors.html)
instance.interceptors.request.use(function (config) {
  if(localStorage.getItem('ybrn')){
    const accessToken = localStorage.ybrn;
    config.headers.common["Authorization"] = `Bearer ${accessToken}`; // header에 토큰값을 넣는다 => header에 토큰값이 있어 앞으로 request를 자유자재로 할 수 있다.
    return config;
  }
  return config;
});
// 데이터 요청 to 서버
export const apis = {
  //   // user
  //   login: (userEmail, password) =>
  //     instance.post("/api/login", {
  //       userEmail: userEmail,
  //       password: password,
  //     }),
};

export default instance;
