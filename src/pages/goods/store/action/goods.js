import {
    getGoodsList,
    deleteGoodsList,
} from '../../../../api/index'
// export const increment = index => 
// {return dispatch => {
//     postLogin({
//         password: "123456",
//         username: "admin"
//     })
//     .then((res) => {
//         console.log(1)
//         dispatch({
//                     type:'CART_DECR',
//                     payload:{
//                         index
//                     }
//                 })
//     })
// }
// }
// query	查询参数	可以为空
// pagenum	当前页码	不能为空
// pagesize 每页显示条数	不能为空
export const goodsList = (goodsobj,callback)=>
{return dispatch => {
    getGoodsList(goodsobj)
    .then((res) => {
        
        if(res.meta.status===200){
            dispatch({
                    type:'GOODS_LIST',
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

export const deleteGoods = (goodsobj)=>
{return dispatch => {
    deleteGoodsList(goodsobj)
    .then((res) => {
        if(res.meta.status===200){
        }
       
    })
}
}