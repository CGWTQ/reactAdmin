import React, { Component } from 'react'
// 导入ui框架
import { 
    Form,
    Input,
    Button,
    Cascader, 
    Steps, 
    Icon,
} from 'antd';
// 导入接口
import {
  getGoodsfl,
} from '../../../../api/index'
import { is } from 'immutable';
// 按钮
const { Step } = Steps;
//   三级的事件
function onChange(value) {
    console.log(value);
  }
 class AddInformation extends Component {
   constructor(props)
   {
     super(props)
     this.state={
      cat:[],
      goodsname:'',
        goodsnum:'',
        goodsjiag:'',
        goodszl:'',
     }
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
              let add={}
              add.goods_name=this.state.goodsname
              add.goods_price=this.state.goodsjiag
              add.goods_number=this.state.goodsnum
              add.goods_weight=this.state.goodszl
              add.goods_cat=tmp
              console.log(add)
              this.props.addgoodsFn(add);
              this.props.listShow('content')
            }
        });
    };
    componentDidMount(){
      if(this.props.addgoods){
this.setState({
        goodsname:this.props.addgoods.goods_name,
        goodsnum:this.props.addgoods.goods_number,
        goodsjiag:this.props.addgoods.goods_price,
        goodszl:this.props.addgoods.goods_weight,
})
}
// goods_name: '',//商品名称	不能为空
// goods_cat: '',	//以为','分割的分类列表	不能为空
// goods_price: '',//	价格	不能为空
// goods_number: '',	//数量	不能为空
// goods_weight: '',	//<Route path="" component={}/>重量	不能为空
// goods_introduce: '',//介绍	可以为空
// pics : '',//	上传的图片临时路径（对象）	可以为空
// attrs: '',	//商品的参数（数组）	可以为空
      // 异步请求遍历数据
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
              cat:mtp
            })
        }
    })
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
    render() {
        let {
          goodsname,
            goodsnum,
            goodsjiag,
            goodszl,
        } = this.state
        // function onOk(value) {
        //     console.log('onOk: ', value);
        // }
        // 定表单数据
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
              {/* 步骤条 */}
              <Steps >
                    <Step status="" title="详细信息" icon={<Icon type="user" />} />
                    <Step status="" title="描述" icon={<Icon type="solution" />} />
                    <Step status="" title="上传图片" icon={<Icon type="loading" />} />
                    <Step status="" title="完成" icon={<Icon type="smile-o" />} />
                </Steps>
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
                      <Cascader options={this.state.cat} onChange={onChange} placeholder="商品分类" />
                   )}
               
               </Form.Item> 
               
               <Form.Item>
                   <br/>
               <Button type="primary" htmlType="submit" className="login-form-button">
                   下一步
               </Button>
               </Form.Item>
           </Form>
            </div>
        )
    }
}

export default Form.create({ name: 'normal_login' })(AddInformation);