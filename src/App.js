// 导入库
import React, { Component } from 'react'

// 导入样式
import { GlobalStyle } from './static/reset';

// 导入UI组件
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

// 导入路由
import ReactRouter from './router/index'


// 定义组件
class App extends Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <GlobalStyle />
                <ReactRouter></ReactRouter>
            </ConfigProvider>
        )
    }
}

export default App