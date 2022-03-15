const REST_API_KEY = "da909b14a8ee1aa6027d5219f83b0b8d";
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

export const KAKAO_AUTH_URL = `http://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
