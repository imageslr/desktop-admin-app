import Cookies from 'js-cookie';


const TokenKey = 'Admin-Token';

export function getToken() {
  return Cookies.get(TokenKey, {path: 'admin'});
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {path: 'admin'});
}

export function removeToken() {
  return Cookies.remove(TokenKey, {path: 'admin'});
}