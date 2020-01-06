import React, { Component } from 'react'
// import {connect} from 'react-redux'


// 导入组件
import Defalut from './components/defalut'
import AddArticle from './components/addArticle'


class index extends Component {
    constructor(props){
        super(props)
        // 更改 this 指向
        this.sendShow = this.sendShow.bind(this)
        this.state = {
            // 是否显示添加页
            isShow:true
        }
    }
    render() {
        let {
            isShow
        } = this.state
        if(isShow){
            return (
                <Defalut sendShow = {this.sendShow}></Defalut>
            )
        }else{
            return (
                <AddArticle sendShow = {this.sendShow}></AddArticle>
            )
        }
    }
    // 显示组件
    sendShow(data){
        this.setState({
            isShow:data
        })  
    }
}
export default index

// const mapStateToProps = state => { // state就是仓库store数据
//     return { // 组件中通过 this.props.键 来获取数据
//         // 键: state.数据
//     }
// }
// const mapDispatchToProps= dispatch => {
//     return { // 组件中通过this.props.键()
//         // 键: index => dispatch(incrment(index))   // 注：dispatch中传递的是action
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(index)