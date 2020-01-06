
// 一、常量
import * as constants from './actionTypes';

// 二、UI组件
import { message } from 'antd';

// 三、接口
import { 
    postLogin
} from '../../../api/index';

// 四、定义actionCreators  
// 语法 export const set/add/getReducer键名Creator = () => dispatch => {}
// 代码  
// 登录

 export const setUserinfoCreator = params => dispatch => {

    postLogin(params)
    .then(res => {
        if (res.meta.status === 200)
        {
            // 1. 数据持久化
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('loginStatus', true)
            // 2. 更新reducer
            dispatch({
                type: constants.SET_USERINFO,
                payload: res.data
            })
            // 3.提示信息
            message.success(res.meta.msg)
        } else {
            message.error(res.meta.msg)
        }
    })
 }