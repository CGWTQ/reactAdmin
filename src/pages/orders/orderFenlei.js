import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteGoodsCate,setGoodsCate,cateSearch,} from '../../api'

import FileSaver from "file-saver";
import XLSX from "xlsx";
// 导入UI
import {
    Button,
    Table,
    Input,
    Divider,
    Icon,
    Modal,
    Pagination,
    message,
} from 'antd';
import {
    Link
  } from 'react-router-dom';
// 导入 redux action
import { getGoodsCate } from './store/actionCreators'
// 导入样式
import './style'
import { FenYeStyle } from './style';



class index extends Component {
    state = { 
        visible: false,
        addvisible:false,
        data:[],
        cat_name:'',
        reg:/\D/,
        id:"",
        loading:true,
        options:'',
        getpage:{
            pagenum:1,
            pagesize:5
        }
    };
    
    //导出Excel表格
    exportExcel () {
        let wb = XLSX.utils.table_to_book(document.querySelector('Table'));   // 这里就是表格
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'table.xlsx');  //table是自己导出文件时的命名，随意
        } catch (e)
        {
        if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
    }


    //挂载   渲染数据
    componentDidMount(){
        //获取焦点
        this.input.focus()
        let pagenum=this.state.getpage.pagenum
        let pagesize=this.state.getpage.pagesize
        this.props.get({pagenum,pagesize})
        setTimeout(() => {
            this.setState({
                loading:false,
                data:this.props.data.result,
            })
    },500)
}
    //修改数据弹框
    showModal = (record) => {
        this.setState({
            visible: true,
            cat_name:record.cat_name,
            id:record.cat_id
        });
    };

    //修改数据
    handleOk = (id,cat_name) => {
        console.log(id,cat_name);
        setGoodsCate(id,{cat_name}).then(res=>{
            let pagenum=this.state.getpage.pagenum
            let pagesize=this.state.getpage.pagesize
            this.props.get({pagenum,pagesize})
            setTimeout(() => {
            message.success('修改成功!')
                this.setState({
                    cat_name:res.data.cat_name,
                    visible: false,
                    data:this.props.data.result
                })
        },500)
        })
    };

    //点击返回关闭弹框
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    //双向绑定
    editorChangeFn = (e) => {
            this.setState({
                cat_name:e.target.value,
                data:this.props.data.result
            })
        }

    //删除
    deleteHang = id => {
        console.log(id)
        deleteGoodsCate(id).then(res=>{
            let pagenum=this.state.getpage.pagenum
            let pagesize=this.state.getpage.pagesize
            this.props.get({pagenum,pagesize})
            setTimeout(() => {
                message.success('删除成功!')
                this.setState({
                    data:this.props.data.result
                })
        },500)
        })
        
    }
    
    //切换页码
    pageChange(pagenum,pagesize){
        console.log(pagenum)
        console.log(pagesize)
        this.props.get({pagenum:pagenum,pagesize:pagesize})
       
        setTimeout(() => {
            this.setState({
                data:this.props.data.result,
            })
    },500)
    }

    render() {
        const { Search } = Input;
        // 表格数据
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'cat_name'
            },
            {
                title: '编号',
                dataIndex: 'cat_id'
            },
            {
                title: '是否有效',
                render: (text, record) => (
                    <div>
                        <Icon type="check-circle" style={{color:'red'}}/>
                    </div>
                )
            },
            {
                title: '级别',
                dataIndex: 'cat_level',
                render: (text, record) => (
                    <div>
                        <Button type="primary"  size="small" style={{color:"lightyellow",width:30}}>{text}</Button>
                    </div>
                )
            },
            
            {
                title: '操作',
                key: 'action',
                width: 205, 
                render: (text, record) => (
                    <div>
                    <Button type="primary"  onClick={this.showModal.bind(this,record)} >编辑</Button>
                    <Divider type="vertical" />
                    <Button type="danger"  onClick={this.deleteHang.bind(this,record.cat_id)}>删除</Button>
                </div>
                  ),
            }
        ];
        
        
        return (
            <div id='defalut' style={{position:'relative'}}>
                {/* 根据id搜索 */}
                    <Search  onSearch={value => {
                        let datas = this.props.data.result
                        cateSearch(parseInt(value)).then(res=>{
                            if(value===''||this.state.reg.test(value)){
                                this.setState({
                                    data:datas
                                })
                            }else{
                                this.setState({
                                    data:Array(res.data)
                                })
                            }
                        })
                    }}  style={{width:400}}  ref={(input) => this.input = input} allowClear={true}/> 

                {/* 添加 按钮*/}
                <Link to='/admin/addFenlei'><Button style={{marginLeft:20}}>添加</Button></Link>

                {/* 导出excel表格 */}
                <Button onClick={this.exportExcel.bind(this)} style={{position:'absolute',right:50}} type='primary'>导出Ecexl<Icon type="vertical-align-bottom" /></Button>

                {/* 编辑弹框 */}
                <Modal
                style={{marginTop:200}}
                visible={this.state.visible}
                onOk={this.handleOk.bind(this,this.state.id,this.state.cat_name)}
                onCancel={this.handleCancel}
                >
                商品名称：<Input style={{width:350}} 
                            ref='cat_name'
                            type="cat_name"
                            // placeholder={this.state.cat_name}
                            value = {this.state.cat_name}
                            onChange={this.editorChangeFn}/>
                </Modal>

                {/* 表格数据 */}
                <Table columns={columns}  loading={this.state.loading} dataSource={this.state.data} pagination={false} style={{marginTop:20}} rowKey={()=>Math.random()*50000000}/>

                {/* 分页 */}
                <FenYeStyle>
                    <Pagination 
                        defaultCurrent={this.state.getpage.pagenum} 
                        total={this.props.data.total} 
                        pageSize={this.state.getpage.pagesize}
                        onChange={this.pageChange.bind(this)} />   
                </FenYeStyle> 
            </div>
        )
    }

    
}

const mapStateToProps = state => { // state就是仓库store数据
    // console.log(state.toJS().orderFenlei.status)
    return { 
        data:state.toJS().orderFenlei.status
    }
}
const mapDispatchToProps= dispatch => {
    return { 
        get:(params) => dispatch(getGoodsCate(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)