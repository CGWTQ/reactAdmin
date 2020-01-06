// 导入模块
import thunk from 'redux-thunk'		               
import {createStore, applyMiddleware} from 'redux' 
import {composeWithDevTools} from "redux-devtools-extension"
import {combineReducers} from 'redux-immutable';
// 导入reducer
import goods from './reducers';

// 创建仓库
export default createStore(combineReducers({
    goods,
}), composeWithDevTools(applyMiddleware(thunk)))