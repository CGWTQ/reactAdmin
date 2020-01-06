// 导入模块
import { fromJS } from 'immutable';

// 二、仓量
import * as constants from './actionTypes';
// 导入reducer
// import {reducer as 模块名Reducer}from '../pages/模块名/store';
// import {reducer as ArticlesReducer}from '../pages/articles/store';
// import {reducer as LoginReducer}from '../pages/login/store';

// 合并reducer
const goodsState = fromJS({
    // 数据
    data: [],
    // LoginReducer,
})
const goods = (state = goodsState, action) => {
    switch (action.type) {
        case constants.SET_DATA:
            return state.set('data',action.payload.data)
        case  constants.SET_DATAFL:
            return state.set('datafl',action.payload.data)
            // break;  
            // break;
        default: 
            break;
    }
    return state
}
// 导出
export default goods