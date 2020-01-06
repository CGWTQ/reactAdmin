// 导入模块
import { combineReducers } from 'redux-immutable';

// 导入reducer
// import {reducer as 模块名Reducer}from '../pages/模块名/store';
import {reducer as DashBoard}from '../pages/dashboard/store';
import {reducer as Rights}from '../pages/rights/store';
import  Roles from '../pages/roles/store/reducers/roles';
import Goods from '../pages/goods/store/reducers';
import {reducer as OrderFenlei}from '../pages/orders/store';
import {reducer as GetOrder}from '../pages/order/store';
import {reducer as User}from '../pages/user/store';
import {reducer as Login}from '../pages/login/store';
// import {reducer as LoginReducer}from '../pages/login/store';

// 合并reducer
const reducers = combineReducers({
    // 模块小驼峰名:模块名Reducer大驼峰, 
    dashBoard:DashBoard,
    roles:Roles,
    rights:Rights,
    goods:Goods,
    orderFenlei:OrderFenlei,

    getOrder:GetOrder,
    user:User,
    login:Login
    // LoginReducer,
})

// 导出
export default reducers