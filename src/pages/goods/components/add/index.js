import React, { Component } from 'react'

//导入组件
// import Total from './total/index' 
import AddInformation from '../addInformation/index' 
import AddContent from '../addContent/index' 
import AddImg from '../addImg/index' 
import AddAchieve from '../addAchieve/index'
// 导入 UI
import { 
    Button,
    Card, 
} from 'antd';


class Add extends Component {
    constructor(props)
    {
        super(props)
        // 定义跳转组件变量
        this.listShow = this.listShow.bind(this)
        this.state={
          listShow:'xx',
          addgoods:{
            goods_name: '',//商品名称	不能为空
            goods_cat: '',	//以为','分割的分类列表	不能为空
            goods_price: '',//	价格	不能为空
            goods_number: '',	//数量	不能为空
            goods_weight: '',	//<Route path="" component={}/>重量	不能为空
            goods_introduce: '',//介绍	可以为空
            pics : '',//	上传的图片临时路径（对象）	可以为空
            attrs: '',	//商品的参数（数组）	可以为空
        }
      }
    }
    // 判断渲染组件的方法
    listShow(data){
      this.setState({
        listShow:data,
        
      })  
  }

    //  编辑仓库数据
    addgoodsFn=(data)=>{
        let add =this.state.addgoods
        add.goods_name=data.goods_name
        add.goods_price=data.goods_price
        add.goods_number=data.goods_number
        add.goods_weight=data.goods_weight
        add.goods_cat=data.goods_cat	//<Route path="" component={}/>重量	不能为空}
        this.setState({
            addgoods:add
        })
        // console.log(this.state)
    } 
    addconFn=(data)=>{
        let tmp =this.state.addgoods
        tmp.goods_introduce=data
        this.setState({
            addgoods:tmp
        })
    }
    // // 返回商品列表方法
    addFn(){
        this.props.sendShow('list')
    }
    // // 返回商品列表方法
    listFn(){
        this.addFn()
    }
    // // 创建完成
    // componentDidMount(){
    //     var E = wangeditor;
    //     var editor = new E(this.refs.editor);
    //     editor.create()
    // }
    render() {
      let {listShow,addgoods,num}=this.state
        // 表格数据
        //  {/*判断显示组件  */}
                if(listShow==='xx'){
                    return (
                        <div id='add'>
                            {/* 卡片 */}
                             <Card title={ <Button type="dashed" style={{marginBottom:'10px'}} onClick = {this.addFn.bind(this)}>返回</Button>} >
                       
                              {/* 信息组件 */}
                              <AddInformation listShow={this.listShow} addgoodsFn={this.addgoodsFn} addgoods={addgoods}></AddInformation>
                             </Card>
                        </div>
                    )
                  
                }else if(listShow==='content'){
                    return (
                        <div id='add'>
                            {/* 卡片 */}
                             <Card title={ <Button type="dashed" style={{marginBottom:'10px'}} onClick = {this.listShow.bind(this,'xx')}>上一步</Button>}>
                              
                              {/* 概述组件 */}
                              <AddContent listShow={this.listShow} addconFn={this.addconFn}  addgoods={addgoods}></AddContent>
                             </Card>
                        </div>
                    )

                }else if(listShow==='img'){
                    return (
                        <div id='add'>
                            {/* 卡片 */}
                             <Card title={ <Button type="dashed" style={{marginBottom:'10px'}} onClick = {this.listShow.bind(this,'content')}>上一步</Button>}  style={{height:'100%'}}>
                              {/* 上传组件 */}
                              <AddImg listShow={this.listShow}  addgoods={addgoods}></AddImg>
                             </Card>
                        </div>
                    )

                }else if(listShow==='wanc'){
                    return (
                        <div id='add'>
                            {/* 卡片 */}
                             <Card title={ <Button type="dashed" style={{marginBottom:'10px'}} onClick = {this.addFn.bind(this)}>返回</Button>} style={{height:'100%'}}>
                              {/* 上传组件 */}
                              <AddAchieve listShow={this.listShow} listFn={this.props.sendShow}></AddAchieve>
                             
                             </Card>
                        </div>
                    )

                }
       
    }

    // 添加方法
}
 

export default Add