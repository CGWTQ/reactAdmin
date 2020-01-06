import React, { Component } from 'react'
// 导入UI
import {
    Card,
    Button,
    Table,
    Divider,
    Tag,
    Pagination,
    Input, 
    Modal,
    Form,
    Cascader,
    message
} from 'antd';
// 状态管理
import {connect} from 'react-redux'
// 样式
import {FenYe} from '../../style'
import {
    getGoodsfl,
    putGoodsList,
} from '../../../../api/index'
// action方法
import {
    deleteGoodsListCreators,
    getGoodsListCreators,
} from '../../store/actionCreators'
const { Search } = Input;

// const options = [
//     {
//       value: 'zhejiang',
//       label: 'Zhejiang',
//       children: [
//         {
//           value: 'hangzhou',
//           label: 'Hangzhou',
//           children: [
//             {
//               value: 'xihu',
//               label: 'West Lake',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       value: 'jiangsu',
//       label: 'Jiangsu',
//       children: [
//         {
//           value: 'nanjing',
//           label: 'Nanjing',
//           children: [
//             {
//               value: 'zhonghuamen',
//               label: 'Zhong Hua Men',
//             },
//           ],
//         },
//       ],
//     },
//   ];
//   三级的事件
function onChange(value) {
    console.log(value);
  }
class List extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            // 状态栏数据
            goodsname:'',
            goodsnum:'',
            goodsjiag:'',
            goodszl:'',
            data:this.props.goods.data,
            // 列表查询数据
            query:'',
            pagesize:5,
            pagenum:1,
            // 对话框状态
            visible: false,
            // s三级框数据
            cat_id:[],
            // 查询需要ID

            goodsId:0,
            // loading判断
            loading:true,
        }
    }
    // query	查询参数	可以为空
// pagenum	当前页码	不能为空
// pagesize 每页显示条数	不能为空
// 异步请求列表数据
    componentDidMount(){
        this.goodsList()
        getGoodsfl().then((res) => {
            if(res.meta.status){//.status===200
                // 遍历三级数据
                let mtp = res.data
                for(var i = 0 ; i < mtp.length ; i++){
                    mtp[i].value=mtp[i].cat_id
                    mtp[i].label=mtp[i].cat_name
                  for(var j = 0 ; j < mtp[i].children.length ; j++){
                    mtp[i].children[j].value=mtp[i].children[j].cat_id
                    mtp[i].children[j].label=mtp[i].children[j].cat_name
                    if (mtp[i].children[j].children && mtp[i].children[j].children.length > 0) {
                         for(var n = 0 ; n < mtp[i].children[j].children.length; n++){
                            mtp[i].children[j].children[n].value= mtp[i].children[j].children[n].cat_id
                            mtp[i].children[j].children[n].label= mtp[i].children[j].children[n].cat_name
           
                        }
                    }
                       
                  }
                }
                this.setState({
                                    cat_id:mtp
                                })
            }
        })
                                
        // row.children.forEach(first => {
        //     if (first.children && first.children.length > 0) 
        //     {
        //         first.children.forEach(two => {
        //             if (two.children && two.children.length > 0) 
        //             {
        //                 two.children.forEach(three => {
        //                     // three.id
        //                     this.defaultCheckedArr.push(three.id)
        //                 })
        //             }
        //         })   
        //     }
        // })
    }
    // 普通方法渲染数据
    goodsList(){
        
        this.setState({
            loading:true
        })
        this.props.getGoodsListFn({
            pagenum:this.state.pagenum,
            pagesize:this.state.pagesize,
            query:this.state.query
        },this.loading.bind(this)) 
    }
    // loading图
    loading(){
        this.setState({
            loading:false
        })
        // this.refs.loading=1
    }
    // 分页回调
    async fengyChangefn(pageNumber) {
        await this.setState({
            pagenum:pageNumber
        })
        await this.goodsList()
      }
    
    // async sskuangGoodsFn(e){
    //     await this.setState({query: e.target.value});
    //     await this.goodsList()
    //   }
    //   搜索框双向绑定
    sskuangFz= async (cc)=>{
        await this.setState({query: cc});
        await this.goodsList()
    console.log(cc)  
    }
// 弹框双向绑定
    updateModel(e){
        if(e.target.getAttribute('flag')==='goodsname'){
         this.setState({
            goodsname:e.target.value,
         })
        }else if(e.target.getAttribute('flag')==='goodsnum'){
            this.setState({
                goodsnum:e.target.value
            })
           }else if(e.target.getAttribute('flag')==='goodsjiag'){
            this.setState({
                goodsjiag:e.target.value
            })
           }else if(e.target.getAttribute('flag')==='goodszl'){
            this.setState({
                goodszl:e.target.value
            })
           }
         
     }
    //   删除方法
         deleteGoods(goodesid){
        this.props.deleteGoodsListFn(goodesid,this.goodsList.bind(this))
    }

// 对话框方法
  showModal = (goodsId,content) => {
    this.setState({
        goodsname:content.goods_name,
        goodsnum:content.goods_number,
        goodsjiag:content.goods_price,
        goodszl:content.goods_weight,
      visible: true,
      goodsId:goodsId
    });
  };
// 对话框方法
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
// 对话框方法
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
//   分类数据
  jiadianFn(){
      console.log(this.props.goods.datafl)
    //   this.props.goods.datafl.forEach((ietm, index) => {
    //       console.log(ietm)
    //   })
      return [

      ]
  }
