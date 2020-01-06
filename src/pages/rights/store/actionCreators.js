import * as constants from './actionTypes';

//异步请求 list
import {getRightsList} from '../../../api/index'

export const RightsList = (params)=>{
  return dispatch => {
    getRightsList(params).then(res=>{
      console.log(res);
      if( res.meta.status === 200 ){
        dispatch({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
          type:constants.CAN_LIMITS,
          data:res.data
        })
      }
    })
  }
}  
