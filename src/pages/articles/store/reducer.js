import {fromJS} from 'immutable';
import * as constants from './actionTypes';

const defaultState = fromJS({
  tableList:[],
  total:6
});

export default (state=defaultState, action) => {
  switch(action.type)
  {
    case constants.ARTS_ADD:
      return state.update('total', val=>val+1);
    default:
      return state;         
  }
}


// 相关参考代码

// import {fromJS} from 'immutable';
// import * as constants from './actionTypes';

// export default (state=defaultState,action)=>{
//   switch(action.type){
//       //查询
//     case constants.CHANGE_SEARCH_TABLE:
//       return state.merge({
//         tableList:action.rows,
//         total:action.total
//       });
//       //分页
//     case constants.PAGE_CHANGE_DATA:
//       return state.merge({
//         tableList:action.rows,
//         total:action.total,
//         page:action.page
//   });
//     default:
//       return state;        
//   }
// }

// 相关参考代码
// const defaultState = fromJS({
//   tableList:[],
//   total:''
// });

// export default (state=defaultState,action)=>{
//   switch(action.type){
//       //查询
//     case constants.CHANGE_SEARCH_TABLE:
//       return state.merge({
//         tableList:action.rows,
//         total:action.total
//       });
//       //分页
//     case constants.PAGE_CHANGE_DATA:
//       return state.merge({
//         tableList:action.rows,
//         total:action.total,
//         page:action.page
//   });
//     default:
//       return state;        
//   }
// }