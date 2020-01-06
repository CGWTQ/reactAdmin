import {
    getRolesList,
    postAddRoles,
    deleteDeleteRoles,
} from "./../../../../api/index"

import {fromJS} from 'immutable';


export const usersList = () => {
    // 该函数有一个形参 dispatch
    return dispatch => {
        getRolesList().then(res=>{
            if(res.meta.status===200){
                let data = fromJS(res.data)
                dispatch({
                type: 'GETDATE',
                playload: {data}
                })
            }else{
                console.log(res)
            }
        })
    }
}
export const addUsers = (params) => {//添加
    return () => {
        postAddRoles(params).then(res=>{
                console.log(res)
        })
    }
}
// export const addUsers = (params) => {//
//     return () => {
//         postAddRoles(params).then(res=>{
//                 console.log(res)
//         })
//     }
// }