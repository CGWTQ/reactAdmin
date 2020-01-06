import React,{Component} from 'react';
// 导入UI
import { Card,Input,Icon,Form,Button,Cascader,message } from 'antd';
//导入api
import {getGoodsfl,addGoodsCate} from '../../api';


import {
    Link
  } from 'react-router-dom';

class NormalLoginForm extends Component {

    constructor(props){
        super(props)
        this.state={
            cat_pid:'',
            goods_cat:'',
            cat_name:'',
            cat_level:'',
            data:[]
        }     
    }
    //提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
          let addForm={
            cat_name:this.state.cat_name,
            cat_pid:this.state.cat_pid,
            cat_level:this.state.cat_level,
          }
          //请求接口
          addGoodsCate(addForm)
          .then(res=>{
              console.log(res)
            if(res.meta.status!==201){
                message.error('添加失败！')
              }else{
                message.success('设置成功!');
                  setTimeout(()=>{
                    this.props.history.push('/admin/orderFenlei')
                  },500)
              }
          })
        }
      });
    };
  
    render() {
    let options=this.state.data
      const { getFieldDecorator } = this.props.form;
      return (
        <Card title="商品分类信息" >
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('goods_name', {
                    rules: [{ required: true, message: '请填写商品名称' }],
                    })(
                    <Input
                        onChange={(e)=>this.changeFn(e)}
                        style={{marginTop:'20px'}}
                        size={"large"}
                        placeholder="分类名称"
                        prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)'}} />}
                    />
                    )}
                </Form.Item>
                <Form.Item>
                <Cascader
                        fieldNames={{ label: 'cat_name', value: 'cat_id', children: 'children'}}
                        options={options}
                        onChange={this.onChangeFn.bind(this)}
                        placeholder="请选择分类"
                    />,
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100px'}}>提交</Button>
                <Link to='/admin/orderFenlei'><Button  style={{width:'100px',marginLeft:20}}>返回</Button></Link>
            </Form>
        </Card>
      );
    }

    onChangeFn(a,b) {
        let cat_pid=a[1]
        let cat_level=b[1].cat_level
        console.log(a,b) 
        this.setState({
            cat_pid,
            cat_level
        })
    }
      
    onChange(value, dateString) {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
    }
    onOk(value) {
        console.log('onOk: ', value);
    }
    changeFn(e){
        let value=e.target.value
        this.setState({
            cat_name:value
        })
    }
    componentWillMount(){
        getGoodsfl({type:2})
        .then(res=>{
            const data=res.data
            this.setState({
                data
            })
            console.log(data)

        })
    }
  }

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm