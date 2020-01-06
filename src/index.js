// 导入库
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux'

// 导入组件
import App from './App';

// 导入状态
import store from './store/index'




// 渲染
render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));