import React, { Component } from 'react'

// 导入 UI
import {
    Card,
    Form,
    Input,
    Button,
    DatePicker 
} from 'antd';

// 导入编辑器
import wangeditor from 'wangeditor'

// const { TextArea } = Input;

class index extends Component {
    // 提交事件
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.sendShow(true)
            }
        });
    };
    // 返回方法
    toBack(){
        this.props.sendShow(true)
    }
    // 创建完成
    componentDidMount(){
        var E = wangeditor;
        var editor = new E(this.refs.editor);
        editor.create()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // 日期方法
        function onChange(value, dateString) {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
        }
          
        function onOk(value) {
            console.log('onOk: ', value);
        }

        return (
            <div id='addArticle'>
                <Card title="文章创建" extra={<Button type="dashed" onClick={this.toBack.bind(this)}>返回</Button>}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('time ', {
                            rules: [{ required: true, message: '请选择时间' }],
                        })(
                            <DatePicker showTime placeholder="Select Time" onChange={onChange} onOk={onOk} />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],
                        })(
                            <Input
                            placeholder="标题"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '作者' }],
                        })(
                            <Input
                            placeholder="作者"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder="阅读量"
                            disabled={true}
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <div ref='editor'></div>
                    </Form.Item>
                    
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交
                    </Button>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        )
    }
}

const AddLoginForm = Form.create({ name: 'normal_login' })(index);

export default AddLoginForm