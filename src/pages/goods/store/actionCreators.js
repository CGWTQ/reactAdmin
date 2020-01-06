
// 一、仓量
import * as constants from './actionTypes';

// 二、UI组件
import { message } from 'antd';

// 三、接口
import { 
    getGoodsListApi,
    deleteGoodsListApi,
    getGoodsfl,
} from '../../../api/index';

// 四、定义actionCreators  
// 语法 export const set/add/getReducer键名Creator = () => dispatch => {}
// 代码  
// 登录

 // query	查询参数	可以为空
// pagenum	当前页码	不能为空
// pagesize 每页显示条数	不能为空
export const getGoodsListCreators = (goodsobj,callback)=>
{return dispatch => {
    getGoodsListApi(goodsobj)
    .then((res) => {
        if(res.meta.status===200){
            dispatch({
                    type:constants.SET_DATA,
                    payload:{
                       data:res.data
                    }
                })
                callback()
                
        }
        
    })
}
}
// export const Goodsfl = (goodsobj)=>
// {return dispatch => {
//     getGoodsfl(goodsobj)
//     .then((res) => {
//         if(res.meta.status===200){
//             dispatch({
//                     type:'GOODS_FL',
//                     payload:{
//                        data:res.data
//                     }
//                 })
//         }
        
//     })
// }
// },

export const deleteGoodsListCreators = (goodsobj,callback)=>
{return dispatch => {
    deleteGoodsListApi(goodsobj)
    .then((res) => {
        if(res.meta.status===200){
        message.success(res.meta.msg)
        callback()
    }else{
        message.error(res.meta.msg)
    }
       
    })
}
}


export const getGoodsflCreators = (goodsobj,callback)=>
{return dispatch => {
    getGoodsfl().then((res) => {
        if(res.meta.status){//.status===200
            // 遍历三级数据
            let mtp = res.data
            for(var i = 0 ; i < mtp.length ; i++){
                mtp[i].value=mtp[i].cat_id
                mtp[i].label=mtp[i].cat_name
              for(var j = 0 ; j < mtp[i].children.length ; j++){
                mtp[i].children[j].value=mtp[i].children[j].cat_id
                mtp[i].children[j].label=mtp[i].children[j].cat_name
                if (mtp[i].children[j].children && mtp[i].children[j].children.length > 0) {
                     for(var n = 0 ; n < mtp[i].children[j].children.length; n++){
                        mtp[i].children[j].children[n].value= mtp[i].children[j].children[n].cat_id
                        mtp[i].children[j].children[n].label= mtp[i].children[j].children[n].cat_name
                        dispatch({
                            type:constants.SET_DATAFL,
                            payload:{
                               data:res.data
                            }
                        })
                    }
                }
                   
              }
            }
        }
       
    })
}
}

