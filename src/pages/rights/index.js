import React, { Component } from 'react'
// import {PageDiv} from './style'
import {connect} from 'react-redux'
import { Table, Tag ,  } from 'antd';
import {RightsList} from './store/actionCreators'

 class ArticleIndex extends Component {
    // constructor(props)
    // {
    //     super(props)
    //     this.state = {
    //         total: 60,
    //         show:"createPage"
    //     }
    // }
    componentDidMount(){
      this.props.RightsListFn({type:'list'})
   }
    
    render() {
      const btn = [
        <Tag  icon="sketch" color='red'>
          一级
        </Tag>,
        <Tag color='orange' >
          二级
        </Tag>,
        <Tag color='yellow'>
          三级
        </Tag>,
      ];
        const columns = [
            {
              title: '权限名称',
              dataIndex: 'authName',
              key: 'authName',
              render: text => <em>{text}</em>,
            },
            {
              title: '路径',
              dataIndex: 'path',
              key: 'path',
            },
            {
              title: '分级',
              key: 'level',
              dataIndex: 'level',
              render: (text,row) => (
                <span>
                  {btn[row.level]}
                </span>
              ),
            },
          ];
          let {data}=this.props
            return (
                <div>
                        <Table columns={columns} dataSource={data} pagination={false} rowKey={()=>Math.random()*1000000}/>
                </div>
            )
        }
        
}
const mapStateToProps = state => { // state就是仓库store数据
   console.log(state.toJS().rights.data)
    return { // 组件中通过 this.props.键 来获取数据
        // 键: state.数据
        data: state.toJS().rights.data
    }
}
const mapDispatchToProps= dispatch => {
    return { // 组件中通过this.props.键()
        // 键: index => dispatch(incrment(index))   // 注：dispatch中传递的是action
        RightsListFn: (params) => dispatch(RightsList(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleIndex)