// 提交事件
handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
          // 提交跳转页面
            let tmp = ''
            values.sanj.forEach((value) => {
                tmp+=value+','
            })
            putGoodsList(this.state.goodsId,{
            id:this.state.goodsId,
            goods_name:this.state.goodsname,
            goods_price:this.state.goodsjiag,
            goods_number:this.state.goodsnum,
            goods_weight:this.state.goodszl,
            goods_cat:tmp,
            }).then((res) => {
                if(res.meta.status===200){
                    this.goodsList()
                    this.setState({
                        visible: false,
                      });
                    message.success(res.meta.msg)
                }else{
                    message.error(res.meta.msg)
                }
            })
        }
    });
};
    render() {
        const { getFieldDecorator } = this.props.form;
        let {
            pagenum,
            pagesize,
            cat_id,
            goodsname,
            goodsnum,
            goodsjiag,
            goodszl,
            loading,
        }=this.state
        let dataList=this.props.goods.data.goods
        // 表格数据
        const columns=[
            {
                title: '#',
                dataIndex: 'goods_id',
                key: 'goods_id',
                render: text => <span>{text}</span>,
            },
            {
                title: '名称',
                dataIndex: 'goods_name',
                key: 'goods_name',
            },
            {
                title: '价格',
                dataIndex: 'goods_price',
                key: 'goods_price',
            },
            {
                title: '重量',
                key: 'goods_weight',
                dataIndex: 'goods_weight',
                
            },
            {
                title: '数量',
                dataIndex: 'goods_number',
                key: 'goods_number',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return(
                    <div>
                        <Button type="dashed" size="small" onClick={this.showModal.bind(this,record.goods_id,record)}>编辑</Button>
                        <Divider type="vertical" />
                        <Button type="dashed" size="small" onClick={this.deleteGoods.bind(this,record.goods_id)}>删除</Button>
                    </div>
                )}
            },
        ]
        return (
            <div id='list'>
                <Card title={ <div><Search placeholder="搜索"
                // value={query}
                onSearch={this.sskuangFz}
                allowClear
                // onChange={this.sskuangGoodsFn.bind(this)}
      style={{ width: 200 }} />
      <Button type="dashed" style={{marginBottom:'10px'}} onClick = {this.addFn.bind(this)}>添加商品</Button>
      </div>} style={{height:'100%'}}>
                    {/* 表格 */}
                   

                    <Table align='center' rowKey={()=>Math.random()*1000000} loading={loading} columns={columns} dataSource={dataList||[]} scroll={{ x: 'atun' }} pagination={false} />
                    {/* 分页 */}
                    <FenYe>
                        <Pagination showQuickJumper defaultCurrent={pagenum} pageSize={pagesize} total={this.props.goods.data.total} onChange={this.fengyChangefn.bind(this)} />
                    </FenYe>
                </Card>
                {/* 对话框 点击编辑 */}
                <Modal
          title="修改商品"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
        >
            {/* 编辑的商品 */}
            <Form onSubmit={this.handleSubmit} className="login-form">
               
               <Form.Item>
                       <Input
                       flag='goodsname'
                       onChange={this.updateModel.bind(this)}
                       value={goodsname}
                       placeholder="商品名称"
                       />
               </Form.Item>

               <Form.Item>
                       <Input
                       flag='goodsnum'
                       onChange={this.updateModel.bind(this)}
                       value={goodsnum}
                       placeholder="商品数量"
                       />
               </Form.Item>

               <Form.Item>
                       <Input
                       flag='goodsjiag'
                       onChange={this.updateModel.bind(this)}
                       value={goodsjiag}
                       placeholder="商品价格"
                       />
               </Form.Item>                    

               <Form.Item>
                       <Input
                       flag='goodszl'
                       onChange={this.updateModel.bind(this)}
                       value={goodszl}
                       placeholder="商品重量"
                       />
               </Form.Item>
               {/* 三级分类 */}
               <Form.Item> 
               {getFieldDecorator('sanj', {
                       rules: [{ required: true, message: '请分类' }],
                   })(
                      <Cascader
                       options={cat_id}
                       
                        onChange={onChange} 
                        placeholder="商品分类" />
                   )}
               
               </Form.Item> 
               
               <Form.Item>
                   <br/>
               <Button type="primary" htmlType="submit" className="login-form-button">
                   创建
               </Button>
               </Form.Item>
           </Form>
        </Modal>
            </div>
        )
    }

    // 添加方法跳转页面
    addFn(){
        this.props.sendShow('add')
    }
}
// export default List
const mapStateToProps = state => { // state就是仓库store数据
    return { // 组件中通过 this.props.键 来获取数据
        goods: state.toJS().goods
    }
}
const mapDispatchToProps= dispatch => {
    return { // 组件中通过this.props.键()
        getGoodsListFn: (goodsobj,callback) => dispatch(getGoodsListCreators(goodsobj,callback)) ,  // 注：dispatch中传递的是action
        deleteGoodsListFn: (goodesid,callback) => dispatch(deleteGoodsListCreators(goodesid,callback)),  // 注：dispatch中传递的是action // 注：dispatch中传递的是action
        // adl: index => dispatch(reduction(index))   // 注：dispatch中传递的是action
    }
}
export default Form.create({ name: 'normal_login' })(connect(mapStateToProps, mapDispatchToProps)(List));