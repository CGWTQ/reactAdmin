// 一、导入库
import {fromJS} from 'immutable';
import * as constants from './actionTypes';

// 二、定义默认数据（注：默认对象）
const defaultState = fromJS({
  username: localStorage.getItem('username') || '',
  token: localStorage.getItem('token') || '',
  loginStatus: localStorage.getItem('loginStatus') || false,
});

// 三、导出仓库数据
export default (state=defaultState, action) => {
  switch(action.type)
  {
    case constants.SET_USERINFO:
      state.set('username', action.payload.username)
      state.set('token', action.payload.toekn)
      return state.set('loginStatus', true)
    default: 
      return state;         
  }
}
