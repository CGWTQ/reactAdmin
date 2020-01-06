import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import {combineReducers} from 'redux-immutable';

// reducers（实战：1都放在src/store目录下 学习，2放到pages目录中 项目）
import roles from './reducers/roles'

// export default createStore(cartReducer, composeWithDevTools())
export default createStore(combineReducers({
    roles,
}), composeWithDevTools(applyMiddleware(thunk)))
// }), composeWithDevTools())