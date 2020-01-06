
import * as constants from './actionTypes';

// 导入 antd
import {message} from 'antd';


// 导入接口
import {getUsers,putUsersState,putUsers,delUsers,postUsers} from '../../../api/index'



// 获取用户列表
export const getUserData = (params)=>{
    return dispatch=>{
      let data;
      getUsers(params).then(res => {
        if(res.meta.status === 200){
          data = res.data
          dispatch({
            type: constants.ARTS_GET,
            data
          })
        }  
      })
    }
}

// 更改用户状态
export const usersState = (id,state) => {
  return ()=>{
    putUsersState(id,state).then(res => {
      if(res.meta.msg === 200){
        message.success(res.data)
      }else{
        message.error('设置状态失败')
      }
    })
  }
}

// 编辑用户
export const editorUsers = (params) => {
  return ()=>{
    putUsers(params).then(res => {
      if(res.meta.status === 200){
        message.success(res.meta.msg)
      }else{
        message.error(res.meta.msg)
      }
    })
  }
}

// 用户删除
export const deleteUsers = (id) => {
  return ()=>{
    delUsers(id).then(res => {
      if(res.meta.status === 200){
        message.success(res.meta.msg)
      }else{
        message.success(res.meta.msg)
      }
    })
  }
}
// 添加用户
export const addUsers = (params) => {
  return ()=>{
    postUsers(params).then(res => {
      if(res.meta.status === 201){
        message.success(res.meta.msg)
      }else{
        message.error(res.meta.msg)
      }
    })
  }
}


