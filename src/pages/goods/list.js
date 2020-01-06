import React, { Component } from 'react'
// 导入子
import List  from './components/listget/index'
import Add  from './components/add/index'
// import {Provider} from 'react-redux'
// import store from './store/index'


class index extends Component {
    constructor(props)
    {
        super(props)
        // 更改 this 指向
        this.sendShow = this.sendShow.bind(this)
        this.state={
            isShow:'list'
        }
    }

    
    render() {
        // 获取
        let {
            isShow
        }=this.state
        // 判断渲染组件并且传方法
        if(isShow==='list'){
           return   <List  sendShow = {this.sendShow} ></List>
                   
        }else if(isShow==='add'){
            return   <Add  sendShow = {this.sendShow} ></Add>
                   
        }
    }
    // 更改判断组件渲染的变量
    sendShow(data){
        this.setState({
            isShow:data
        })  
    }
}
export default index