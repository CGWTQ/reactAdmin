// 导入react全家桶组件
import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// 导入UI
import {Card, Form, Icon, Input, Button } from 'antd';

// 样式
import styled from 'styled-components'

// 导入动画
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// 导入redux action
import { 
    setUserinfoCreator
} from './store/actionCreators'

class index extends Component {
    // 表单提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.setUserinfoFn(values)
            }
        });
    };

    // 结构
    

    render() {
        // 解构
        // const {
        //     loginStatus
        // } = this.props

        const { getFieldDecorator } = this.props.form;

        if (this.props.loginStatus) return <Redirect to="/admin" />

        return (
            <ReactCSSTransitionGroup>
            <FormCenter className = 'animated fadeInLeftBig'>
            <Card title="登录" style={{ width: 400 }} className='div1'>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: '请输入用户名' },
                            { pattern: '^[a-zA-Z0-9]*$', message: '只支持数字、英文，不区分大小写'}
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input.Password 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {/* {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住密码</Checkbox>)} */}
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
            </Card>
            </FormCenter>
            </ReactCSSTransitionGroup>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(index);

// 样式
const FormCenter = styled.div`
    position: absolute;
    left:40%;
    top:25%;
    // transform:translate(-55%,-50%); 
    h2{
        font-size:20px;
        text-align:center;
    }

    .div1:before,.div1:after{
        position: absolute;
        content: "";
        left: -5px;
        right: -5px;
        top: -5px;
        bottom: -5px;
        border: 5px solid #FF33FF;
      }
      .div1:before{
        animation: move 10s linear infinite normal -5s;
      }
      .div1:after{
        border-color: #FF33FF;
        animation: move 10s linear infinite;
      }
      
          @keyframes move{
              0%{
                clip: rect(0,410px,5px,0);
              }
              25%{
                clip: rect(0,410px,350px,405px);
              }
              50%{
                border-color: #00ff0088;
                clip: rect(345px,410px,410px,0);
              }
              75%{
                clip: rect(0,5px,350px,0);
              }
              100%{
                clip: rect(0,410px,5px,0);
              }
            }
      
`;

// export default index
// export default WrappedNormalLoginForm

const mapStateToProps = state => { 
    return { // 组件中通过 this.props.键 来获取数据
        // 键: state.toJS().模块名.键
        loginStatus: state.toJS().login.loginStatus
    }
}
const mapDispatchToProps= dispatch => {
    return { // 组件中通过this.props.键()
        // 键: (是否传递参数) => dispatch(action一般写对象这边action封装了所以写方法) 
        setUserinfoFn: params => dispatch(setUserinfoCreator(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);