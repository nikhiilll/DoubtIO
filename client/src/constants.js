// const API_ROOT = "http://localhost:5000/api";
const API_ROOT = "https://doubt-io.herokuapp.com/api";

export const USER_LOGIN = API_ROOT + "/user/login";
export const USER_REGISTER = API_ROOT + "/user/register";
export const VERIFY_USER = API_ROOT + "/user/auth";
export const CREATE_POST = API_ROOT + "/post";
export const GET_POSTS = API_ROOT + "/post";
export const DELETE_POST = API_ROOT + "/post/";
export const SEARCH_POSTS = API_ROOT + "/post/search";
export const UPVOTE_POST = API_ROOT + "/post/upvote";
export const DOWNVOTE_POST = API_ROOT + "/post/downvote";
export const COMMENT_POST = API_ROOT + "/post/comment";
export const GET_USER_PROFILE = API_ROOT + "/profile/";
export const GET_USER_POSTS = API_ROOT + "/profile/posts/";
export const UPDATE_PROFILE_DATA = API_ROOT + "/profile/update";
